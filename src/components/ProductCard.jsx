import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Rating } from '../pages/landing/DetailProduct'

function ProductCard() {
    return (
        <div className='flex flex-col items-center'>
            <img src="/product1.png" alt="Hazelnut Latte" className='w-full aspect-square object-cover' />
            <div className='md:p-4 w-full bg-white md:-translate-y-18 md:shadow-lg md:w-[90%] pr-2 space-y-4'>
                <h3 className='text-md md:text-[2vw] md:font-semibold mb-2'>Hazelnut Latte</h3>
                <p className='text-gray-600 mb-2 md:mb-4 text-[15px] font-extralight md:text-[1.2vw] lg:text-[1vw] text-justify'>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                <Rating rate={4.5}/>
                <div className='mb-2 md:mb-4'>
                    <div className=' text-xs  md:text-[1vw] line-through'>IDR 25.000</div>
                    <div className='text-[#FF8906] text-lg md:text-[2vw] md:font-bold'>IDR 25.000</div>
                </div>
                <div className='md:flex gap-3 space-y-2 md:y-12'>
                    <button className='w-full bg-[#FF8906] text-white py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg md:text-base'>
                        Order Now
                    </button>
                    <button className='border-[1.5px] border-[#ff8906] rounded-lg md:aspect-square md:h-10 md:w-auto w-full py-3 flex items-center justify-center'>
                        <ShoppingCart size={24} color='#ff8906' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard