import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, Filter, PencilLine, ReceiptText } from "lucide-react";
import OrderSidebar from "../../components/OrderSidebar";

const OrderList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    console.log(editData)

    const order = [
        {
            id: 1,
            no_order: "#12354-09861",
            date: Date(),
            order_list: [
                "Hazelnut Latte R 1x",
                "Caramel Machiato R 1x",
            ],
            status: "Done",
            total: 40000,
        },
        {
            id: 2,
            no_order: "#12354-09862",
            date: Date(),
            order_list: [
                "Hazelnut Latte R 1x",
                "Caramel Machiato R 1x",
            ],
            status: "Pending",
            total: 40000,
        },
        {
            id: 3,
            no_order: "#12354-09863",
            date: Date(),
            order_list: [
                "Hazelnut Latte R 1x",
                "Caramel Machiato R 1x",
            ],
            status: "Waiting",
            total: 40000,
        },
        {
            id: 4,
            no_order: "#12354-09864",
            date: Date(),
            order_list: [
                "Hazelnut Latte R 1x",
                "Caramel Machiato R 1x",
            ],
            status: "On Progres",
            total: 40000,
        },
        {
            id: 5,
            no_order: "#12354-09865",
            date: Date(),
            order_list: [
                "Hazelnut Latte R 1x",
                "Caramel Machiato R 1x",
            ],
            status: "Done",
            total: 40000,
        },
    ];

    const filteredOrders = order.filter((order) =>
        order.no_order.toLowerCase().includes(searchTerm.toLowerCase()) &&
        order.status.toLowerCase().includes(status.toLowerCase())
    );

    const handleAdd = () => {
        setEditData(null);
        setIsSidebarOpen(true);
    };

    const handleEdit = (order) => {
        setEditData(order);
        setIsSidebarOpen(true);
    };

    const handleSave = (data) => {
        console.log("Saved data:", data);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl mb-4 sm:mb-0">Order List</h1>

                <div className="flex items-center gap-2 w-[40%]">
                    <div className="relative w-full">
                        <select
                            type="dropdown"
                            placeholder="Enter order Name"
                            className="pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-200 w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Done">Done</option>
                            <option value="Pending">Pending</option>
                            <option value="On Progres">On Progres</option>
                            <option value="Waiting">Waiting</option>
                        </select>
                    </div>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Enter order Name"
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

            <div className="bg-white relative shadow rounded-xl overflow-x-auto">
                <table className="w-full text-left text-gray-700">
                    <thead className="bg-gray-50 text-center">
                        <tr>
                            <th className="p-4"></th>
                            <th className="p-4">No. Order</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Order</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4">Total</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredOrders.map((order, i) => (
                            <tr
                                key={order.id}
                                className={`border-t border-gray-300 transition-colors ${i % 2 == 0 && 'bg-gray-100'}`}
                            >
                                <td className="p-4">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-4">{order.no_order}</td>
                                <td className="p-4 font-medium">{order.date.slice(4, 15) || ''}</td>
                                <td className="p-4">
                                    {order.order_list && order.order_list.map(order => [
                                        <ul>
                                            <li className="text-nowrap">{order}</li>
                                        </ul>
                                    ])
                                    }
                                </td>
                                <td className={`p-4`}>
                                    <div className="flex justify-center">
                                        <div className={`rounded-full p-2 px-3 font-semibold w-fit
                                        ${order.status == "Done"
                                                ? 'bg-[#00A70033]/80 text-[#00A700]'
                                                : order.status == "Pending"
                                                    ? 'bg-[#D0000033]/80 text-[#D00000]'
                                                    : order.status == "Waiting"
                                                        ? 'bg-[#4F566533]/80 text-[#4F5665]'
                                                        : 'bg-[#FF890633]/80 text-[#FF8906]'
                                            }`}>{order.status || ''}
                                        </div>
                                    </div>
                                </td>
                                <td className={`p-4 text-nowrap`}>IDR {order.total.toLocaleString("ID")}</td>
                                <td className="p-8 flex gap-5 items-center justify-center">
                                    <button onClick={() => { }}
                                        className="text-red-500 hover:text-red-600 bg-red-500/20 p-2 rounded-full">
                                        <ReceiptText size={22} />
                                    </button>
                                    <button onClick={() => handleEdit(order)}
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
                    <span>Show 5 order of 100 order</span>
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
            <div className={`absolute inset-0 bg-black backdrop-blur-md transform transition-transform duration-1000 ease-in-out 
                ${isSidebarOpen ? 'opacity-50' : 'opacity-0 hidden'}
                `}>
            </div>
            {editData && <OrderSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                productData={editData}
                onSave={handleSave}
            />}
        </div>
    );
};

export default OrderList;
