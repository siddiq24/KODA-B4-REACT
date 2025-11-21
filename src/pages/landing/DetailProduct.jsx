import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router";
import axios from "axios";

export default function DetailProduct() {
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [temp, setTemp] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const { id } = useParams('id')

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
                setProduct(res.data.result[0])

                if (res.data.result?.sizes?.[0]) {
                    setSelectedSize(res.data.result[0].sizes[0])
                }
                console.log(res.data.result)
            } catch (error) {
                console.log("Error fetching product:", error)
            }
        })()
    }, [id])


    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}/recomendation?limit=4&page=${page}`)
                setProducts(res.data.result || [])
                setTotalPage(res.data?.totalPage || 1)
                console.log(res.data)
            } catch (error) {
                console.log("Error fetching products:", error)
            }
        })()
    }, [id, page])

    const discount = product?.discount?.Valid ? product.discount.Float64 : 0
    const discountAmount = product?.price ? (product.price * discount / 100) : 0
    const finalPrice = product?.price ? (product.price - discountAmount) : 0

    const rp = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleQty = (type) => {
        setQty((prev) => {
            if (type === "plus") {
                return prev < 5 ? prev + 1 : 5;
            } else {
                return prev > 1 ? prev - 1 : 1;
            }
        });
    };

    const handleAddToCart = () => {
        const cartItem = {
            productId: product.id,
            title: product.title,
            price: finalPrice,
            originalPrice: product.price,
            discount: discount,
            quantity: qty,
            size: selectedSize,
            temperature: temp,
            image: product.images?.[0]
        }
        console.log("Add to cart:", cartItem)
    }

    const handleBuyNow = () => {
        handleAddToCart()
    }

    return (
        <div className="p-4 md:px-10 lg:px-[5%]">
            <section className="flex flex-col lg:flex-row gap-6 pt-22 lg:pt-44 ">
                <div className="flex-3 relative">
                    <div className="aspect-square border border-gray-200 overflow-hidden rounded-2xl shadow">
                        <img
                            src={product?.images?.[0]}
                            alt={product?.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product?.images && product.images.length > 1 && (
                        <div className="flex mt-4 gap-2 justify-between">
                            {product.images.map((img, i) => (
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
                                        {rp(product.price)}
                                    </span>
                                    <span className='text-xs text-green-600 ml-3 font-semibold'>
                                        Save {rp(discountAmount)}
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
                            {product?.desc}
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <span className="font-semibold text-lg">Quantity:</span>
                        <button
                            onClick={() => handleQty("minus")}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906] transition-transform"
                        >
                            <Minus size={25} />
                        </button>
                        <span className="font-semibold text-2xl min-w-8 text-center">{qty}</span>
                        <button
                            onClick={() => handleQty("plus")}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906] bg-[#ff8906] text-white transition-transform"
                        >
                            <Plus size={25} />
                        </button>
                    </div>

                    {product?.sizes && product.sizes.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2 text-lg">Choose Size</p>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-4 w-full border rounded-md transition-colors ${selectedSize?.id === size.id
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

                    <div>
                        <p className="font-semibold mb-2 text-lg">Hot/Ice?</p>
                        <div className="flex gap-3">
                            {["Ice", "Hot"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTemp(t)}
                                    className={`px-4 w-full py-4 border rounded-md transition-colors ${temp === t
                                        ? "bg-[#ff8906] text-white border-[#ff8906]"
                                        : "border-gray-300 hover:border-[#ff8906]"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:flex gap-3 pt-3 space-y-4 md:space-y-0">
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 w-full text-xl bg-[#ff8906] text-white py-5 h-20 rounded-md hover:bg-orange-600 transition-colors font-semibold"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 w-full text-xl border border-[#ff8906] text-[#ff8906] py-5 h-20 rounded-md hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 font-semibold"
                        >
                            <ShoppingCart size={25} />
                            Add to cart
                        </button>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <h1 className='text-4xl my-8 text-center md:px-[10%]'>
                    Recommendation <span className='text-[#ff8906]'>For You</span>
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {products.slice(0, 4).map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))}
                </div>
            </section>

            {totalPage > 1 && (
                <section className='w-full h-22 mt-8 flex gap-3 justify-center items-center'>
                    <div
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        className={`aspect-square h-12 rounded-full flex justify-center items-center cursor-pointer transition-colors ${page > 1
                            ? 'bg-[#ff8906] hover:bg-orange-600'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ArrowLeft color={page > 1 ? 'white' : 'gray'} />
                    </div>

                    {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
                        <div
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`aspect-square h-12 cursor-pointer ${page === pageNum ? 'bg-[#ff8906] text-white' : 'bg-gray-200 hover:bg-gray-300'
                                } rounded-full flex justify-center items-center transition-colors`}
                        >
                            {pageNum}
                        </div>
                    ))}

                    <div
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
                        className={`aspect-square h-12 rounded-full flex justify-center items-center cursor-pointer transition-colors ${page < totalPage
                            ? 'bg-[#ff8906] hover:bg-orange-600'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ArrowRight color={page < totalPage ? 'white' : 'gray'} />
                    </div>
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