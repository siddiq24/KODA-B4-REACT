import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, ArrowRight, Printer, Download } from "lucide-react";
import { getTransactionById } from "../../redux/slice/transactions";
import { getCartItems } from "../../redux/slice/cartSlice";

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentTransaction, loading } = useSelector(state => state.transactions);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (orderId && token) {
            dispatch(getTransactionById(orderId));
            // Clear cart after successful orderaaz
            dispatch(getCartItems()); // This will refresh cart to empty
        }
    }, [orderId, token, dispatch]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="animate-pulse">Memuat detail pesanan...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
                        <p className="text-gray-600">
                            Terima kasih telah berbelanja. Pesanan Anda sedang diproses.
                        </p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Nomor Pesanan</span>
                                <p className="font-semibold">#{currentTransaction?.id}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Tanggal</span>
                                <p className="font-semibold">
                                    {new Date().toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500">Status</span>
                                <p className="font-semibold text-green-600">Menunggu Pembayaran</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Total</span>
                                <p className="font-semibold">
                                    {formatCurrency(currentTransaction?.total_amount || 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <button
                            onClick={() => navigate('/orders')}
                            className="flex-1 bg-[#ff8906] text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center"
                        >
                            Lihat Pesanan Saya
                            <ArrowRight className="ml-2" size={20} />
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                            <Printer className="mr-2" size={20} />
                            Cetak Invoice
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Lanjut Belanja
                        </button>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-3">Langkah Selanjutnya</h3>
                        <div className="space-y-2 text-sm text-blue-800">
                            <p>1. Selesaikan pembayaran dalam 24 jam</p>
                            <p>2. Konfirmasi pembayaran melalui WhatsApp</p>
                            <p>3. Pesanan akan diproses setelah pembayaran dikonfirmasi</p>
                            <p>4. Anda akan menerima notifikasi pengiriman</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}