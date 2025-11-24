import { ArrowRight, Search, SlidersHorizontal, Star, Filter, Zap, Clock, Shield, Truck } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import { FilterContext } from '../../context/filterContext';
import FilterSidebar from '../../components/FilterSidebar';

function ProductsPage() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [activePromo, setActivePromo] = useState(0);
    const { filterOpen, setFilterOpen } = useContext(FilterContext);

    const promos = [
        {
            id: 1,
            img: '/promo1.png',
            title: "HAPPY MOTHER'S DAY",
            desc: 'Get one of our favorite menu for free! Limited time offer for our special customers.',
            bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
            badge: "Special Offer",
            timeLeft: "2 days left"
        },
        {
            id: 2,
            img: '/promo1.png',
            title: "WEEKEND SPECIAL",
            desc: 'Buy 1 get 1 free on all coffee beverages every weekend. Perfect for family time!',
            bg: 'bg-gradient-to-r from-blue-500 to-teal-500',
            badge: "Weekend",
            timeLeft: "5 days left"
        },
        {
            id: 3,
            img: '/promo1.png',
            title: "MORNING BOOST",
            desc: '50% off on all breakfast combos from 7-10 AM. Start your day right with us!',
            bg: 'bg-gradient-to-r from-orange-500 to-red-500',
            badge: "Breakfast",
            timeLeft: "1 week left"
        },
    ];

    const features = [
        {
            icon: Truck,
            title: "Free Delivery",
            description: "Free delivery for orders above IDR 100.000"
        },
        {
            icon: Shield,
            title: "Quality Guarantee",
            description: "100% quality guarantee on all products"
        },
        {
            icon: Clock,
            title: "Fast Service",
            description: "Quick preparation and delivery"
        },
        {
            icon: Zap,
            title: "Fresh Ingredients",
            description: "Daily fresh ingredients used"
        }
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
            setProducts(response.data.result || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActivePromo((prev) => (prev + 1) % promos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
            {/* Hero Section */}
            <section className='relative h-80 md:h-96 overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-1"></div>
                <img
                    src="/productHero.jpg"
                    alt="Coffee Products"
                    className='w-full h-full object-cover object-[0%_65%] transform hover:scale-105 transition-transform duration-700'
                />
                <div className="absolute inset-0 z-2 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Products</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
                            Discover premium coffee and delicious meals crafted with passion
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className='relative z-10 -mt-8 px-4 md:px-8'>
                <div className='max-w-[80%] mx-auto'>
                    <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200/50 backdrop-blur-sm'>
                        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
                            <div className='flex-1 w-full'>
                                <div className='relative'>
                                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        placeholder='Find your favorite coffee...'
                                        className='w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#ff8906] focus:ring-2 focus:ring-[#ff8906]/20 outline-none transition-all text-lg'
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => { setFilterOpen(!filterOpen) }}
                                className='w-full md:w-auto h-14 px-6 bg-gradient-to-r from-[#ff8906] to-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transform hover:scale-105 transition-all duration-300'
                            >
                                <SlidersHorizontal size={20} />
                                Filters
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200/50 text-center group hover:shadow-lg transition-all duration-300">
                                        <div className="w-12 h-12 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <Icon size={24} color="white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Section */}
            <section className='py-16 px-4 md:px-8'>
                <div className='max-w-8xl mx-auto px-24'>
                    <div className='flex items-center justify-between mb-8'>
                        <div>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                                Today's <span className='text-[#ff8906]'>Promo</span>
                            </h2>
                            <p className="text-gray-600 mt-2">Special offers just for you</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            {promos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActivePromo(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 z-10 ${activePromo === index ? 'bg-[#ff8906] w-6' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <PromoCarousel data={promos} activeIndex={activePromo} onSelect={setActivePromo} />
                </div>
            </section>

            <section className='py-8 px-4 md:px-8 pb-20'>
                <div className='max-w-8xl mx-auto'>
                    <div className='flex items-center justify-between mb-8 w-[40%'>
                        <div>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                                Our <span className='text-[#ff8906]'>Products</span>
                            </h2>
                            <p className="text-gray-600 mt-2">{products.length} products available</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#ff8906]">
                                <option>Popular</option>
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Filter Sidebar */}
                        <div className='w-130'>
                            <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200/50 sticky top-24 bottom-24    ">
                                <div className="flex items-center gap-3 mb-6">
                                    <Filter size={20} className="text-[#ff8906]" />
                                    <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                                </div>
                                <FilterSidebar search={search} setSearch={setSearch} setProducts={setProducts} />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className='flex-1'>
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                                            <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                                            <div className="space-y-2">
                                                <div className="bg-gray-200 h-4 rounded"></div>
                                                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : products.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                        {products.map(product => (
                                            <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className='flex justify-center items-center gap-4 mt-12'>
                                        <button
                                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                            disabled={page <= 1}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${page > 1
                                                ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white hover:shadow-lg cursor-pointer'
                                                : 'bg-gray-200 cursor-not-allowed'
                                                }`}
                                        >
                                            <ArrowRight className="rotate-180" size={20} />
                                        </button>

                                        {[1, 2, 3, 4].map(i => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i)}
                                                className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${page === i
                                                    ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white shadow-lg scale-110'
                                                    : 'bg-white border border-gray-200 hover:border-[#ff8906] text-gray-600 hover:text-[#ff8906]'
                                                    }`}
                                            >
                                                {i}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setPage(prev => prev + 1)}
                                            className="w-12 h-12 bg-gradient-to-r from-[#ff8906] to-orange-500 text-white rounded-xl flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                        >
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search size={48} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No Products Found</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearch('')
                                            fetchProducts()
                                        }}
                                        className="mt-6 bg-gradient-to-r from-[#ff8906] to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const PromoCarousel = ({ data, activeIndex, onSelect }) => {
    const containerRef = useRef(null);

    const handleSelect = (index) => {
        onSelect(index);
        const container = containerRef.current;
        const selected = container.children[index];

        if (container && selected) {
            const containerWidth = container.offsetWidth;
            const selectedWidth = selected.offsetWidth;
            const scrollPosition = selected.offsetLeft - (containerWidth / 2) + (selectedWidth / 2);

            container.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="space-y-6">
            <div
                ref={containerRef}
                className="flex gap-6 w-full scroll-smooth  py-4 scrollbar-hide overflow-clip px-22 justify-center"
            >
                {data.map((item, i) => (
                    <div
                        key={item.id}
                        onClick={() => handleSelect(i)}
                        className={`
                            flex-shrink-0 w-80 md:w-96 h-48 rounded-3xl ${item.bg} p-6 relative
                            cursor-pointer transition-all duration-500 transform
                            ${activeIndex === i ? "scale-105 shadow-2xl" : "scale-100 shadow-lg opacity-90"}
                            overflow-hidden 
                        `}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-black/10"></div>

                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {item.badge}
                        </div>

                        {/* Time Left */}
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            {item.timeLeft}
                        </div>

                        <div className="flex h-full items-center">
                            <img
                                src={item.img}
                                alt={item.title || ""}
                                className="w-32 h-32 object-contain transform hover:scale-110 transition-transform duration-300"
                            />
                            <div className="flex-1 text-white pl-4">
                                <h1 className="text-xl font-bold mb-2 line-clamp-2">
                                    {item.title}
                                </h1>
                                <h3 className="text-sm opacity-90 line-clamp-2">{item.desc}</h3>
                                <button className="mt-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                                    Claim Coupon
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductsPage