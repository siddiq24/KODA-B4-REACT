import React from 'react'
import { Logo } from '../svg/svg'
import { Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Sidebar({ isOpen, set }) {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const isActive = (path)=>{
        if (location.pathname === path){
            return 'border-[#ff8906] text-[#ff8906]'
        }else{
            return 'border-gray-300'
        }
    }
    return (
        <div onClick={(e) => e.stopPropagation()}
            className={`fixed h-screen z-20 top-0 w-[80%] max-w-sm pb-8 bg-white p-3 px-5 transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'left-0' : '-left-full'
                }`}>
            <Logo 
            onClick={()=>navigate('/')}
            color={'#8E6447'} w={150} h={50} />
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
                            className={`${isActive('/')} block w-full border-b  py-4 px-2 text-xl hover:text-[#ff8906] transition-colors`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => set(false)}
                            to="/products"
                            className={`${isActive('/products')} block w-full border-b py-4 px-2 text-xl hover:text-[#ff8906] transition-colors`}
                        >
                            Product
                        </Link>
                    </li>
                </ul>

            </nav>
            <nav className='flex-1 flex flex-col justify-end gap-4 pb-8'>
                {!user && <Link to={'/auth/login'} className='w-full text-center text-xl border rounded-lg p-4'>Sign In</Link>}
                {!user && <Link to={'/auth/register'} className='w-full text-center text-xl border border-[#ff8906] rounded-lg p-4 bg-[#ff8906]'>Sign Up</Link>}
                {user && <Link to={'/profile'} className='w-full text-center text-white text-xl border border-[#ff8906] rounded-lg p-4 bg-[#ff8906]'>Profile</Link>}
                {user && <Link to={'/auth/register'} className='w-full text-center text-white text-xl border border-red-500 rounded-lg p-4 bg-red-500'>Log Out</Link>}
            </nav>
        </div>
    )
}

export default Sidebar