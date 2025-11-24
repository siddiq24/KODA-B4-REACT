import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Filter, X, Search, RotateCcw, Tag, ArrowUpDown, DollarSign } from 'lucide-react';

export default function FilterSidebar({ className, search, total, setSearch, setProducts }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);
    const [range, setRange] = useState([20000, 50000]);
    const [loading, setLoading] = useState(false);
    const [filterParams, setFilterParams] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const categories = [
        "Coffee", "Non Coffee", "Fruit Tea",
        "Tea", "Food", "Ice Blended",
        "Signature Coffee", "Origin Coffee"
    ];

    const sorts = [
        { label: "Title [A-Z]", value: "title_asc" },
        { label: "Title [Z-A]", value: "title_desc" },
        { label: "Price [Low to High]", value: "price_asc" },
        { label: "Price [High to Low]", value: "price_desc" }
    ];

    const handleReset = () => {
        setSearch("");
        setSelectedCategories([]);
        setSelectedSort(null);
        setRange([20000, 50000]);
        setFilterParams("");
    };

    const rangeRef = useRef(null);

    const min = 10000;
    const max = 100000;

    useEffect(() => {
        if (rangeRef.current) {
            const minPercent = ((range[0] - min) / (max - min)) * 100;
            const maxPercent = ((range[1] - min) / (max - min)) * 100;
            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [range]);

    const handleMinChange = (e) => {
        const value = Math.min(+e.target.value, range[1] - 10);
        setRange([value, range[1]]);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(+e.target.value, range[0] + 10);
        setRange([range[0], value]);
    };

    const toggleCategory = (id) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    const fetchFilteredProducts = async () => {
        setLoading(true);

        let query = `?search=${encodeURIComponent(debouncedSearch)}`;

        selectedCategories.forEach(cat => {
            query += `&cat=${cat}`;
        });

        if (selectedSort !== null) {
            const sortMap = [
                "&shortBy=title&asc=true",
                "&shortBy=title",
                "&shortBy=price&asc=true",
                "&shortBy=price"
            ];
            query += sortMap[selectedSort];
        }

        query += `&minPrice=${range[0]}&maxPrice=${range[1]}`;

        setFilterParams(query);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products${query}`);
            setProducts(response.data.result || []);
        } catch (error) {
            console.error("Fetch Error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, [debouncedSearch, selectedCategories, selectedSort]);

    return (
        <div className={`bg-emerald-300 rounded-2xl shadow-lg border border-gray-200/50 p-6 space-y-8 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-xl flex items-center justify-center">
                        <Filter size={24} color="white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                        <p className="text-sm text-gray-500">Refine your search</p>
                    </div>
                </div>
                <button
                    onClick={handleReset}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group"
                    title="Reset all filters"
                >
                    <RotateCcw size={20} color="black" className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>

            {/* Search Section */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Search size={16} />
                    Search Products
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-gray-200 rounded-xl focus:border-[#ff8906] focus:ring-2 focus::[#ff8906]/20 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Tag size={16} />
                    Categories
                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {selectedCategories.length} selected
                    </span>
                </div>
                <div className="grid pt-6 grid-cols-2 gap-2 max-h-48 overflow-y-auto overflow-clip scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pc">
                    {categories.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => toggleCategory(i + 1)}
                            className={`
                                p-3 rounded-xl text-sm font-medium transition-all w-[80%] duration-300 text-left
                                ${selectedCategories.includes(i + 1)
                                    ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white shadow-lg transform scale-105'
                                    : 'bg-emerald-50 text-gray-700 hover:bg-rmrra-300 hover:shadow-md border'
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ArrowUpDown size={16} />
                    Sort By
                </div>
                <div className="space-y-2">
                    {sorts.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedSort(i)}
                            className={`
                                w-full p-3 rounded-xl text-sm text-left transition-all duration-300
                                ${selectedSort === i
                                    ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white shadow-lg transform scale-105'
                                    : 'bg-emerald-50 text-gray-700 hover:bg-rmrra-300 hover:shadow-md border'
                                }
                            `}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign size={16} />
                    Price Range
                </div>

                <div className="space-y-6">
                    {/* Range Slider */}
                    <div className="relative w-full h-8 flex items-center">
                        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                        <div
                            ref={rangeRef}
                            className="absolute h-2 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-full shadow-md"
                        ></div>

                        <div className="relative w-full">
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={range[0]}
                                onChange={handleMinChange}
                                className="absolute w-full -bottom-2 appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#ff8906] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200[&::-webkit-slider-thumb]:hover:scale-125"
                            />
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={range[1]}
                                onChange={handleMaxChange}
                                className="absolute w-full -bottom-2 appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#ff8906] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200[&::-webkit-slider-thumb]:hover:scale-125"
                            />
                        </div>
                    </div>

                    {/* Price Display */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">Min:</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-lg font-mono">
                                IDR {range[0].toLocaleString()}
                            </span>
                        </div>
                        <div className="w-2 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">Max:</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-lg font-mono">
                                IDR {range[1].toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {(selectedCategories.length > 0 || selectedSort !== null || search) && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-800 mb-2">
                        <Filter size={14} />
                        Active Filters
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {search && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                Search: "{search}"
                            </span>
                        )}
                        {selectedCategories.length > 0 && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                {selectedCategories.length} categories
                            </span>
                        )}
                        {selectedSort !== null && (
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                {sorts[selectedSort]?.label}
                            </span>
                        )}
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                            IDR {range[0].toLocaleString()} - {range[1].toLocaleString()}
                        </span>
                    </div>
                </div>
            )}

            {/* Apply Button */}
            <button
                onClick={fetchFilteredProducts}
                disabled={loading}
                className={`
                    w-full py-4 rounded-xl font-semibold text-white transition-all duration-300
                    flex items-center justify-center gap-2
                    ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#ff8906] to-orange-500 hover:shadow-lg transform hover:scale-105'
                    }
                `}
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Applying Filters...
                    </>
                ) : (
                    <>
                        <Filter size={18} />
                        Apply Filters
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                            {total} products
                        </span>
                    </>
                )}
            </button>

            {/* Results Count */}
            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-[#ff8906]">{total}</span> products
                </p>
            </div>
        </div>
    );
}