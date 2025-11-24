
import React, { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus, Search, Filter, X, Upload, ImagePlus } from "lucide-react";
import { useSelector } from "react-redux";
import ProductSidebar from "../../components/ProductSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const { token } = useSelector(state => state.auth)
    const [openConfirm, setOpenConfirm] = useState(false);
    const [productDelete, setProductDelete] = useState({ id: 0, name: "" })

    const handleSearch = useCallback(async (search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/products?search=${search}&limit=5`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProducts(response.data.result || []);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        handleSearch("");
    }, [handleSearch]);

    const handleAdd = () => {
        setEditData(null);
        setIsSidebarOpen(true);
    };

    const handleEdit = (product) => {
        setEditData(product);
        setIsSidebarOpen(true);
    };

    const handleSave = useCallback(() => {
        handleSearch(searchTerm);
        setIsSidebarOpen(false);
    }, [handleSearch, searchTerm]);

    const deleteProduct = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/admin/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            handleSearch(searchTerm);
            setOpenConfirm(false)
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl mb-4 sm:mb-0">Product List</h1>

                <div className="flex items-center gap-2 w-[40%]">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            className="pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-200 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => handleSearch(searchTerm)}
                        disabled={loading}
                        className="bg-[#ff8906] hover:bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap disabled:opacity-50">
                        <Filter />
                        <span>{loading ? 'Loading...' : 'Filter'}</span>
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <button onClick={handleAdd}
                    className="bg-[#ff8906] hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white shadow rounded-xl overflow-x-auto">
                <div className="overflow-x-auto overflow-y-auto flex-1">
                    <table className="w-full text-left text-gray-700 min-w-[1000px]">
                        <thead className="bg-gray-50 text-center sticky top-0">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-center">Description</th>
                                <th className="p-4">Product Size</th>
                                <th className="p-4 text-center">Stock</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {products?.map((product, i) => (
                                <tr
                                    key={product.id}
                                    className={`border-t border-gray-300 transition-colors ${i % 2 === 0 && 'bg-gray-100'}`}
                                >
                                    <td className="p-4">
                                        <img
                                            src={product.images[0]?.image}
                                            alt={product.title}
                                            className="w-14 h-14 object-cover rounded-md mx-auto"
                                        />
                                    </td>
                                    <td className="p-4 font-medium">{product.title || ''}</td>
                                    <td className="p-4">Rp {product.basePrice?.toLocaleString() || ''}</td>
                                    <td className="p-4 text-sm text-gray-500 max-w-[200px] truncate">
                                        {product.description || '......'}
                                    </td>
                                    <td className="p-4">{product.sizes?.map(size => size.name).join(", ")}</td>
                                    <td className="p-4 text-center">{product.stock || ''}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2 items-center justify-center">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-[#ff8906] hover:text-orange-500 bg-[#ff8906]/20 p-2 rounded-full">
                                                <Pencil size={22} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setProductDelete({ id: product.id, name: product.title })
                                                    setOpenConfirm(true)
                                                }
                                                }
                                                className="text-red-500 hover:text-red-600 bg-red-500/20 p-2 rounded-full">
                                                <Trash2 size={22} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center p-6 text-sm text-gray-500 border-t gap-4">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <button className="hover:text-orange-500 px-2">Prev</button>
                        {[].map((num) => (
                            <button
                                key={num}
                                className={`w-7 h-7 rounded-md ${num === 1
                                    ? "bg-[#ff8906] text-white"
                                    : "hover:bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                        <button className="hover:text-orange-500">Next</button>
                    </div>
                </div>
                {isSidebarOpen && <ProductSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    productData={editData}
                    onSave={handleSave}
                />}
                <ConfirmDeleteModal
                    open={openConfirm}
                    onClose={() => setOpenConfirm(false)}
                    onConfirm={() => deleteProduct(productDelete.id)}
                    productName={productDelete.name}
                />
            </div>
        </div>
    );
};

export default ProductList;
