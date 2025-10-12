import { useState } from "react";
import { CalendarDays, ChevronRight, MessageSquareText, ReceiptText, RefreshCcw, Repeat } from "lucide-react";

export default function HistoryOrder() {
    const [status, setStatus] = useState("On Progress");
    const [month, setMonth] = useState("January 2023");

    const orders = [
        { id: 1, date: "23 October 2025", total: 40000, status: "On Progress" },
        { id: 2, date: "24 October 2025", total: 40000, status: "On Progress" },
        { id: 3, date: "25 October 2025", total: 40000, status: "On Progress" },
        { id: 4, date: "26 October 2025", total: 40000, status: "On Progress" },
    ];

    return (
        <section className="w-full px-4 md:px-12 py-8 space-y-8 pt-28">
            {/* Title */}
            <div className="flex items-center gap-2 justify-between">
                <h1 className="text-3xl">History Order</h1>
                <span className="bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-md">
                    {orders.length}
                </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-col-reverse md:flex-row lg:w-[66%] md:items-center md:justify-between gap-4">
                <div className="flex gap-2 bg-gray-200 p-3 md:flex-3">
                    {["On Progress", "Sending Goods", "Finish Order"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setStatus(item)}
                            className={`p-2 w-full text-nowrap text-sm font-medium rounded-md transition ${status === item
                                ? "bg-white"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Month Dropdown */}
                <div className="flex md:flex-1 md:py-5 bg-gray-200 items-center rounded-md md:rounded-none px-3 py-2 text-gray-700 w-fit">
                    <CalendarDays size={18} className="mr-2" />
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="bg-transparent outline-none text-sm"
                    >
                        <option>September 2025</option>
                        <option>October 2025</option>
                        <option>November 2025</option>
                    </select>
                </div>
            </div>

            {/* Orders & Message */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Orders List */}
                <div className="flex-7 space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center gap-4 bg-gray-100 shadow-sm border border-gray-100 rounded-xl p-3"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80"
                                alt="coffee"
                                className="hidden md:block w-25 h-25 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <div className="flex flex-wrap md:flex-nowrap justify-between sm:items-center gap-y-5">
                                    <section className="w-[50%] space-y-1 md:w-fit">
                                        <div className="flex gap-2 items-center">
                                            <ReceiptText stroke="gray" size={18} />
                                            <span className="text-gray-600">No. Order</span>
                                        </div>
                                        <p className="font-semibold">#{order.id}2345–09893</p>
                                    </section>
                                    <section className="w-[50%] space-y-1 md:w-fit">
                                        <div className="flex gap-2 items-center">
                                            <CalendarDays stroke="gray" size={18} />
                                            <span className="text-gray-600">Date</span>
                                        </div>
                                        <p className="font-semibold">{order.date}</p>
                                    </section>
                                    <section className="w-[50%] space-y-1 md:w-fit">
                                        <div className="flex gap-2 items-center">
                                            <Repeat stroke="gray" size={18} />
                                            <span className="text-gray-600">Total</span>
                                        </div>
                                        <p className="font-semibold">Idr {order.total.toLocaleString()}</p>
                                    </section>
                                    <section className="w-[50%] space-y-1 md:w-fit">
                                        <div className="flex gap-2 items-center">
                                            <RefreshCcw stroke="gray" size={18} />
                                            <span className="text-gray-600">Status</span>
                                        </div>
                                        <p className="rounded-full bg-[#FF890633]/80 w-fit px-3 py-1 text-[#ff8906] font-semibold">{order.status}</p>
                                    </section>
                                </div>
                                <button className="text-[#ff8906] text-sm mt-1 hover:underline">
                                    View Order Detail
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 pt-4">
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                className={`w-10 h-10 rounded-full text-sm font-medium ${page === 1
                                    ? "bg-[#ff8906] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="w-10 h-10 rounded-full bg-[#ff8906] text-white flex justify-center items-center font-medium">
                            <ChevronRight/>
                        </button>
                    </div>
                </div>

                {/* Message Box */}
                <div className="w-full lg:flex-3 space-y-4 bg-white border border-gray-200 rounded-xl p-6 h-fit">
                    <div className="bg-black text-white w-fit p-2 rounded-xl">
                        <MessageSquareText size={22} />
                    </div>
                    <h2 className="font-semibold text-lg">Send Us Message</h2>
                    <p className="text-gray-600">
                        If you’re unable to find answers or receive your product quickly, please describe your
                        problem and tell us. We will give you a solution.
                    </p>
                    <button className="w-full bg-[#ff8906] hover:bg-orange-600 py-2 rounded-md">
                        Send Message
                    </button>
                </div>
            </div>
        </section>
    );
}
