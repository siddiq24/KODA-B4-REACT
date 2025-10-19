import React from 'react'
import { Logo } from '../svg/svg'
import { Search } from 'lucide-react'
import { Link } from 'react-router'

function Sidebar({ isOpen, set }) {
    return (
        <div onClick={(e) => e.stopPropagation()}
            className={`fixed h-screen z-20 top-0 w-[80%] max-w-sm pb-8 bg-white p-3 px-5 transition-all duration-1000 ease-in-out flex flex-col ${isOpen ? 'left-0' : '-left-full'
                }`}>
            <Logo color={'#8E6447'} w={150} h={50} />
            <nav className="mt-8 mb-auto">
                <label htmlFor="search-product" className='text-xl font-semibold'>Search Product</label>
                <div className='flex border mt-4 rounded-lg p-4 border-gray-400 gap-3'>
                    <Search />
                    <input id='search-product' type="text" placeholder='Fine Product' className='w-full outline-none text-lg placeholder:text-lg' />
                </div>
                <ul className="w-full">
                    <li>
                        <Link
                            onClick={() => set(false)}
                            to="/"
                            className="block w-full border-b border-gray-300 py-4 px-2 text-xl hover:text-[#ff8906] transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => set(false)}
                            to="/products"
                            className="block w-full border-b border-gray-300 py-4 px-2 text-xl hover:text-[#ff8906] transition-colors"
                        >
                            Product
                        </Link>
                    </li>
                </ul>

            </nav>
            <nav className='flex-1 flex flex-col justify-end gap-4 pb-8'>
                <Link to={'/auth/login'} className='w-full text-center text-xl border rounded-lg p-4'>Sign In</Link>
                <Link to={'/auth/register'} className='w-full text-center text-xl border border-[#ff8906] rounded-lg p-4 bg-[#ff8906]'>Sign Up</Link>
            </nav>
        </div>
    )
}

export default Sidebar