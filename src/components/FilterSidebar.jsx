import { useEffect, useRef, useState } from "react";

export default function FilterSidebar() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Coffee");
    const [selectedSort, setSelectedSort] = useState("Flash sale");
    const [range, setRange] = useState([374, 500]);

    const categories = ["Favorite Product", "Coffee", "Non Coffee", "Foods", "Add-On"];
    const sorts = ["Buy 1 get 1", "Flash sale", "Birthday Package", "Cheap"];

    const handleReset = () => {
        setSearch("");
        setSelectedCategory("");
        setSelectedSort("");
        setRange([374, 500]);
    };
    const rangeRef = useRef(null);

    const min = 300;
    const max = 600;

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

    return (
        <div className="hidden md:block rounded-3xl flex-1 bg-black text-white h-fit p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filter</h2>
                <button onClick={handleReset} className="text-lg text-red-400 hover:text-white">
                    Reset Filter
                </button>
            </div>

            <div>
                <p className="font-semibold mb-2">Search</p>
                <input
                    type="text"
                    placeholder="Search Your Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-4 text-xl rounded-md bg-white text-black placeholder-gray-400 focus:outline-none"
                />
            </div>

            <div>
                <p className="font-semibold mb-2 text-xl">Category</p>
                <div className="space-y-4 pl-4">
                    {categories.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategory === item}
                                onChange={() => setSelectedCategory(item)}
                                className="appearance-none w-4 h-4 border border-gray-400 rounded bg-black checked:bg-orange-500 checked:border-[#ff8906] focus:ring-0"
                            />
                            <span className="font-extralight">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <p className="font-semibold mb-2 text-xl">Sort By</p>
                <div className="space-y-4 pl-4">
                    {sorts.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedSort === item}
                                onChange={() => setSelectedSort(item)}
                                className="appearance-none w-4 h-4 border border-gray-400 rounded bg-black checked:bg-orange-500 checked:border-[#ff8906] focus:ring-0"
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <p className="font-semibold mb-3">Range Price</p>

                <div className="relative w-full h-8 flex items-center">
                    <div className="absolute w-full h-1.5 bg-gray-300 rounded-full"></div>

                    <div
                        ref={rangeRef}
                        className="absolute h-2 bg-orange-500 rounded-full"
                    ></div>

                    <div className="relative w-full">
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={range[0]}
                            onChange={handleMinChange}
                            className="absolute w-full -bottom-2 appearance-none bg-transparent pointer-events-none z-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto"
                        />
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={range[1]}
                            onChange={handleMaxChange}
                            className="absolute w-full -bottom-2  appearance-none bg-transparent pointer-events-none z-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto"
                        />
                    </div>
                </div>

                <div className="flex justify-between w-full text-sm text-gray-600 mt-2">
                    <span>IDR {range[0].toLocaleString()}</span>
                    <span>IDR {range[1].toLocaleString()}</span>
                </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md">
                Apply Filter
            </button>
        </div>
    );
}
