import React, { useCallback, useEffect, useState } from "react";
import { X, Trash2, Upload, ImagePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const ProductSidebar = ({ isOpen, onClose, productData, onSave }) => {
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        basePrice: "",
        images: [],
        sizes: [],
        variants: [],
        stock: "",
        category: ""
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { token } = useSelector(state => state.auth);
    const [files, setFiles] = useState(null);

    useEffect(() => {
        if (productData && Object.keys(productData).length > 0) {
            setFormData({
                id: productData.id || "",
                title: productData.title || "",
                description: productData.description || "",
                basePrice: productData.basePrice || "",
                images: productData.images || [],
                sizes: productData.sizes || [],
                variants: productData.variants || [],
                stock: productData.stock || "",
                category: productData.category || ""
            });
        } else {
            setFormData({
                id: "",
                title: "",
                description: "",
                basePrice: "",
                images: [],
                sizes: [],
                variants: [],
                stock: "",
                category: ""
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSize = useCallback((sizeId, sizeName) => {
        setFormData(prev => {
            const exists = prev.sizes.find(s => s.id === sizeId);
            return {
                ...prev,
                sizes: exists
                    ? prev.sizes.filter(s => s.id !== sizeId)
                    : [...prev.sizes, { id: sizeId, name: sizeName }]
            };
        });
    }, []);

    const toggleVariant = useCallback((variantId, variantName) => {
        setFormData(prev => {
            const exists = prev.variants.find(v => v.id === variantId);
            return {
                ...prev,
                variants: exists
                    ? prev.variants.filter(v => v.id !== variantId)
                    : [...prev.variants, { id: variantId, name: variantName }]
            };
        });
    }, []);

    const handleImageUpload = async (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleImageDelete = async (imageId) => {
        if (!confirm("Delete this image?")) return;

        try {
            await fetch(
                `${import.meta.env.VITE_BASE_URL}/admin/products/${formData.id}/images/${imageId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setFormData(prev => ({
                ...prev,
                images: prev.images.filter(img => img.id !== imageId)
            }));
            toast.success("Image deleted successfully");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete image");
        }
    };


    const getCategoryId = (categoryName) => {
        const categoryMap = {
            "Coffee": 1,
            "Non-Coffee": 2,
            "Fruit Tea": 3,
            "Tea": 4,
            "Food": 5,
            "Ice Blended": 6,
            "Signature Coffee": 7,
            "Origin Coffee": 8
        };
        return categoryMap[categoryName] || null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.basePrice || !formData.category) {
            toast.error("Please fill required fields (Title, Price, Category)");
            return;
        }

        setSubmitting(true);
        let savedProductId = formData.id;

        try {
            const submitData = {
                title: formData.title,
                description: formData.description,
                base_price: Number(formData.basePrice),
                stock: Number(formData.stock) || 0,
                category_id: getCategoryId(formData.category),
                sizes: formData.sizes.map(s => s.id),
                variants: formData.variants.map(v => v.id)
            };

            const isEdit = Boolean(formData.id);
            const url = isEdit
                ? `${import.meta.env.VITE_BASE_URL}/admin/products/${formData.id}`
                : `${import.meta.env.VITE_BASE_URL}/admin/products`;
            const method = isEdit ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitData)
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Failed to save product");
                setSubmitting(false);
                return;
            }

            savedProductId = result.result?.id || result.id || formData.id;

            if (!isEdit) {
                setFormData(prev => ({
                    ...prev,
                    id: savedProductId
                }));
            }

            toast.success("Product saved successfully!");

            if (files && files.length > 0 && savedProductId) {
                setUploading(true);

                try {
                    const uploadPromises = files.map(async (file) => {
                        const formDataObj = new FormData();
                        formDataObj.append("image", file);

                        const uploadRes = await fetch(
                            `${import.meta.env.VITE_BASE_URL}/admin/products/${savedProductId}/images`,
                            {
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                body: formDataObj,
                            }
                        );

                        if (!uploadRes.ok) {
                            throw new Error(`Failed to upload ${file.name}`);
                        }

                        return uploadRes.json();
                    });

                    const uploaded = await Promise.all(uploadPromises);

                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, ...uploaded.filter(Boolean)]
                    }));

                    toast.success("Images uploaded successfully!");
                    setFiles(null);
                } catch (uploadError) {
                    console.error("Image upload error:", uploadError);
                    toast.error("Failed to upload some images");
                } finally {
                    setUploading(false);
                }
            }

            onSave(result.result || result);

        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Failed to save product");
        } finally {
            setSubmitting(false);
        }
    };

    const availableSizes = [
        { id: 1, name: "S" },
        { id: 2, name: "M" },
        { id: 3, name: "L" },
        { id: 4, name: "XL" }
    ];

    const availableVariants = [
        { id: 1, name: "Less Sugar" },
        { id: 2, name: "More Sugar" },
        { id: 3, name: "No Sugar" },
        { id: 4, name: "Less Ice" },
        { id: 5, name: "More Ice" },
        { id: 6, name: "No Ice" },
        { id: 7, name: "Hot" },
        { id: 8, name: "Iced" }
    ];

    const categories = [
        "Coffee",
        "Non-Coffee",
        "Fruit Tea",
        "Tea",
        "Food",
        "Ice Blended",
        "Signature Coffee",
        "Origin Coffee"
    ];

    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[400px] md:w-[40%] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-100 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex justify-between items-center p-5 border-gray-300 border-b">
                <h2 className="text-xl font-semibold">
                    {formData.id ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={onClose} className="text-red-500 hover:text-red-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-8 h-[calc(100%-64px)]">

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Product Images {!formData.id && "(Save product first to upload images)"}
                    </label>
                    <div className="flex gap-2 flex-wrap mb-4">
                        {formData.images.length === 0 ? (
                            <div className="p-4 md:p-6 bg-gray-300 w-fit rounded-xl">
                                <ImagePlus />
                            </div>
                        ) : (
                            formData.images.map((img) => (
                                <div key={img.id} className="relative">
                                    <img
                                        src={img.image}
                                        alt="preview"
                                        className="w-16 h-16 object-cover rounded-md border-gray-300 border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(img.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <label className="inline-block">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                        <div className={`bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                            <Upload className="w-4 h-4" />
                            <span>
                                {uploading ? 'Uploading...' : files ? `${files.length} file(s) selected` : 'Select Images'}
                            </span>
                        </div>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Product name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter product name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Price</label>
                    <input
                        type="number"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="e.g. 24000"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 h-24 md:h-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Product Size</label>
                    <div className="flex flex-wrap gap-2">
                        {availableSizes.map((size) => (
                            <button
                                type="button"
                                key={size.id}
                                onClick={() => toggleSize(size.id, size.name)}
                                className={`px-4 py-2 rounded-md border ${formData.sizes.find(s => s.id === size.id)
                                    ? "bg-orange-400 text-white border-orange-400"
                                    : "bg-white border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Variants</label>
                    <div className="flex flex-wrap gap-2">
                        {availableVariants.map((variant) => (
                            <button
                                type="button"
                                key={variant.id}
                                onClick={() => toggleVariant(variant.id, variant.name)}
                                className={`px-3 py-2 rounded-md border text-sm ${formData.variants.find(v => v.id === variant.id)
                                    ? "bg-orange-400 text-white border-orange-400"
                                    : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                {variant.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter stock quantity"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Saving...' : uploading ? 'Uploading Images...' : (formData.id ? "Update Product" : "Add Product")}
                </button>
            </form>
        </div>
    );
};

export default ProductSidebar;
