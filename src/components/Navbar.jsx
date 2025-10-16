import React, { useState } from 'react'
import { Logo } from '../svg/svg'
import { Hamburger, HamburgerIcon, Menu, Search, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slice/AuthSlice'

function Navbar({ isOpen, setIsOpen }) {
    const [click, setClick] = useState(false)
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    return (
        <div className='w-full flex p-3 px-5 fixed backdrop-brightness-50 backdrop-blur-md z-3 md:px-[5%] lg:px-[6%] md:py-6'>
            <div className='flex gap-3 md:w-[45%] justify-between items-center md:min-w-88'>
                <div className='h-fit pb-3 w-[30%]'>
                    <Logo color={'#fff'} className={'w-50 h-10 md:w-[150px] md:h-auto'} />
                </div>
                <div className='h-fit border-b border-gray-300 text-center pb-3 hidden md:block w-fit'><Link to="/" className="lg:text-xl hover:text-[#ff8906] text-white transition-colors">Home</Link></div>
                <div className='h-fit border-b border-gray-300 text-center pb-3 hidden md:block w-fit'><Link to="/products" className="lg:text-xl hover:text-[#ff8906] text-white transition-colors">Product</Link></div>

            </div>
            <div className='w-full flex justify-end items-center gap-6 md:pl-10'>
                <div className="group relative hidden md:block">
                    <input
                        id="search-product"
                        type="text"
                        placeholder="Find Product"
                        className="w-0 group-focus-within:w-64 transition-all duration-300 focus:px-3 py-3  text-lg placeholder:text-lg rounded-xl focus:border border-white bg-transparent text-white outline-none focus:w-64"
                    />
                </div>
                <label htmlFor="search-product" className='hidden md:block'>
                    <Search color='#fff' strokeWidth={1} size={30} />
                </label>
                <Link to={'/'} className=''>
                    <ShoppingCart color='#fff' strokeWidth={1} size={30} />
                </Link>
                <div onClick={() => { setIsOpen(!isOpen) }}
                    className='md:hidden'
                >
                    <Menu color='#fff' strokeWidth={1} size={30} />
                </div>

                {
                    user
                        ? <div onClick={() => { setClick(!click) }}
                            className='relative'
                        >
                            <img src={user.image || 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg'} alt=""
                                className='size-20 border border-white/20 rounded-full object-center object-cover'
                            />
                            {click && <Button />}
                        </div>
                        : <div className={`flex gap-4`}>
                            <button onClick={() => { navigate('/auth/login') }} className='hidden md:block w-fit md:max-w-30 md:text-sm lg:text-xl lg:px-6 lg:py-3 md:px-4 md:py-2 text-nowrap border border-white text-white rounded-lg p-4'>Sign In</button>
                            <button onClick={() => { navigate('/auth/register') }} className='hidden md:block w-fit md:max-w-30 md:text-sm lg:text-xl lg:px-6 lg:py-3 md:px-4 md:py-2 text-nowrap border border-[#ff8906] rounded-lg p-4 bg-[#ff8906]'>Sign Up</button>
                        </div>
                }
            </div>

        </div>
    )
}

function Button() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className='w-full h-14 top-[110%] absolute flex justify-center '>
            <div className='bg-white w-fit h-fit p-2 rounded-lg space-y-2'>
                <button
                    onClick={()=>{
                        navigate('/profile')
                    }}
                    className='bg-[#ff8906] w-full text-xl rounded-lg text-nowrap p-2 px-8'
                >Profile</button>
                <button
                    onClick={()=>{
                        dispatch(logout())
                        navigate('/')
                    }}
                    className='bg-red-500 w-full text-xl rounded-lg text-nowrap p-2 px-8 text-white'
                >Log Out</button>
            </div>
        </div>
    )
}
export default Navbar