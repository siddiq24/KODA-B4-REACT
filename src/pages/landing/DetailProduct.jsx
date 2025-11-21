import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DetailProduct() {
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
                const productData = res.data.result?.[0];

                if (productData) {
                    setProduct(productData);


                    if (productData.sizes?.[0]) {
                        setSelectedSize(productData.sizes[0].id);
                    }
                    if (productData.variants?.[0]) {
                        setSelectedVariant(productData.variants[0].id);
                    }
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Gagal memuat detail produk");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/products/${id}/recomendation?limit=4&page=${page}`
                );
                setProducts(res.data.result || []);
                setTotalPage(res.data?.totalPage || 1);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [id, page]);


    const discount = product?.discount?.Valid ? product.discount.Float64 : 0;
    const basePrice = product?.price || 0;
    const discountAmount = basePrice * discount / 100;
    const finalPrice = basePrice - discountAmount;


    const rp = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(price);
    };


    const handleQty = (type) => {
        setQty((prev) => {
            if (type === "plus") {
                return prev < (product.stock || 5) ? prev + 1 : prev;
            } else {
                return prev > 1 ? prev - 1 : 1;
            }
        });
    };

    const handleAddToCart = async () => {
        if (!token) {
            toast.error("Silakan login terlebih dahulu");
            return;
        }

        if (!selectedSize) {
            toast.error("Pilih ukuran terlebih dahulu");
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/cart`,
                {
                    product_id: parseInt(id),
                    size_id: selectedSize,
                    quantity: qty,
                    varian_id: selectedVariant,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success(res.data?.message || "Berhasil menambahkan produk ke keranjang");
        } catch (error) {
            console.error("Add to cart error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan produk ke keranjang";
            toast.error(errorMessage);
        }
    };


    const handleBuyNow = async () => {
        await handleAddToCart();
        navigate("/order/payment")
    };

    if (loading) {
        return (
            <div className="p-4 md:px-10 lg:px-[5%] pt-44 flex justify-center">
                <div className="animate-pulse">Memuat produk...</div>
            </div>
        );
    }

    if (!product.id) {
        return (
            <div className="p-4 md:px-10 lg:px-[5%] pt-44 flex justify-center">
                <div>Produk tidak ditemukan</div>
            </div>
        );
    }

    return (
        <div className="p-4 md:px-10 lg:px-[5%]">
            <section className="flex flex-col lg:flex-row gap-6 pt-22 lg:pt-44">

                <div className="flex-3 relative">
                    <div className="aspect-square border border-gray-200 overflow-hidden rounded-2xl shadow">
                        <img
                            src={product?.images?.[0] || "/placeholder-image.jpg"}
                            alt={product?.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product?.images && product.images.length > 1 && (
                        <div className="flex mt-4 gap-2 justify-between">
                            {product.images.slice(0, 3).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product?.title} ${i + 1}`}
                                    className="w-[30%] aspect-square border border-gray-200 object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
                                />
                            ))}
                        </div>
                    )}
                </div>


                <div className="flex-3 md:flex-5 space-y-8 md:space-y-12">

                    <div className="flex flex-col gap-2">
                        {discount > 0 && (
                            <span className="text-xs md:text-lg bg-red-500 text-white px-3 py-1 rounded-full w-fit font-semibold">
                                {discount}% OFF!
                            </span>
                        )}

                        <h1 className="text-3xl md:text-7xl font-semibold">{product?.title}</h1>

                        {product?.category && (
                            <span className="text-sm md:text-lg text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
                                {product.category}
                            </span>
                        )}

                        <div className='mb-2 md:mb-4'>
                            {discount > 0 && (
                                <>
                                    <span className='text-xs md:text-lg line-through text-gray-500'>
                                        {rp(basePrice)}
                                    </span>
                                    <span className='text-xs text-green-600 ml-3 font-semibold'>
                                        Hemat {rp(discountAmount)}
                                    </span>
                                </>
                            )}
                            <div className='text-[#FF8906] text-3xl md:text-4xl font-bold'>
                                {rp(finalPrice)}
                            </div>
                        </div>

                        <Rating rate={product?.rate || 4.8} />

                        <div className="flex items-center gap-3 text-gray-600">
                            <span>200+ Review</span>
                            <span>|</span>
                            <span>Recommendation</span>
                            <span><ThumbsUp color="#ff8906" /></span>
                        </div>

                        <p className="text-gray-500 leading-relaxed text-lg">
                            {product?.desc || "Deskripsi produk tidak tersedia."}
                        </p>
                    </div>


                    <div className="flex items-center gap-8">
                        <span className="font-semibold text-lg">Quantity:</span>
                        <button
                            onClick={() => handleQty("minus")}
                            disabled={qty <= 1}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Minus size={25} />
                        </button>
                        <span className="font-semibold text-2xl min-w-8 text-center">{qty}</span>
                        <button
                            onClick={() => handleQty("plus")}
                            disabled={qty >= (product.stock || 5)}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906] bg-[#ff8906] text-white transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={25} />
                        </button>
                    </div>


                    {product?.sizes && product.sizes.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2 text-lg">Pilih Ukuran</p>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size.id)}
                                        className={`px-4 py-4 w-full border rounded-md transition-colors ${selectedSize === size.id
                                            ? "bg-[#ff8906] text-white border-[#ff8906]"
                                            : "border-gray-300 hover:border-[#ff8906]"
                                            }`}
                                    >
                                        {size.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    {product?.variants && product.variants.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2 text-lg">Pilih Varian</p>
                            <div className="flex gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant.id)}
                                        className={`px-4 w-full py-4 border rounded-md transition-colors ${selectedVariant === variant.id
                                            ? "bg-[#ff8906] text-white border-[#ff8906]"
                                            : "border-gray-300 hover:border-[#ff8906]"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="md:flex gap-3 pt-3 space-y-4 md:space-y-0">
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 w-full text-xl bg-[#ff8906] text-white py-5 h-20 rounded-md hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedSize}
                        >
                            Beli Sekarang
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 w-full text-xl border border-[#ff8906] text-[#ff8906] py-5 h-20 rounded-md hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedSize}
                        >
                            <ShoppingCart size={25} />
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <h1 className='text-4xl my-8 text-center md:px-[10%]'>
                    Rekomendasi <span className='text-[#ff8906]'>Untuk Anda</span>
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {products.map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))}
                </div>
            </section>

            {totalPage > 1 && (
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

                    {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
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
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
                        disabled={page >= totalPage}
                        className={`aspect-square h-12 rounded-full flex justify-center items-center transition-colors ${page < totalPage
                            ? 'bg-[#ff8906] hover:bg-orange-600 cursor-pointer'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ArrowRight color={page < totalPage ? 'white' : 'gray'} />
                    </button>
                </section>
            )}
        </div>
    );
}

export function Rating({ rate = 0 }) {
    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => {
                const fillPercent =
                    rate >= i
                        ? 100
                        : rate > i - 1
                            ? (rate - (i - 1)) * 100
                            : 0;

                return (
                    <div key={i} className="relative w-5 h-5">
                        <Star
                            className="absolute top-0 left-0"
                            stroke="#ff8906"
                            fill="none"
                            size={20}
                        />
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${fillPercent}%` }}
                        >
                            <Star
                                stroke="#ff8906"
                                fill="#ff8906"
                                size={20}
                            />
                        </div>
                    </div>
                );
            })}
            <h3 className="text-xl font-semibold">{rate > 0 ? rate.toFixed(1) : '0.0'}</h3>
        </div>
    );
}