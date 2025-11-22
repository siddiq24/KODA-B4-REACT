import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, MessageSquareText, ReceiptText, RefreshCcw, Repeat } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

export default function HistoryOrder() {
    const [status, setStatus] = useState("On Progress");
    const [month, setMonth] = useState("January 2023");
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/transactions/history`)
                console.log("History data:", res.data);

                if (res.data.success) {
                    setOrders(res.data.result);
                } else {
                    setError("Failed to fetch history");
                }
            } catch (error) {
                console.error("Error fetching history:", error);
                setError("Failed to load history data");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);


    const filteredOrders = orders.filter(order => {
        if (status === "On Progress") return order.status === "Pending";
        if (status === "Sending Goods") return order.status === "Shipping";
        if (status === "Finish Order") return order.status === "Completed";
        return true;
    });

    if (loading) {
        return (
            <section className="w-full px-4 md:px-12 py-8 space-y-8 pt-28">
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-600">Loading history...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full px-4 md:px-12 py-8 space-y-8 pt-28">
                <div className="flex justify-center items-center h-40">
                    <p className="text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 md:px-12 py-8 space-y-8 pt-28">
            {/* Title */}
            <div className="flex items-center gap-2 justify-between">
                <h1 className="text-3xl">History Order</h1>
                <span className="bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-md">
                    {filteredOrders.length}
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
                    {filteredOrders.length === 0 ? (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-gray-600">No orders found for the selected filter.</p>
                        </div>
                    ) : (
                        <>
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center gap-4 bg-gray-100 shadow-sm border border-gray-100 rounded-xl p-3"
                                >
                                    <img
                                        src={order.image}
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
                                                <p className="font-semibold">{order.invoice}</p>
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
                                                <p className={`rounded-full w-fit px-3 py-1 font-semibold ${order.status === "Pending"
                                                    ? "bg-[#FF890633]/80 text-[#ff8906]"
                                                    : order.status === "Shipping"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-green-100 text-green-600"
                                                    }`}>
                                                    {order.status}
                                                </p>
                                            </section>
                                        </div>
                                        <Link to={`/profile/order-detail/${order?.invoice}`} className="text-[#ff8906] text-sm mt-1 hover:underline">
                                            View Order Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            {orders.length > 1 && (
                                <section className='w-full h-22 mt-8 flex gap-3 justify-center items-center'>
                                    <button
                                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                        disabled={page <= 1}
                                        className={`aspect-square h-12 rounded-full flex justify-center items-center transition-colors ${page > 1
                                            ? 'bg-[#ff8906] hover:bg-orange-600 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <ArrowLeft color={page > 1 ? 'white' : 'gray'} />
                                    </button>

                                    {Array.from({ length: orders.length }, (_, i) => i + 1).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`aspect-square h-12 cursor-pointer ${page === pageNum ? 'bg-[#ff8906] text-white' : 'bg-gray-200 hover:bg-gray-300'
                                                } rounded-full flex justify-center items-center transition-colors`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setPage(prev => Math.min(prev + 1, orders.length))}
                                        disabled={page >= orders.length}
                                        className={`aspect-square h-12 rounded-full flex justify-center items-center transition-colors ${page < orders.length
                                            ? 'bg-[#ff8906] hover:bg-orange-600 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <ArrowRight color={page < orders.length ? 'white' : 'gray'} />
                                    </button>
                                </section>
                            )}
                        </>
                    )}
                </div>

                {/* Message Box */}
                <div className="w-full lg:flex-3 space-y-4 bg-white border border-gray-200 rounded-xl p-6 h-fit">
                    <div className="bg-black text-white w-fit p-2 rounded-xl">
                        <MessageSquareText size={22} />
                    </div>
                    <h2 className="font-semibold text-lg">Send Us Message</h2>
                    <p className="text-gray-600">
                        If you're unable to find answers or receive your product quickly, please describe your
                        problem and tell us. We will give you a solution.
                    </p>
                    <button className="w-full bg-[#ff8906] hover:bg-orange-600 py-2 rounded-md text-white">
                        Send Message
                    </button>
                </div>
            </div>
        </section>
    );
}