import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Star, ThumbsUp, Heart } from "lucide-react";
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
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
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
                    productId: parseInt(id),
                    sizeId: selectedSize,
                    quantity: qty,
                    varianId: selectedVariant,
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

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        toast.success(!isWishlisted ? "Ditambahkan ke wishlist" : "Dihapus dari wishlist");
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-44 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff8906]"></div>
                    <div className="text-lg font-medium text-gray-600">Memuat produk...</div>
                </div>
            </div>
        );
    }

    if (!product.id) {
        return (
            <div className="min-h-screen pt-44 flex justify-center items-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😔</div>
                    <div className="text-2xl font-bold text-gray-700 mb-2">Produk tidak ditemukan</div>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-[#ff8906] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:px-10 lg:px-[5%] bg-gray-50 min-h-screen">
            <section className="flex flex-col lg:flex-row gap-8 pt-22 lg:pt-44">
                {/* Product Images */}
                <div className="flex-3 relative">
                    <div className="aspect-square border-2 border-gray-100 overflow-hidden rounded-3xl shadow-lg bg-white relative">
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff8906]"></div>
                            </div>
                        )}
                        <img
                            src={product?.images?.[0] || "/placeholder-image.jpg"}
                            alt={product?.title}
                            className="w-full h-full object-cover transition-opacity duration-300"
                            onLoad={() => setImageLoading(false)}
                            style={{ opacity: imageLoading ? 0 : 1 }}
                        />

                        {/* Wishlist Button */}
                        <button
                            onClick={toggleWishlist}
                            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                            <Heart
                                size={24}
                                fill={isWishlisted ? "#ff8906" : "none"}
                                color={isWishlisted ? "#ff8906" : "#333"}
                            />
                        </button>

                        {/* Discount Badge */}
                        {discount > 0 && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                {discount}% OFF
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Images */}
                    {product?.images && product.images.length > 1 && (
                        <div className="flex mt-6 gap-3 justify-center">
                            {product.images.slice(0, 3).map((img, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        src={img}
                                        alt={`${product?.title} ${i + 1}`}
                                        className="w-24 h-24 border-2 border-gray-200 object-cover rounded-xl cursor-pointer hover:border-[#ff8906] transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-3 md:flex-5 space-y-8 md:space-y-10">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4">
                        {product?.category && (
                            <span className="text-sm md:text-base text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full w-fit font-medium border border-gray-200">
                                {product.category}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight">
                            {product?.title}
                        </h1>

                        <div className="flex items-center gap-4 flex-wrap">
                            <Rating rate={product?.rate || 4.8} />
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <ThumbsUp size={18} color="#ff8906" />
                                <span className="font-medium">200+ Review</span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="text-green-600 font-medium">
                                {product.stock || 5} tersedia
                            </div>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="mb-4">
                            {discount > 0 && (
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-lg line-through text-gray-500">
                                        {rp(basePrice)}
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Hemat {rp(discountAmount)}
                                    </span>
                                </div>
                            )}
                            <div className="text-4xl md:text-5xl font-bold text-[#FF8906]">
                                {rp(finalPrice)}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {product?.desc || "Deskripsi produk tidak tersedia."}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg text-gray-900">Quantity:</span>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQty("minus")}
                                    disabled={qty <= 1}
                                    className="w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:border-[#ff8906] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="font-bold text-2xl min-w-12 text-center bg-gray-100 py-2 px-4 rounded-lg">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => handleQty("plus")}
                                    disabled={qty >= (product.stock || 5)}
                                    className="w-12 h-12 border-2 border-[#ff8906] bg-[#ff8906] text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Size Selection */}
                    {product?.sizes && product.sizes.length > 0 && (
                        <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <p className="font-semibold text-lg text-gray-900 mb-4">Pilih Ukuran</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size.id)}
                                        className={`p-4 border-2 rounded-xl transition-all duration-300 font-medium ${selectedSize === size.id
                                            ? "bg-gradient-to-r from-[#ff8906] to-orange-500 text-white border-[#ff8906] shadow-lg transform scale-105"
                                            : "border-gray-300 hover:border-[#ff8906] hover:bg-orange-50"
                                            }`}
                                    >
                                        {size.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Variant Selection */}
                    {product?.variants && product.variants.length > 0 && (
                        <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <p className="font-semibold text-lg text-gray-900 mb-4">Pilih Varian</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant.id)}
                                        className={`p-4 border-2 rounded-xl transition-all duration-300 font-medium ${selectedVariant === variant.id
                                            ? "bg-gradient-to-r from-[#ff8906] to-orange-500 text-white border-[#ff8906] shadow-lg transform scale-105"
                                            : "border-gray-300 hover:border-[#ff8906] hover:bg-orange-50"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={handleBuyNow}
                            disabled={!selectedSize}
                            className="bg-gradient-to-r from-[#ff8906] to-orange-500 text-white py-5 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Beli Sekarang
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSize}
                            className="border-2 border-[#ff8906] text-[#ff8906] py-5 rounded-2xl hover:bg-orange-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <ShoppingCart size={25} />
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </section>

            {/* Recommendations Section */}
            <section className="mt-20 mb-16">
                <div className="text-center mb-12">
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                        Rekomendasi <span className='text-[#ff8906]'>Untuk Anda</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#ff8906] to-orange-500 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">Produk lain yang mungkin Anda sukai</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))}
                </div>
            </section>

            {/* Pagination */}
            {totalPage > 1 && (
                <section className='w-full py-12 flex gap-3 justify-center items-center'>
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page <= 1}
                        className={`w-12 h-12 rounded-xl flex justify-center items-center transition-all duration-300 ${page > 1
                            ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 hover:shadow-lg cursor-pointer transform hover:scale-105'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ArrowLeft color={page > 1 ? 'white' : 'gray'} />
                    </button>

                    {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-12 h-12 cursor-pointer rounded-xl font-medium transition-all duration-300 ${page === pageNum
                                ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white shadow-lg transform scale-105'
                                : 'bg-white border-2 border-gray-300 hover:border-[#ff8906] hover:bg-orange-50'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
                        disabled={page >= totalPage}
                        className={`w-12 h-12 rounded-xl flex justify-center items-center transition-all duration-300 ${page < totalPage
                            ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 hover:shadow-lg cursor-pointer transform hover:scale-105'
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
                    <div key={i} className="relative w-6 h-6">
                        <Star
                            className="absolute top-0 left-0"
                            stroke="#ff8906"
                            fill="none"
                            size={24}
                        />
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${fillPercent}%` }}
                        >
                            <Star
                                stroke="#ff8906"
                                fill="#ff8906"
                                size={24}
                            />
                        </div>
                    </div>
                );
            })}
            <h3 className="text-xl font-bold text-gray-900">{rate > 0 ? rate.toFixed(1) : '0.0'}</h3>
        </div>
    );
}