import React, { useEffect, useState } from "react";
import { X, Trash2, Upload, ImagePlus } from "lucide-react";

const ProductSidebar = ({ isOpen, onClose, productData = {
    name: "",
    price: "",
    desc: "",
    size: [],
    stock: "",
    images: [],
}, onSave }) => {
    const [formData, setFormData] = useState(
        productData
    );

    useEffect(() => {
        setFormData(productData)
    }, [productData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleSize = (size) => {
        setFormData((prev) => ({
            ...prev,
            size: prev.size.includes(size)
                ? prev.size.filter((s) => s !== size)
                : [...prev.size, size],
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setFormData({ ...formData, images: [...formData.images, ...urls] });
    };

    const handleImageDelete = (url) => {
        setFormData({
            ...formData,
            images: formData.images.filter((img) => img !== url),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[400px] md:w-[40%] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex justify-between items-center p-5 border-gray-300 border-b">
                <h2 className="text-xl font-semibold">
                    {productData ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={onClose} className="text-red-500 hover:text-red-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-8 h-[calc(100%-64px)]">
                <label className="block text-sm font-semibold mb-2">Photo Product</label>
                <div className="flex gap-2 flex-wrap">
                    {formData.images.length == 0
                        ? <div className="p-4 md:p-6 bg-gray-300 w-fit rounded-xl mb-4">
                            <ImagePlus />
                        </div>
                        : formData?.images.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img
                                    src={img}
                                    alt="preview"
                                    className="w-16 h-16 object-cover rounded-md border-gray-300 border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageDelete(img)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                </div>
                <label className="inline-block mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <div className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                    </div>
                </label>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Product name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter product name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="e.g. 40.000"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 h-24 md:h-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Product Size</label>
                    <div className="flex flex-wrap gap-2 md:gap-8">
                        {["R", "L", "XL", "250gr", "500gr"].map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`px-4 py-2 flex-1 rounded-md border-gray-300 border ${formData.size.includes(size)
                                    ? "bg-orange-400 text-white border-orange-400"
                                    : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Stock</label>
                    <select
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="">Select stock</option>
                        <option value="100">100 Stock</option>
                        <option value="200">200 Stock</option>
                        <option value="300">300 Stock</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg font-semibold"
                >
                    {productData ? "Edit Save" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductSidebar;
