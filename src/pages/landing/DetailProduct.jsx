import { useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Star, ThumbsUp } from "lucide-react";
import ProductCard from "../../components/ProductCard";

export default function DetailProduct() {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(null);
    const [temp, setTemp] = useState(null);
    const [page, setPage] = useState(1);

    const handleQty = (type) => {
        setQty((prev) => (type === "plus" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    const images = [
        "/images/latte1.jpg",
        "/images/latte2.jpg",
        "/images/latte3.jpg",
        "/images/latte4.jpg",
    ];

    return (
        <div className="p-4 lg:p-10">
            <section className="flex flex-col lg:flex-row gap-6 pt-22 lg:pt-44 ">
                <div className="flex-1">
                    <div className="aspect-square border border-gray-200 overflow-hidden rounded-2xl shadow">
                        <img
                            src={images[0]}
                            alt="Hazelnut Latte"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-3 mt-4 overflow-x-auto">
                        {images.map((img, i) => (
                            i != 0 && <img
                                key={i}
                                src={img}
                                alt={`Hazelnut Latte ${i}`}
                                className="aspect-square flex-1 border border-gray-200 object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
                            />
                        ))}
                    </div>
                </div>


                <div className="flex-1 space-y-8 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs md:text-lg bg-red-500 text-white px-3 py-1 rounded-full w-fit font-semibold">
                            FLASH SALE!
                        </span>
                        <h1 className="text-3xl md:text-7xl font-semibold">Hazelnut Latte</h1>

                        <Rating rate={3.2} />

                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through">IDR 20.000</span>
                            <span className="text-orange-500 font-bold text-2xl">IDR 10.000</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <span>200+ Review</span>
                            <span>|</span>
                            <span>Recommendation</span>
                            <span className=""><ThumbsUp color="#ff8906" /></span>
                        </div>

                        <p className="text-gray-500 leading-relaxed">
                            Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </section>
            <section className='w-full h-22 col-start-1 col-end-3 flex gap-3 justify-center items-center'>
                {
                    [1, 2, 3, 4].map(i => {
                        return (
                            <div
                                key={i}
                                onClick={()=>setPage(i)}
                                className={`aspect-square h-12 ${page==i?'bg-[#ff8906]':'bg-gray-400'} rounded-full flex justify-center items-center`}>
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


export function Rating({ rate = 0 }) {
    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => {
                const fillPercent =
                    rate >= i
                        ? 100
                        : rate + 1 > i
                            ? (rate - Math.floor(rate)) * 100
                            : 0;

                return (
                    <div key={i} className="relative w-5 h-5">
                        <Star
                            className="absolute top-0 left-0"
                            stroke="#ff8906"
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
