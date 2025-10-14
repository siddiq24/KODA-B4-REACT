import React, { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Register from './pages/auth/Register'
import LandingPage from './pages/landing/LandingPage'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProductsPage from './pages/landing/ProductsPage'
import DetailProduct from './pages/landing/DetailProduct'
import HistoryOrder from './pages/order/HistoryOrder'
import PaymentDetails from './pages/order/PaymentDetails'
import DetailOrder from './pages/order/DetailOrder'
import Profile from './pages/profile/Profile'
import Dashboard from './pages/admin/Dashboard'
import { CupSoda, Handbag, LayoutDashboard, LogOut, Users } from 'lucide-react'
import ProductList from './pages/admin/ProductList'
import OrderList from './pages/admin/OrderList'
import UserList from './pages/admin/UserList'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<Outlet />}>
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                    <Route path='forgot-password' element={<ForgotPassword />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route path='' element={<LandingPage />} />
                    <Route path='products' element={<ProductsPage />} />
                    <Route path='detail' element={<DetailProduct />} />
                    <Route path='/order'>
                        <Route path='payment' element={<PaymentDetails />} />
                        <Route path='history' element={<HistoryOrder />} />
                        <Route path='detail' element={<DetailOrder />} />
                    </Route>
                    <Route path='profile' element={<Profile />} />
                    <Route path='/admin' element={<AdminLayout />} >
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='product' element={<ProductList />} />
                        <Route path='order' element={<OrderList />} />
                        <Route path='user' element={<UserList />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <Outlet />
            <div onClick={(e) => {
                setIsOpen(false)
                e.stopPropagation()
            }}
                className={`fixed inset-0 z-10 transition-all duration-300 ${isOpen
                    ? 'bg-black/50 backdrop-blur-sm opacity-100 visible'
                    : 'bg-black/0 backdrop-blur-0 opacity-0 invisible'
                    }`}
            >
                <Sidebar isOpen={isOpen} set={setIsOpen} />
            </div>
        </div>
    )
}

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const nav = [
        {
            Icon: () => { return <LayoutDashboard /> },
            title: "Dashboard",
            link: '/admin/dashboard'
        },
        {
            Icon: () => { return <CupSoda /> },
            title: "Product",
            link: '/admin/product'
        },
        {
            Icon: () => { return <Handbag /> },
            title: "Order",
            link: '/admin/order'
        },
        {
            Icon: () => { return <Users /> },
            title: "User",
            link: '/admin/user'
        },
        {
            Icon: () => { return <LogOut /> },
            title: "Keluar",
            link: '/'
        },
    ]
    return (
        <div className='relative'>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='relative w-full pt-25 h-screen overflow-hidden'>
                <div className='flex h-full relative'>
                    <nav className='w-[20%] border pt-10 border-gray-200 h-full lg:pl-[4%] px-3 space-y-2 hidden md:block'>
                        {nav.map((n, i) => {
                            const isActive = location.pathname === n.link
                            return (
                                <button
                                    key={i}
                                    onClick={() => navigate(n.link)}
                                    className={`${isActive && 'bg-[#ff8906]'}
                            flex gap-4 border-2 border-white lg:text-2xl items-center w-full hover:border-[#ff8906] p-3 px-4 rounded-lg`}>
                                    <n.Icon />
                                    <span>{n.title}</span>
                                </button>
                            )
                        })}
                    </nav>
                    <main className='relative pl-10 pr-[5%] pt-10 w-full h-full'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AppRouter