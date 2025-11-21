import { useState, useEffect } from "react";
import { Mail, User, MapPin, X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems, removeCartItem, updateCartItem } from "../../redux/slice/cartSlice";
import { createTransaction } from "../../redux/slice/transactions";
import { toast } from "react-toastify";

export default function PaymentDetails() {
    const [delivery, setDelivery] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const [pay, setPay] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, loading: cartLoading } = useSelector(state => state.cart);
    const { token, user } = useSelector(state => state.auth);
    console.log(user)

    useEffect(() => {
        if (token) {
            dispatch(getCartItems());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || "",
                fullName: user.fullname || "",
                address: user.address || ""
            }));
        }
    }, [user]);

    const handleRemove = async (cartItemId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
            try {
                await dispatch(removeCartItem(cartItemId)).unwrap();
                toast.success("Item berhasil dihapus dari keranjang");
            } catch (error) {
                console.log(error)
                toast.error("Gagal menghapus item dari keranjang");
            }
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await dispatch(updateCartItem({ cartItemId, quantity: newQuantity })).unwrap();
            toast.success("Jumlah item berhasil diupdate");
        } catch (error) {
            console.log(error)
            toast.error("Gagal mengupdate jumlah item");
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCheckout = async () => {
        if (!token) {
            toast.error("Silakan login terlebih dahulu");
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Keranjang belanja kosong");
            return;
        }

        if (!formData.email || !formData.fullName || !formData.address) {
            toast.error("Harap lengkapi semua informasi pengiriman");
            return;
        }

        if (!delivery) {
            toast.error("Pilih metode pengiriman terlebih dahulu");
            return;
        }

        setLoading(true);
        try {
            const transactionData = {
                name: user.fullname,
                address: user.address,
                phone: user.phone,
                email: user.email,
                payment_method_id: pay,
                delivery_id: delivery
            };
            console.log(transactionData)

            const result = await dispatch(createTransaction(transactionData)).unwrap();
            toast.success("Checkout berhasil!");

            navigate(`/transaction/${result.result.id}`);
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error.message || "Gagal melakukan checkout");
        } finally {
            setLoading(false);
        }
    };


    const totalOrder = cartItems.reduce((total, item) => total + (item.subtotal || 0), 0);
    const tax = totalOrder * 0.1;
    const deliveryCost = delivery === "Door Delivery" ? 10000 : 0;
    const subTotal = totalOrder + tax + deliveryCost;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (cartLoading) {
        return (
            <section className="w-full px-4 md:px-[5%] py-8 space-y-8 pt-30">
                <div className="animate-pulse">Memuat keranjang...</div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 md:px-[5%] lg:px-[] py-8 space-y-8 pt-30">
            <h1 className="text-3xl">Payment Details</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section */}
                <div className="flex-6 space-y-6">
                    {/* Your Order */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl">Your Order ({cartItems.length} items)</h2>
                            <button
                                onClick={() => navigate('/products')}
                                className="bg-[#ff8906] border-3 md:text-xl border-white hover:border-[#ff8906] px-3 py-2 rounded-md text-sm"
                            >
                                + Add Menu
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-8 bg-gray-100 rounded-lg">
                                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-500 text-lg">Keranjang belanja kosong</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="mt-4 bg-[#ff8906] text-white px-6 py-2 rounded-md hover:bg-orange-600"
                                >
                                    Belanja Sekarang
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 bg-gray-100 shadow-sm rounded-md p-3"
                                    >
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">Gambar</span>
                                        </div>
                                        <div className="flex-1 space-y-2 md:space-y-3">
                                            <h3 className="font-semibold mt-1 md:text-xl">{item.productName}</h3>
                                            <p className="md:text-lg text-gray-500">
                                                Quantity: {item.quantity} | Varian: {item.varianId} | Size: {item.sizeId}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <p className="text-[#ff8906] text-lg md:text-2xl">
                                                    {formatCurrency(item.subtotal)}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-sm">Ubah Jumlah:</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="border p-1 rounded border-[#ff8906] transition-transform disabled:opacity-50"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-semibold text-sm min-w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    className="border p-1 rounded border-[#ff8906] bg-[#ff8906] text-white transition-transform"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            disabled={loading}
                                            className="p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                                        >
                                            <X className="text-red-500 hover:text-red-700" size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Payment Info & Delivery */}
                    <div className="space-y-4">
                        <h2 className="text-xl">Payment & Info Delivery</h2>

                        <div className="space-y-3 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="md:text-lg block mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Email"
                                        className="pl-12 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="fullName" className="md:text-lg block mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Full Name"
                                        className="pl-12 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="md:text-lg block mb-2">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        id="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Address"
                                        className="pl-12 md:text-lg w-full border border-gray-300 rounded-md p-2 focus:outline-[#ff8906]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Delivery Options */}
                            <div>
                                <p className="font-medium md:text-lg mb-3">Delivery Method</p>
                                <div className="flex gap-2 md:text-lg">
                                    {["Dine in", "Door Delivery", "Pick Up"].map((opt, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setDelivery(i + 1)}
                                            className={`flex-1 border rounded-md py-2 font-medium transition ${delivery - 1 === i
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
                    <h2 className="text-xl mb-4 mt-2 md:text-2xl">Order Summary</h2>
                    <div className="lg:w-full bg-gray-100 shadow-md rounded-xl p-6 py-8 h-fit">
                        <div className="space-y-4 text-lg md:text-xl">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal Order</span>
                                <span>{formatCurrency(totalOrder)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Cost</span>
                                <span>{formatCurrency(deliveryCost)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax (10%)</span>
                                <span>{formatCurrency(tax)}</span>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex justify-between font-semibold text-xl">
                                <span className="text-gray-700">Total</span>
                                <span className="text-[#ff8906]">{formatCurrency(subTotal)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || cartItems.length === 0}
                            className="w-full bg-[#ff8906] hover:bg-orange-600 text-xl md:text-2xl py-3 rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Processing..." : "Checkout Now"}
                        </button>

                        {/* Payment Methods */}
                        <div className="mt-6">
                            {/* Payment Methods Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-4">
                                {paymentMethods.map((payment) => (
                                    <div
                                        key={payment.id}
                                        onClick={() => setPay(payment.id)}
                                        className={` relative cursor-pointer transition-all duration-200 ease-in-out border-2 rounded-lg p-3 flex flex-col items-center justify-center hover:shadow-md hover:scale-105
                                        ${pay === payment.id
                                                ? "border-[#ff8906] bg-orange-50 shadow-md scale-105"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                            }`}
                                    >
                                        {payment.hasDiscount && (
                                            <div className="absolute -top-2 -right-2">
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    Diskon
                                                </span>
                                            </div>
                                        )}

                                        <img
                                            src={payment.logo}
                                            alt={payment.name}
                                            className={`
                                            h-12 object-contain mb-2 transition-all
                                            ${pay === payment.id ? "brightness-110" : "brightness-100"}`}
                                        />

                                        <span className={`
                                            text-xs font-medium text-center
                                            ${pay === payment.id ? "text-[#ff8906] font-semibold" : "text-gray-600"}`}>
                                            {payment.name}
                                        </span>

                                        <div className={`
                                            absolute top-2 left-2 w-4 h-4 rounded-full border-2 flex items-center justify-center
                                            ${pay === payment.id
                                                ? "border-[#ff8906] bg-[#ff8906]"
                                                : "border-gray-300 bg-white"
                                            }`}>
                                            {pay === payment.id && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const paymentMethods = [
    {
        id: 1,
        name: "Bank Mandiri",
        logo: "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/Mandiri-512.png",
    },
    {
        id: 2,
        name: "Bank BRI",
        logo: "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BRI-512.png",
    },
    {
        id: 3,
        name: "Bank BTN",
        logo: "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/Bank_BTN-512.png",
    },
    {
        id: 4,
        name: "Bank BCA",
        logo: "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BCA-512.png",
        hasDiscount: true
    },
    {
        id: 5,
        name: "OVO",
        logo: "https://i.pinimg.com/736x/61/c9/8a/61c98a1dffc2e04424d592564cef941f.jpg",
    },
    {
        id: 6,
        name: "DANA",
        logo: "https://i.pinimg.com/1200x/cb/aa/03/cbaa0388892e0a154353c2a1cb8b3fee.jpg",
    }
];