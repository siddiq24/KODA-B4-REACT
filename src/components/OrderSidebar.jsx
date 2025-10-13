import { CreditCard, Map, MapPin, PhoneCall, RefreshCcw, Truck, User, UserRound, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const OrderSidebar = ({ isOpen, onClose, productData = {
    id: 1,
    no_order: "#12354-09861",
    date: Date(),
    order_list: [
        "Hazelnut Latte R 1x",
        "Caramel Machiato R 1x",
    ],
    status: "Done",
    total: 40000,
}, onSave }) => {
    const [formData, setFormData] = useState(
        productData
    );
    const [status, setStatus] = useState('')

    useEffect(() => {
        setFormData(productData)
        setStatus(productData.status)
    }, [productData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const toggleSize = (size) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         size: prev.size.includes(size)
    //             ? prev.size.filter((s) => s !== size)
    //             : [...prev.size, size],
    //     }));
    // };

    // const handleImageUpload = (e) => {
    //     const files = Array.from(e.target.files);
    //     const urls = files.map((file) => URL.createObjectURL(file));
    //     setFormData({ ...formData, images: [...formData.images, ...urls] });
    // };

    // const handleImageDelete = (url) => {
    //     setFormData({
    //         ...formData,
    //         images: formData.images.filter((img) => img !== url),
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className={`w-[40%] absolute right-0 bottom-0 top-0 space-y-8 p-12 bg-white shadow-2xl transform transition-transform overflow-y-scroll duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="h-fit">
                <section className="flex justify-between">
                    <h1 className="text-4xl">Order {formData.no_order}</h1>
                    <div onClick={() => { onClose(true) }}>
                        <X size={33} />
                    </div>
                </section>
                <section>
                    <h2 className="text-3xl">Order Information</h2>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <UserRound />
                            <span>Full Name</span>
                        </div>
                        <p className="">NAMA</p>
                    </div>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <MapPin />
                            <span>Address</span>
                        </div>
                        <p className="">ALAMAT</p>
                    </div>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <PhoneCall />
                            <span>Phone</span>
                        </div>
                        <p className="">NOMOR TELPON</p>
                    </div>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <CreditCard />
                            <span>Payment Method</span>
                        </div>
                        <p className="">METODE PEMBAYARAN</p>
                    </div>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <Truck />
                            <span>Shipping</span>
                        </div>
                        <p className="">DINE IN</p>
                    </div>
                    <div className="p-6 border-b border-gray-200 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <RefreshCcw />
                            <span>Status</span>
                        </div>
                        <select
                            type="dropdown"
                            placeholder="Enter order Name"
                            className="pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-200"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Done">Done</option>
                            <option value="Pending">Pending</option>
                            <option value="On Progres">On Progres</option>
                            <option value="Waiting">Waiting</option>
                        </select>
                    </div>
                    <div className="p-6 flex text-lg">
                        <div className="flex flex-1 gap-3 text-gray-500 items-center">
                            <span>Total Transaction</span>
                        </div>
                        <p className="text-[#ff8906] text-xl">Idr {formData.total.toLocaleString("ID")}</p>
                    </div>
                </section>
                <section>
                    <h3 className="text-3xl mb-8">Your Order</h3>
                    <div className="space-y-4">
                        {
                            [1, 2].map(data => {
                                return <div key={data} className="rounded-md bg-gray-200 flex gap-8 p-4 w-full">
                                    <div className="size-30 overflow-hidden">
                                        <img src="/product1.png" alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h1 className="text-3xl">Hazelnut Latte</h1>
                                        <p className="flex gap-4 text-xl">
                                            <span>2pcs</span>
                                            <span>|</span>
                                            <span>Regular</span>
                                            <span>|</span>
                                            <span>Ice</span>
                                            <span>|</span>
                                            <span>Dine In</span>
                                        </p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OrderSidebar;
