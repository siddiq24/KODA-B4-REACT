import { useEffect, useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router";
import axios from "axios";

export default function DetailProduct() {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(null);
    const [temp, setTemp] = useState(null);
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const { id } = useParams('id')

    useEffect(() => {
        (async () => {
            try {
                const ress = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?id=${id}`)
                setProduct(ress.data[0])
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])
    useEffect(() => {
        (async () => {
            try {
                const ress = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
                setProducts(ress.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const thisPrice = product?.price * (1 - product?.discount)

    const handleQty = (type) => {
        setQty((prev) => (type === "plus" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="p-4 md:px-10 lg:px-[5%]">
            <section className="flex flex-col lg:flex-row gap-6 pt-22 lg:pt-44 ">
                <div className="flex-3 relative">
                    <div className="aspect-square border border-gray-200 overflow-hidden rounded-2xl shadow">
                        <img
                            src={product?.images?.[0]}
                            alt={product?.title?.[0]}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex mt-4 justify-between">
                        {product?.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={product?.title + ' ' + [i]}
                                className="w-[30%] border border-gray-200 object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
                            />
                        ))}
                    </div>
                </div>


                <div className="flex-3 md:flex-5 space-y-8 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        {product?.discount && <span className="text-xs md:text-lg bg-red-500 text-white px-3 py-1 rounded-full w-fit font-semibold">
                            FLASH SALE!
                        </span>}
                        <h1 className="text-3xl md:text-7xl font-semibold">{product?.title}</h1>

                        <div className='mb-2 md:mb-4'>
                            {product?.discount && <span className=' text-xs  md:text-[1vw] line-through'>IDR {product?.price?.toLocaleString('id')}</span>}
                            {product?.discount && <span className='text-xs text-gray-400 ml-3'>-{(product?.price - thisPrice).toLocaleString('id')}</span>}
                            <div className='text-[#FF8906] text-3xl md:text-[2vw] md:font-bold'>IDR {product?.discount ? thisPrice?.toLocaleString('id') : product?.price?.toLocaleString("id") || "-"}</div>
                        </div>
                        <Rating rate={product?.rate} />

                        <div className="flex items-center gap-3 text-gray-600">
                            <span>200+ Review</span>
                            <span>|</span>
                            <span>Recommendation</span>
                            <span className=""><ThumbsUp color="#ff8906" /></span>
                        </div>

                        <p className="text-gray-500 leading-relaxed">
                            {product?.desc}
                        </p>
                    </div>


                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => handleQty("minus")}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906]"
                        >
                            <Minus size={25} />
                        </button>
                        <span className="font-semibold text-2xl">{qty}</span>
                        <button
                            onClick={() => handleQty("plus")}
                            className="border p-2 rounded hover:scale-105 border-[#ff8906] bg-[#ff8906]"
                        >
                            <Plus size={25} />
                        </button>
                    </div>


                    <div>
                        <p className="font-semibold mb-2 text-lg">Choose Size</p>
                        <div className="flex gap-3">
                            {["Regular", "Medium", "Large"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`px-4 py-4 w-full border rounded-md ${size === s ? "bg-orange-500 text-white border-orange-500" : "border-gray-300"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div>
                        <p className="font-semibold mb-2 text-lg">Hot/Ice?</p>
                        <div className="flex gap-3">
                            {["Ice", "Hot"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTemp(t)}
                                    className={`px-4 w-full py-4 border rounded-md ${temp === t ? "bg-orange-500 text-white border-orange-500" : "border-gray-300"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="md:flex gap-3 pt-3 space-y-4">
                        <button className="flex-1 w-full text-xl bg-orange-500 text-white py-5 h-20 rounded-md hover:bg-orange-600">
                            Buy
                        </button>
                        <button className="flex-1 w-full text-xl border border-orange-500 text-orange-500 py-5 h-20 rounded-md hover:bg-orange-50 flex items-center justify-center gap-2">
                            <ShoppingCart size={25} />
                            Add to cart
                        </button>
                    </div>
                </div>

            </section>
            <section className="">
                <h1 className='text-4xl my-8 text-center md:px-[10%]'>Recommendation <span className='text-[#ff8906]'>For You</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {
                        [1, 2, 3, 4].map(i => {
                            return <ProductCard key={i} product={products[i]} />
                        })
                    }
                </div>
            </section>
            <section className='w-full h-22 col-start-1 col-end-3 flex gap-3 justify-center items-center'>
                {
                    [1, 2, 3, 4].map(i => {
                        return (
                            <div
                                key={i}
                                onClick={() => setPage(i)}
                                className={`aspect-square h-12 ${page == i ? 'bg-[#ff8906]' : 'bg-gray-400'} rounded-full flex justify-center items-center`}>
                                {i}
                            </div>
                        )
                    })
                }
                <div className='aspect-square h-12 bg-[#ff8906] rounded-full flex justify-center items-center'>
                    <ArrowRight color='white' />
                </div>
            </section>
        </div>
    );
}


export function Rating({ rate }) {
    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => {
                const fillPercent =
                    rate >= i
                        ? 100
                        : rate + 1 > i + 0.5
                            ? (rate - Math.floor(rate)) * 100 - 10
                            : rate + 1 < i + 0.5
                                ? (rate - Math.floor(rate)) * 100 + 10
                                : (rate - Math.floor(rate)) * 100;

                return (
                    <div key={i} className="relative w-5 h-5">
                        <Star
                            className="absolute top-0 left-0"
                            stroke={rate ? "#ff8906" : "#3333"}
                            fill={rate > 0 ? "#fff" : "#3333"}
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
            <h3 className="text-xl">{rate}</h3>
        </div>
    );
}
