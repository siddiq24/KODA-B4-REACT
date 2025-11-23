import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import { FilterContext } from '../../context/filterContext';
import FilterSidebar from '../../components/FilterSidebar';

function ProductsPage() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [, setLoading] = useState(false);
    const { filterOpen, setFilterOpen } = useContext(FilterContext);

    const promos = [
        {
            id: 0,
            img: '/promo1.png',
            title: "HAPPY MOTHER'S DAY",
            desc: 'Get one of our favorite menu for free',
            bg: 'bg-[#88B788]'
        },
        {
            id: 1,
            img: '/promo1.png',
            title: "HAPPY MOTHER'S DAY",
            desc: 'Get one of our favorite menu for free',
            bg: 'bg-[#88B788]'
        },
        {
            id: 2,
            img: '/promo1.png',
            title: "HAPPY MOTHER'S DAY",
            desc: 'Get one of our favorite menu for free',
            bg: 'bg-[#88B788]'
        },
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

    return (
        <div className='space-y-6 overflow-hidden px-[5%] md:p-0'>
            <section className='hidden md:block'>
                <img src="/productHero.jpg" alt="" className='h-150 w-full object-cover object-[0%_65%]' />
            </section>
            <section className='pt-22 flex gap-2 md:hidden'>
                <div className='border border-gray-400 rounded-lg flex w-full items-center px-4 gap-4'>
                    <Search />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            console.log(e.target.value)
                        }}
                        placeholder='Find Product'
                        className='h-15 w-full outline-none text-xl' />
                </div>
                <div
                    onClick={() => { setFilterOpen(!filterOpen) }}
                    className='aspect-square h-15 flex items-center justify-center bg-[#ff8906] rounded-lg'>
                    <SlidersHorizontal />
                </div>
            </section>
            <section className='space-y-6 pb-16 md:mt-18'>
                <h1 className='text-4xl md:px-[10%]'>Today <span className='text-[#ff8906]'>Promo</span></h1>
                <Card data={promos} />
            </section>
            <section className='space-y-6 md:px-[10%] border'>
                <h1 className='text-4xl'>Our <span className='text-[#ff8906]'>Product</span></h1>
                <section className='md:flex gap-5'>
                    <FilterSidebar className={'hidden md:block'} search={search} setSearch={setSearch} setProducts={setProducts} />
                    <div className='grid grid-cols-2 gap-6 md:flex-2'>
                        {
                            products?.map(i => {
                                return (
                                    <ProductCard key={i.id} product={i} />
                                )
                            })
                        }
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
                </section>
            </section>
        </div>
    )
}

const Card = ({ data }) => {
    const [center, setCenter] = useState(0);
    const containerRef = useRef(null);

    const handleSelect = (index) => {
        setCenter(index);
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
        <section className="space-y-4">
            <div
                ref={containerRef}
                className="flex gap-6 w-full scroll-smooth overflow-hidden py-2 z-2 relative"
            >
                {[...data, ...data].map((item, i) => (
                    <div
                        key={i}
                        onClick={() => handleSelect(item.id)}
                        className={`h-40 aspect-[7/3] ml-2 md:aspect-[3/1] rounded-3xl ${item.bg} pr-6 flex cursor-pointer transition-all duration-300 ${center === i ? "scale-105" : "ring-transparent"
                            }`}
                    >
                        <img
                            src={item.img}
                            alt={item.title || ""}
                            className="translate-y-1 size-44 object-contain"
                        />
                        <div className="w-full flex-col flex justify-between py-4">
                            <h1 className="text-black text-lg font-semibold line-clamp-1">
                                {item.title}
                            </h1>
                            <h3 className="text-black flex-1 line-clamp-2">{item.desc}</h3>
                            <p className="text-white">Klaim Kupon</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex w-full h-4 gap-2 justify-center">
                {data.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => handleSelect(data.id)}
                        className={`h-4 rounded-full cursor-pointer transition-all duration-300 ${center === data.id ? "w-8 bg-[#ff8906]" : "w-4 bg-gray-500"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductsPage