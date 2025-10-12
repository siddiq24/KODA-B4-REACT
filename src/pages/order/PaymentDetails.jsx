import { useState } from "react";
import { Mail, User, MapPin, X } from "lucide-react";

export default function PaymentDetails() {
    const [delivery, setDelivery] = useState("Dine in");
    const [orders, setOrders] = useState([
        {
            id: 1,
            name: "Hazelnut Latte",
            qty: 2,
            type: "Regular | Ice | Dine In",
            price: 20000,
            oldPrice: 40000,
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        },
        {
            id: 2,
            name: "Hazelnut Latte",
            qty: 2,
            type: "Regular | Ice | Dine In",
            price: 20000,
            oldPrice: 40000,
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        },
    ]);

    const handleRemove = (id) => {
        setOrders(orders.filter((item) => item.id !== id));
    };

    const totalOrder = orders.reduce((a, b) => a + b.price, 0);
    const tax = totalOrder * 0.1;
    const deliveryCost = 0;
    const subTotal = totalOrder + tax + deliveryCost;

    return (
        <section className="w-full px-4 md:px-[5%] lg:px-[] py-8 space-y-8 pt-30">
            <h1 className="text-3xl">Payment Details</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section */}
                <div className="flex-6 space-y-6">
                    {/* Your Order */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl">Your Order</h2>
                            <button className="bg-[#ff8906] border-3 md:text-xl border-white hover:border-[#ff8906] px-3 py-2 rounded-md text-sm">
                                + Add Menu
                            </button>
                        </div>

                        <div className="space-y-4">
                            {orders.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 bg-gray-100 shadow-sm rounded-md p-3"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 md:w-50 md:h-50 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 space-y-2 md:space-y-6">
                                        <span className="bg-red-600 text-white text-sm md:text- px-2 py-1 rounded-full">
                                            FLASH SALE!
                                        </span>
                                        <h3 className="font-semibold mt-1 md:text-xl">{item.name}</h3>
                                        <p className="md:text-xl text-gray-500">{item.qty}pcs | {item.type}</p>
                                        <div className="flex items-center gap-4">
                                            <p className="md:text-lg text-gray-400 line-through">IDR {item.oldPrice.toLocaleString()}</p>
                                            <p className="text-[#ff8906] text-lg md:text-2xl">
                                                IDR {item.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemove(item.id)}>
                                        <X className="text-red-500 hover:text-red-700" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Info & Delivery */}
                    <div className="space-y-4">
                        <h2 className="text-xl">Payment & Info Delivery</h2>

                        <div className="space-y-3 md:space-y-8">
                            <label htmlFor="email" className="md:text-lg">Email</label>
                            <div className="relative md:mt-3">
                                <Mail className="absolute left-3 my-2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="pl-14 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                />
                            </div>

                            <label htmlFor="fullname" className="md:text-lg">Full Name</label>
                            <div className="relative md:mt-3">
                                <User className="absolute left-3 top-2 text-gray-400" />
                                <input
                                    id="fullname"
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    className="pl-14 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                />
                            </div>

                            <label htmlFor="address" className="md:text-lg">Address</label>
                            <div className="relative md:mt-3">
                                <MapPin className="absolute left-3 top-2 text-gray-400" />
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Enter Your Address"
                                    className="pl-14 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                />
                            </div>

                            {/* Delivery Options */}
                            <div>
                                <p className="font-medium md:text-lg mb-2">Delivery</p>
                                <div className="flex gap-2 md:text-lg">
                                    {["Dine in", "Door Delivery", "Pick Up"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setDelivery(opt)}
                                            className={`flex-1 border rounded-md py-2 font-medium transition ${delivery === opt
                                                ? "bg-[#ff8906] text-white border-[#ff8906]"
                                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-4">
                    <h2 className="text-xl mb-4 mt-2 md:text-2xl">Total</h2>
                    <div className="lg:w-full bg-gray-100 shadow-md rounded-xl p-8 py-18 h-fit">
                        <div className="space-y-4 text-lg md:text-xl">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Order</span>
                                <span>Idr. {totalOrder.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery</span>
                                <span>Idr. {deliveryCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax</span>
                                <span>Idr. {tax.toLocaleString()}</span>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex justify-between font-semibold">
                                <span className="text-gray-500">Sub Total</span>
                                <span>Idr. {subTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#ff8906] hover:bg-orange-600 text-xl md:text-2xl py-3 rounded-md mt-4">
                            Checkout
                        </button>

                        {/* Payment Methods */}
                        <div className="mt-6">
                            <p className="font-medium mb-2 text-lg">We Accept</p>
                            <div className="flex flex-wrap gap-3 justify-between items-center py-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bank_BRI_logo.svg/512px-Bank_BRI_logo.svg.png" alt="BRI" className="h-5 md:h-8" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Dana_logo.svg/512px-Dana_logo.svg.png" alt="DANA" className="h-5 md:h-8" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bank_Central_Asia.svg/512px-Bank_Central_Asia.svg.png" alt="BCA" className="h-5 md:h-8" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Logo_ovo_purple.svg/512px-Logo_ovo_purple.svg.png" alt="OVO" className="h-5 md:h-8" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png" alt="PayPal" className="h-5 md:h-8" />
                            </div>
                            <p className="text-gray-500 mt-4">
                                *Get Discount if you pay with Bank Central Asia
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
