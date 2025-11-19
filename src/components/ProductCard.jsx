import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Rating } from '../pages/landing/DetailProduct'
import { useNavigate } from 'react-router'

function ProductCard({ product }) {
    const navigate = useNavigate()
    // const [products, setProducts]= useState(null)
    const rp = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(price)
    }

    const disc = product?.discount * 100

    const thisPrice = product?.price * (1 - product?.discount)
    return (
        <div
            onClick={() => { navigate(`/product/${product?.id}/detail`) }}
            className='cursor-pointer relative flex flex-col items-center h-full'>
            {disc > 0 && <div className='md:h-35 md:w-20 h-25 w-14 -top-2 absolute right-1 md:right-4 overflow-hidden'>
                <div className='relative inset-0'>
                    <div className='absolute inset-0 z-1 pt-3'>
                        <h2 className='text-center text-xl'>Disc</h2>
                        <h2 className='text-center text-xl md:text-4xl font-bold'>{disc}%</h2>
                    </div>
                    <div className='absolute bg-[#ff8906] size-15 md:size-20 rotate-45 translate-x-[50%] md:translate-y-10  translate-y-7'></div>
                    <div className='absolute bg-[#ff8906] size-15 md:size-20 -rotate-45 -translate-x-[50%] md:translate-y-10  translate-y-7'></div>
                    <div className='bg-[#ff8906] w-full h-18 rounded-e-md'></div>
                </div>
            </div>}
            <img src={product?.images[0]} alt="Hazelnut Latte" className='w-full aspect-square object-cover' />
            <div className='flex-col flex h-full md:p-4 w-full rounded-sm bg-white md:-translate-y-18 md:shadow-lg md:w-[90%] space-y-4'>
                <h3 className='text-lg md:text-[2vw] md:font-semibold mb-2'>{product?.title || 'Unknown'}</h3>
                <p className='text-gray-600  pr-2 mb-2 md:mb-4 text-[15px] font-extralight md:text-[1.2vw] lg:text-[1vw] text-justify'>{product?.desc}</p>
                <div className='flex-1'></div>
                <Rating rate={product?.rate} />
                <div className='mb-2 md:mb-4'>
                    {product?.discount && <span className=' text-xs  md:text-[1vw] line-through'>IDR {rp(product?.price)}</span>}
                    {disc > 0 && <span className='text-xs text-gray-400 ml-3'>-{(product?.price - thisPrice).toLocaleString('id')}</span>}
                    <div className='text-[#FF8906] text-lg md:text-[2vw] md:font-bold'>IDR {product?.discount ? rp(thisPrice) : rp(product?.price) || "-"}</div>
                </div>

                <button className='w-full hover:bg-[#FF8906] hover:text-white text-[#ff8906] py-2 md:py-3 rounded-lg border-2 md:border-3 border-[#ff8906] transition-colors text-xl'>
                    Show Detail
                </button>
                <div className='md:flex gap-3 space-y-2 md:y-12'>
                    <button className='w-full bg-[#FF8906] text-white py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg md:text-base'>
                        Order Now
                    </button>
                    <button className='border-2 md:border-3 border-[#ff8906] rounded-lg md:aspect-square md:h-12 md:w-auto w-full flex items-center justify-center'>
                        <ShoppingCart className='hover:text-white text-[#ff8906] h-10 md:h-full w-full p-1 hover:bg-[#ff8906]' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard