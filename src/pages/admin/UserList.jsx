import React, { useState } from "react";
import { Trash2, Search, Filter, PencilLine, ReceiptText, Plus } from "lucide-react";
import ProductSidebar from "../../components/ProductSidebar";
import UserSidebar from "../../components/UserSidebar";

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    console.log(editData)

    const users = [
        {
            id: 1,
            image: "/barista.jpg",
            fullname: "Yanto Eltadores",
            phone: "123456789",
            address: "3517 W. Gray St. Utica, Pennsylvania 57867",
            email: "Yanto@tadores.con",
            role: 'user'
        },
        {
            id: 1,
            image: "/product1.png",
            fullname: "Kayla Kupurama",
            phone: "123456789",
            address: "3517 W. Gray St. Utica, Pennsylvania 57867",
            email: "Yanto@tadores.con",
            role: 'user'
        },
    ];

    const filteredOrders = users.filter((users) =>
        users.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (users) => {
        setEditData(users);
        setIsSidebarOpen(true);
    };

    const handleSave = (data) => {
        console.log("Saved data:", data);
    };

    const handleAdd = () => {
        setEditData(null);
        setIsSidebarOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl mb-4 sm:mb-0">Users List</h1>

                <div className="flex items-center gap-2 w-[40%]">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Enter users Name"
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
                <button onClick={()=>handleAdd()}
                    className="bg-[#ff8906] hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                </button>
            </div>

            <div className="bg-white relative shadow rounded-xl overflow-x-auto">
                <table className="w-full text-left text-gray-700">
                    <thead className="bg-gray-50 text-center">
                        <tr>
                            <th className="p-4"></th>
                            <th className="p-4">Image</th>
                            <th className="p-4">Fullname</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4 text-center">Address</th>
                            <th className="p-4">Email</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredOrders.map((users, i) => (
                            <tr
                                key={i}
                                className={`border-t border-gray-300 transition-colors ${i % 2 == 0 && 'bg-gray-100'}`}
                            >
                                <td className="p-4">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="size-20 rounded-lg overflow-hidden">
                                        <img src={users.image} alt={users.fullname} />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{users.fullname || ''}</td>
                                <td className={`p-4`}>{users.phone}</td>
                                <td className={`p-4`}>{users.address}</td>
                                <td className={`p-4`}>{users.email}</td>
                                <td className="p-8 flex gap-5 items-center justify-center">
                                    <button onClick={() => { }}
                                        className="text-red-500 hover:text-red-600 bg-red-500/20 p-2 rounded-full">
                                        <ReceiptText size={22} />
                                    </button>
                                    <button onClick={() => handleEdit(users)}
                                        className="text-[#ff8906] hover:text-orange-500 bg-[#ff8906]/20 p-2 rounded-full">
                                        <PencilLine size={22} />
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
                    <span>Show 5 users of 100 users</span>
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
            </div>
            <div
                onClick={() => setIsSidebarOpen(false)}
                className={`absolute inset-0 bg-black backdrop-blur-md transform transition-transform duration-1000 ease-in-out 
                ${isSidebarOpen ? 'opacity-50' : 'opacity-0 hidden'}
                `}>
            </div>
            {<UserSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                productData={editData}
                onSave={handleSave}
            />}
            {console.log(editData)}
        </div>
    );
};

export default UserList;
