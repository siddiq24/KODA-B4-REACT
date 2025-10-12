import React, { useState } from 'react'
import { Checklist, Map } from '../../svg/svg'
import { ChevronLeft, ChevronRight, CircleCheck, MessageCircleMore, MoveLeft, MoveRight, ShoppingCart, Star } from 'lucide-react'
import Chat from '../../components/landing/Chat'
import ProductCard from '../../components/ProductCard'

function LandingPage() {
    const [openChat, setOpenChat] = useState(false)
    return (
        <div className={openChat?'fixed top-0':'relative'}>
            <div onClick={()=>{setOpenChat(!openChat)}}
            className='w-16 h-16 md:w-[calc(20px+4vw)] md:h-[calc(20px+4vw)] md:max-w-20 md:max-h-20 bg-[#ff8906] fixed right-7 bottom-7 md:right-15 md:bottom-15 rounded-full flex justify-center items-center z-10'>
                <MessageCircleMore color='#000' size={24} md:size={44} strokeWidth={'1.5px'} />
            </div>

            <section className='relative  md:flex flex-row-reverse min-h-screen md:h-screen'>
                <div className='md:relative h-[50vh] md:h-auto md:w-[50%] bg-[url(/home.jpg)] bg-cover bg-center'>
                    <Chat isOpen={openChat}/>
                </div>
                <div className='py-8 px-6 min-h-[50vh] md:w-[50%] bg-gradient-to-b from-black/80 to-black/100 md:h-full flex items-center md:px-[5%] lg:px-[6%]'>
                    <div className='text-white space-y-6 md:space-y-8'>
                        <h1 className='text-4xl md:text-[4vw] font-bold'>Start Your Day with Coffee and Good Meals</h1>
                        <p className='text-base md:text-[1.5vw]'>We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</p>
                        <button className='bg-[#FF8906] px-6 py-3 md:p-4 rounded-lg text-black font-medium w-full md:w-auto'>Get Started</button>
                        <div className='flex justify-between md:justify-start gap-8'>
                            <section className='flex-1 border-r border-white'>
                                <h3 className='text-[#FF8906] text-3xl md:text-[4vw] font-bold'>90+</h3>
                                <p className='text-sm md:text-base'>Staff</p>
                            </section>
                            <section className='flex-1 border-r border-white'>
                                <h3 className='text-[#FF8906] text-3xl md:text-[4vw] font-bold'>30+</h3>
                                <p className='text-sm md:text-base'>Store</p>
                            </section>
                            <section className='flex-1'>
                                <h3 className='text-[#FF8906] text-3xl md:text-[4vw] font-bold'>800+</h3>
                                <p className='text-sm md:text-base'>Customer</p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <section className='md:flex flex-row-reverse md:h-[50vw] min-h-screen'>
                <div className='md:w-[50%]'>
                    <img src="/barista.jpg" alt="Barista" className='w-full h-100 md:h-[70%] object-cover object-[0%_20%]' />
                </div>
                <div className='py-8 px-6 md:w-[50%] flex items-center md:px-[5%] lg:px-[7vw]'>
                    <div className='space-y-6 md:space-y-8'>
                        <h1 className='text-3xl md:text-[3vw] lg:text-[4vw] font-bold'>We Provide
                            <span className='text-[#FF8906]'> Good Coffee</span> and
                            <span className='text-[#FF8906]'> Healthy Meals</span></h1>
                        <p className='text-base md:text-[1.5vw]'>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                        <div className='space-y-4 md:space-y-6'>
                            <section className='flex gap-3 md:gap-4 items-start'>
                                <CircleCheck fill='#ff8906' color='#fff' />
                                <p className='text-sm md:text-base'>High quality beans</p>
                            </section>
                            <section className='flex gap-3 md:gap-4 items-start'>
                                <CircleCheck fill='#ff8906' color='#fff' />
                                <p className='text-sm md:text-base'>Healthy meals, you can request the ingredients</p>
                            </section>
                            <section className='flex gap-3 md:gap-4 items-start'>
                                <CircleCheck fill='#ff8906' color='#fff' />
                                <p className='text-sm md:text-base'>Chat with our staff to get better experience for ordering</p>
                            </section>
                            <section className='flex gap-3 md:gap-4 items-start'>
                                <CircleCheck fill='#ff8906' color='#fff' />
                                <p className='text-sm md:text-base'>Free member card with a minimum purchase of IDR 200.000.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <section className='px-6 md:px-[7vw] py-12 md:py-16'>
                <div className='flex flex-col items-center gap-3 md:gap-8 mb-8 md:mb-12'>
                    <h1 className='text-2xl md:text-[3vw] text-center'>Here Is People <span className='text-[#8E6447]'>Favorite</span></h1>
                    <div className='w-20 h-1 md:w-22 md:h-2 bg-[#FF8906]'></div>
                    <p className='text-xs text-gray-500 md:text-[1.5vw] text-center'>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    <ProductCard/>
                </div>
            </section>

            {/* Map Section */}
            <section className='px-2 md:px-[10vw] md:py-16 bg-gray-50 '>
                <div className='md:flex justify-center h-fit'>
                    <Map />
                </div>
            </section>

            {/* Testimonial Section */}
            <section className='px-6 md:px-[10vw] py-12 md:py-[5vw] bg-gradient-to-b from-black/80 to-black flex flex-col md:flex-row gap-8'>
                <div className='md:w-1/2 flex flex-col md:flex-row'>
                    <h2 className='text-white md:hidden text-xl font-bold w-full text-center mb-6'>TESTIMONIAL</h2>
                    <img
                        src="/testi1.jpg"
                        alt="Viezh Robert"
                        className='w-full h-64 md:h-auto object-cover aspect-4/3 object-[0%_10%]'
                    />
                </div>

                {/* Testimonial Content */}
                <div className='md:w-1/2 text-white flex flex-col gap-6 md:gap-8'>
                    <h2 className='hidden md:block text-lg md:text-[1.3vw]'>TESTIMONIAL</h2>
                    <div>
                        <h3 className='text-2xl md:text-[3vw] lg:text-[4vw] font-bold pl-4 border-l-4 md:border-l-6 border-l-[#ff8906]'>Viezh Robert</h3>
                        <p className='text-[#FF8906] text-lg md:text-[2vw] lg:text-[1.5vw] mt-2'>Manager Coffe Shop</p>
                    </div>

                    <div>
                        <p className='text-base md:text-[1.8vw] lg:text-[1.2vw]'>
                            "Wow... I am very happy to spend my whole day here. The Wi-fi is good, and the coffee and meals tho.
                            I like it here!! Very recommended!"
                        </p>
                    </div>

                    <div className='flex gap-3 md:gap-5 items-center'>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} fill='#ff8906' color='#ff8906' size={20} md:size={'1.3vw'} />
                        ))}
                        <p className='text-base md:text-lg'>5.0</p>
                    </div>

                    <div className='flex gap-3 md:gap-4'>
                        <button className='w-8 h-8 md:w-[calc(15px+2vw)] md:h-[calc(15px+2vw)] bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                            <ChevronLeft color='#000' size={16} md:size={20} />
                        </button>
                        <button className='w-8 h-8 md:w-[calc(15px+2vw)] md:h-[calc(15px+2vw)] bg-[#FF8906] rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors'>
                            <ChevronRight color='#000' size={16} md:size={20} />
                        </button>
                    </div>
                    <div className='flex gap-2 md:gap-[1vw]'>
                        <div className='w-3 h-3 md:w-[2vw] md:h-[1vw] bg-[#FF8906] rounded-full'></div>
                        <div className='w-2 h-2 md:w-[1vw] md:h-[1vw] bg-white rounded-full'></div>
                        <div className='w-2 h-2 md:w-[1vw] md:h-[1vw] bg-white rounded-full'></div>
                        <div className='w-2 h-2 md:w-[1vw] md:h-[1vw] bg-white rounded-full'></div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default LandingPage