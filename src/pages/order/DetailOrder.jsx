import React, { useEffect, useState } from "react";
import { MapPin, Phone, CreditCard, Truck, User, CheckCircle, PhoneCall, RefreshCcw } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";

export default function DetailOrder() {
    const { user } = useSelector(state => state.auth)
    console.log(user)
    const { invoice } = useParams()
    const [order, setOrder] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const ress = await axios.get(`${import.meta.env.VITE_BASE_URL}/transactions/history/${invoice}`)
                console.log(ress.data.result)
                setOrder(ress.data.result)
            } catch (error) {
                console.log("error: ", error)
            }
        })()
    }, [invoice])


    return (
        <section className="p-6 md:p-10 space-y-6 pt-22 md:pt-33">
            <div>
                <h1 className="text-3xl font-bold">{order?.invoice}</h1>
                <p className="text-gray-500">{order?.date}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Order Information</h2>
                    <div className="divide-y text-xl">
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <User size={18} /> <span>Full Name</span>
                            </div>
                            <span className="font-semibold">{order?.cust_name}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin size={18} /> <span>Address</span>
                            </div>
                            <span className="font-semibold">{order?.cust_address}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <PhoneCall size={18} /> <span>Phone</span>
                            </div>
                            <span className="font-semibold">{order?.cust_phone}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <CreditCard size={18} /> <span>Payment Method</span>
                            </div>
                            <span className="font-semibold">{order?.payment_method}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Truck size={18} /> <span>Shipping</span>
                            </div>
                            <span className="font-semibold">{order?.delivery_method}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 border-gray-300">
                            <div className="flex items-center gap-2 text-gray-500">
                                <RefreshCcw size={18} /> <span>Status</span>
                            </div>
                            <span className="px-5 py-2 bg-[#00A70033] text-green-600 font-semibold rounded-full">
                                {order?.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 text-xl plx-5">
                        <span className="font-medium text-gray-600">Total Transaksi</span>
                        <span className="font-semibold text-[#ff8906]">IDR {order?.total.toLocaleString("ID")}</span>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                    <div className="space-y-4">
                        {order?.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-8 bg-gray-100 p-3 hover:shadow-md transition"
                            >
                                <img
                                    src={item.image}
                                    alt={item.product_name}
                                    className="w-28 h-28 rounded-lg object-cover border"
                                />
                                <div className="flex-1 space-y-2">
                                    <span className="bg-red-600 text-white text-lg px-2 py-1 rounded-full">
                                        FLASH SALE!
                                    </span>
                                    <h3 className="font-semibold text-2xl mt-4">{item.product_name}</h3>
                                    <p className="text-lg text-gray-500">{item.variant}</p>
                                    <div className="flex items-center gap-4 mt-1">
                                        {/* {item.<span className="line-through text-red-400">{item.subtotal}</span>} */}
                                        <span className="text-[#ff8906] text-xl">IDR {item.subtotal.toLocaleString("ID")}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
