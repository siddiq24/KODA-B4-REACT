import React, { useEffect, useState } from 'react'
import { Map } from '../../svg/svg'
import { ChevronLeft, ChevronRight, CircleCheck, MessageCircleMore, Star, Coffee, Utensils, Clock, Users } from 'lucide-react'
import Chat from '../../components/landing/Chat'
import ProductCard from '../../components/ProductCard'
import axios from 'axios'
import { useSelector } from 'react-redux'

function LandingPage() {
    const [openChat, setOpenChat] = useState(false)
    const [products, setProducts] = useState([])
    const [isScrolled, setIsScrolled] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    console.log(useSelector(s => s.auth.user))

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/favorite?limit=4`)
                setProducts(response.data.result || [])
            } catch (error) {
                console.error('Error fetching products:', error)
                setProducts([])
            }
        })()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const testimonials = [
        {
            id: 1,
            name: "Viezh Robert",
            role: "Manager Coffee Shop",
            image: "/testi1.jpg",
            rating: 5.0,
            text: "Wow... I am very happy to spend my whole day here. The Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!",
            bgColor: "from-purple-500 to-pink-500"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Regular Customer",
            image: "/testi2.jpg",
            rating: 4.8,
            text: "The best coffee in town! The atmosphere is amazing and the staff is very friendly. I come here every morning before work.",
            bgColor: "from-blue-500 to-teal-500"
        },
        {
            id: 3,
            name: "Mike Chen",
            role: "Food Blogger",
            image: "/testi3.jpg",
            rating: 5.0,
            text: "As a food blogger, I've visited many coffee shops, but this one stands out. The quality and presentation are exceptional!",
            bgColor: "from-orange-500 to-red-500"
        }
    ]

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className={openChat ? 'fixed top-0' : 'relative'}>
            {/* Floating Chat Button */}
            <div
                onClick={() => { setOpenChat(!openChat) }}
                className={`fixed right-7 bottom-7 md:right-15 md:bottom-15 z-100 cursor-pointer transition-all duration-500 ${isScrolled ? 'scale-110' : 'scale-100'
                    }`}
            >
                <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-full flex justify-center items-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
                        <MessageCircleMore color='#fff' size={28} strokeWidth={'1.5px'} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
            </div>

            {/* Hero Section */}
            <section className='relative min-h-screen md:h-screen overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-1"></div>
                <div className='absolute inset-0 bg-[url(/home.jpg)] bg-cover bg-center transform hover:scale-105 transition-transform duration-10000'></div>

                <div className='relative z-2 h-full flex items-center'>
                    <div className='container mx-auto px-6 md:px-15 lg:px-20'>
                        <div className='text-white space-y-8 md:space-y-12 max-w-2xl'>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-full flex items-center justify-center">
                                        <Coffee size={24} />
                                    </div>
                                    <span className="text-lg font-semibold text-[#ff8906]">Premium Coffee Experience</span>
                                </div>

                                <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
                                    Start Your Day with <span className="text-[#ff8906]">Coffee</span> and Good Meals
                                </h1>
                                <p className='text-xl md:text-2xl text-gray-200 leading-relaxed'>
                                    We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!
                                </p>
                            </div>

                            <button className='bg-gradient-to-r from-[#ff8906] to-orange-500 px-8 py-4 rounded-2xl text-white font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full md:w-auto'>
                                Get Started
                            </button>

                            {/* Stats */}
                            <div className='grid grid-cols-3 gap-8 pt-8'>
                                {[
                                    { count: "90+", label: "Staff", icon: Users },
                                    { count: "30+", label: "Store", icon: Utensils },
                                    { count: "800+", label: "Customer", icon: Coffee }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center group">
                                        <div className="w-16 h-16 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <stat.icon size={28} color="white" />
                                        </div>
                                        <h3 className='text-3xl md:text-4xl font-bold text-[#ff8906]'>{stat.count}</h3>
                                        <p className='text-sm md:text-base text-gray-300'>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Chat isOpen={openChat} />
            </section>

            {/* Features Section */}
            <section className='py-20 bg-gradient-to-br from-white to-gray-50'>
                <div className='container mx-auto px-6 md:px-15 lg:px-20'>
                    <div className='grid md:grid-cols-2 gap-16 items-center'>
                        <div className='relative'>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={`/barista.jpg`}
                                    alt="Barista"
                                    className='w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700'
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#ff8906] rounded-2xl rotate-12 opacity-20"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400 rounded-3xl -rotate-12 opacity-20"></div>
                        </div>

                        <div className='space-y-8'>
                            <div className="space-y-4">
                                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                                    We Provide <span className='text-[#FF8906]'>Good Coffee</span> and <span className='text-[#FF8906]'>Healthy Meals</span>
                                </h1>
                                <p className='text-lg md:text-xl text-gray-600 leading-relaxed'>
                                    You can explore the menu that we provide with fun and have their own taste and make your day better.
                                </p>
                            </div>

                            <div className='space-y-6'>
                                {[
                                    "High quality beans",
                                    "Healthy meals, you can request the ingredients",
                                    "Chat with our staff to get better experience for ordering",
                                    "Free member card with a minimum purchase of IDR 200.000."
                                ].map((feature, index) => (
                                    <div key={index} className='flex gap-4 items-center group'>
                                        <div className="w-12 h-12 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <CircleCheck size={24} color="white" />
                                        </div>
                                        <p className='text-lg text-gray-700 flex-1'>{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Products Section */}
            <section className='py-20 bg-white'>
                <div className='container mx-auto px-6 md:px-15 lg:px-20'>
                    <div className='text-center mb-16'>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-2xl flex items-center justify-center">
                                <Star size={24} color="white" />
                            </div>
                            <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
                                People's <span className='text-[#8E6447]'>Favorite</span>
                            </h2>
                        </div>
                        <div className='w-24 h-2 bg-gradient-to-r from-[#FF8906] to-orange-500 mx-auto rounded-full mb-6'></div>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            Discover our most loved products that customers keep coming back for. Quality and taste guaranteed!
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="transform hover:scale-105 transition-transform duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Coffee size={48} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-4">No Products Available</h3>
                            <p className="text-gray-500">Check back later for our featured products!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Map Section */}
            <section className='py-20 bg-gradient-to-br from-gray-50 to-white'>
                <div className='container mx-auto px-6 md:px-15 lg:px-20'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                            Find Our <span className='text-[#FF8906]'>Coffee Shops</span>
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            Visit us at any of our convenient locations. We're always ready to serve you the best coffee in town!
                        </p>
                    </div>

                    <div className='bg-white rounded-3xl shadow-2xl p-8 transform hover:shadow-3xl transition-all duration-500'>
                        <div className='flex justify-center'>
                            <Map />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden'>
                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff8906] rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className='container mx-auto px-6 md:px-15 lg:px-20 relative z-2'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        {/* Testimonial Image */}
                        <div className='relative'>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    className='w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700'
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${testimonials[currentTestimonial].bgColor} opacity-20`}></div>
                            </div>

                            {/* Navigation buttons */}
                            <div className='flex gap-4 mt-8 justify-center'>
                                <button
                                    onClick={prevTestimonial}
                                    className='w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20'
                                >
                                    <ChevronLeft color='#fff' size={24} />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className='w-14 h-14 bg-[#FF8906] rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all duration-300'
                                >
                                    <ChevronRight color='#000' size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className='text-white space-y-8'>
                            <div>
                                <span className='text-[#FF8906] font-semibold text-lg'>TESTIMONIAL</span>
                                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight'>
                                    What Our <span className="text-[#ff8906]">Customers</span> Say
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className='text-3xl font-bold'>{testimonials[currentTestimonial].name}</h3>
                                    <p className='text-[#FF8906] text-xl mt-2'>{testimonials[currentTestimonial].role}</p>
                                </div>

                                <div>
                                    <p className='text-xl text-gray-200 leading-relaxed'>
                                        "{testimonials[currentTestimonial].text}"
                                    </p>
                                </div>

                                <div className='flex gap-4 items-center'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            fill={i < Math.floor(testimonials[currentTestimonial].rating) ? '#ff8906' : 'none'}
                                            color='#ff8906'
                                            size={24}
                                        />
                                    ))}
                                    <p className='text-xl font-bold'>{testimonials[currentTestimonial].rating}</p>
                                </div>
                            </div>

                            {/* Testimonial indicators */}
                            <div className='flex gap-3'>
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`h-3 rounded-full transition-all duration-300 ${currentTestimonial === index
                                                ? 'w-8 bg-[#FF8906]'
                                                : 'w-3 bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#ff8906] to-orange-500">
                <div className="container mx-auto px-6 md:px-15 lg:px-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Experience the Best Coffee?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and start your day with our premium coffee and meals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-[#ff8906] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                            Order Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                            Visit Store
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage