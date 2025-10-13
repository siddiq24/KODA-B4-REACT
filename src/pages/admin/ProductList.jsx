import React, { useState } from "react";
import { Pencil, Trash2, Plus, Search, Filter } from "lucide-react";
import ProductSidebar from "../../components/ProductSidebar";

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    console.log(editData)

    const products = [
        {
            id: 1,
            name: "Caramel Machiato",
            price: "IDR 40.000",
            desc: "Cold brewing is a method of brewing that ...",
            size: ["R","L","XL","250gr"],
            method: "Deliver, Dine In",
            stock: 200,
            images:
                ["https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=100&q=60"],
        },
        {
            id: 2,
            name: "Hazelnut Latte",
            price: "IDR 40.000",
            desc: "Cold brewing is a method of brewing that ...",
            size: ["R","L","XL","250gr"],
            method: "Deliver, Dine In",
            stock: 200,
            images:
                ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=60"],
        },
        {
            id: 3,
            name: "Kopi Susu",
            price: "IDR 40.000",
            desc: "Cold brewing is a method of brewing that ...",
            size: ["R","L","XL","250gr"],
            method: "Dine In",
            stock: 200,
            images:
                ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&q=60"],
        },
        {
            id: 4,
            name: "Espresso Supreme",
            price: "IDR 40.000",
            desc: "Cold brewing is a method of brewing that ...",
            size: ["R","L","XL","250gr"],
            method: "Deliver",
            stock: 200,
            images:
                ["https://images.unsplash.com/photo-1528834356921-1e03a878ea63?auto=format&fit=crop&w=100&q=60"],
        },
        {
            id: 5,
            name: "Caramel Velvet Latte",
            price: "IDR 40.000",
            desc: "Cold brewing is a method of brewing that ...",
            size: ["R","L","XL","250gr"],
            method: "Deliver, Dine In",
            stock: 200,
            images:
                ["https://images.unsplash.com/photo-1579999569032-c31e8aa3d7c2?auto=format&fit=crop&w=100&q=60"],
        },
    ];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditData(null);
        setIsSidebarOpen(true);
    };

    const handleEdit = (product) => {
        setEditData(product);
        setIsSidebarOpen(true);
    };

    const handleSave = (data) => {
        console.log("Saved data:", data);
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
                    <button className="bg-[#ff8906] hover:bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center gap-2">
                        <Filter />
                        <span>Filter</span>
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
                <table className="w-full text-left text-gray-700">
                    <thead className="bg-gray-50 text-center">
                        <tr>
                            <th className="p-4"></th>
                            <th className="p-4">Image</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-center">Desc</th>
                            <th className="p-4">Product Size</th>
                            <th className="p-4 text-center">Method</th>
                            <th className="p-4 text-center">Stock</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredProducts.map((product, i) => (
                            <tr
                                key={product.id}
                                className={`border-t border-gray-300 transition-colors ${i % 2 == 0 && 'bg-gray-100'}`}
                            >
                                <td className="p-4">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                </td>
                                <td className="p-4 font-medium">{product.name || ''}</td>
                                <td className="p-4">{product.price || ''}</td>
                                <td className="p-4 text-sm text-gray-500">{product.desc || ''}</td>
                                <td className="p-4">{product.size || ''}</td>
                                <td className="p-4 text-center">{product.method || ''}</td>
                                <td className="p-4 text-center">{product.stock || ''}</td>
                                <td className="p-8 flex gap-5 items-center justify-center">
                                    <button onClick={() => handleEdit(product)}
                                        className="text-[#ff8906] hover:text-orange-500 bg-[#ff8906]/20 p-2 rounded-full">
                                        <Pencil size={22} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-600 bg-red-500/20 p-2 rounded-full">
                                        <Trash2 size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center p-6 text-sm text-gray-500">
                    <span>Show 5 product of 100 product</span>
                    <div className="flex items-center gap-2">
                        <button className="hover:text-orange-500">Prev</button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
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
                {editData && <ProductSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    productData={editData}
                    onSave={handleSave}
                />}
            </div>
        </div>
    );
};

export default ProductList;
