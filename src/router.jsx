import React, { useEffect, useState } from 'react'
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
import {
    CupSoda,
    Handbag,
    LayoutDashboard,
    LogOut,
    Users,
    ChevronRight,
    Shield,
    Coffee,
    Settings,
    Bell,
    Clock
} from 'lucide-react'
import ProductList from './pages/admin/ProductList'
import OrderList from './pages/admin/OrderList'
import UserList from './pages/admin/UserList'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import { toast, ToastContainer } from 'react-toastify'
import { FilterContext } from './context/filterContext'
import FilterSidebar from './components/FilterSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/slice/AuthSlice'

function AppRouter() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{
                    zIndex: 9999
                }}
            />
            <ScrollRestoration />
            <Routes>
                <Route path='/auth' element={<Outlet />}>
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                    <Route path='forgot-password' element={<ForgotPassword />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route path='' element={<LandingPage />} />
                    <Route path='products' element={<ProductsPage />} />
                    <Route path='product/:id/detail' element={<DetailProduct />} />
                    <Route path='/order' element={<TimerToken />}>
                        <Route path='payment' element={<PaymentDetails />} />
                    </Route>
                    <Route path='profile' element={<TimerToken />}>
                        <Route path='' element={<Profile />} />
                        <Route path='order-history' element={<HistoryOrder />} />
                        <Route path='order-detail/:invoice' element={<DetailOrder />} />
                    </Route>
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
    const [filterOpen, setFilterOpen] = useState(false)
    const { expToken, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const now = new Date().getTime()
        if (now > expToken && user != null) {
            toast.warning("Sesi telah berakhir, silakan login kembali")
            dispatch(logout())
        }
    }, [expToken, user, dispatch])

    return (
        <FilterContext.Provider value={{ filterOpen, setFilterOpen }}>
            <div className="relative min-h-screen scroll-smooth bg-gradient-to-br from-gray-50 to-white">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff8906]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"></div>
                </div>

                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <ScrollRestoration />

                {/* Main Content */}
                <main className="relative z-1">
                    <Outlet />
                </main>

                {/* Filter Sidebar Overlay */}
                {filterOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-0 md:items-center">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                            onClick={() => setFilterOpen(false)}
                        />
                        <div
                            className="relative bg-white rounded-3xl shadow-2xl w-[90%] md:w-96 max-h-[80vh] overflow-hidden transform animate-in slide-in-from-bottom-10 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gradient-to-r from-[#ff8906] to-orange-500 p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-bold text-lg">Filter Produk</h3>
                                    <button
                                        onClick={() => setFilterOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 max-h-[calc(80vh-80px)] overflow-y-auto">
                                <FilterSidebar />
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Sidebar Overlay */}
                <div
                    className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen
                            ? 'bg-black/50 backdrop-blur-sm opacity-100 visible'
                            : 'bg-transparent backdrop-blur-0 opacity-0 invisible pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Sidebar isOpen={isOpen} set={setIsOpen} />
                    </div>
                </div>
            </div>
        </FilterContext.Provider>
    )
}

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { expToken, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const now = new Date().getTime()
        if (now > expToken && user != null) {
            toast.warning("Sesi admin telah berakhir")
            dispatch(logout())
        }
    }, [expToken, user, dispatch])

    const adminNav = [
        {
            Icon: LayoutDashboard,
            title: "Dashboard",
            link: '/admin/dashboard',
            description: "Overview sistem"
        },
        {
            Icon: CupSoda,
            title: "Produk",
            link: '/admin/product',
            description: "Kelola menu produk"
        },
        {
            Icon: Handbag,
            title: "Pesanan",
            link: '/admin/order',
            description: "Kelola pesanan"
        },
        {
            Icon: Users,
            title: "Pengguna",
            link: '/admin/user',
            description: "Data pelanggan"
        },
        {
            Icon: Settings,
            title: "Pengaturan",
            link: '/admin/settings',
            description: "Konfigurasi sistem"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff8906]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
            </div>

            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex pt-20 min-h-screen">
                {/* Desktop Sidebar */}
                <aside className={`
                    fixed md:relative h-screen bg-white/80 backdrop-blur-lg border-r border-gray-200/50 
                    shadow-xl transition-all duration-500 ease-in-out z-30
                    ${isSidebarCollapsed ? 'w-20' : 'w-80'}
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-200/50">
                        <div className={`flex items-center gap-3 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'
                            }`}>
                            {!isSidebarCollapsed && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-2xl flex items-center justify-center">
                                        <Shield size={20} color="white" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-gray-900">Admin Panel</h2>
                                        <p className="text-xs text-gray-500">Coffee Shop Management</p>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#ff8906] hover:bg-gray-100 rounded-lg transition-all duration-300"
                            >
                                <ChevronRight size={16} className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        {adminNav.map((item, index) => {
                            const isActive = location.pathname === item.link
                            const Icon = item.Icon

                            return (
                                <button
                                    key={index}
                                    onClick={() => navigate(item.link)}
                                    className={`
                                        w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white shadow-lg transform scale-105'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                                        }
                                        ${isSidebarCollapsed ? 'justify-center' : ''}
                                    `}
                                >
                                    <div className={`
                                        transition-all duration-300
                                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#ff8906]'}
                                    `}>
                                        <Icon size={20} />
                                    </div>
                                    {!isSidebarCollapsed && (
                                        <div className="flex-1 text-left">
                                            <div className="font-semibold text-sm">{item.title}</div>
                                            <div className={`text-xs transition-all duration-300 ${isActive ? 'text-white/80' : 'text-gray-400'
                                                }`}>
                                                {item.description}
                                            </div>
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="absolute bottom-6 left-4 right-4">
                        <button
                            onClick={() => {
                                dispatch(logout())
                                navigate('/')
                                toast.info("Berhasil logout dari admin")
                            }}
                            className={`
                                w-full flex items-center gap-3 p-3 rounded-2xl text-gray-600 
                                hover:bg-red-50 hover:text-red-600 transition-all duration-300 group
                                ${isSidebarCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                            {!isSidebarCollapsed && (
                                <span className="font-semibold">Keluar</span>
                            )}
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`
                    flex-1 transition-all duration-500 ease-in-out
                    ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}
                    min-h-screen
                `}>
                    <div className="p-6 md:p-8">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Coffee size={16} />
                            <ChevronRight size={16} />
                            <span>Admin</span>
                            <ChevronRight size={16} />
                            <span className="text-[#ff8906] font-semibold">
                                {adminNav.find(item => item.link === location.pathname)?.title || 'Dashboard'}
                            </span>
                        </div>

                        {/* Page Content */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/50 min-h-[calc(100vh-180px)]">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

const TimerToken = () => {
    const { expToken } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const now = new Date().getTime()
        if (now > expToken) {
            toast.error("Sesi telah berakhir, silakan login kembali")
            dispatch(logout())
            navigate("/auth/login")
        }
    }, [expToken, dispatch, navigate])

    return <Outlet />
}

const ScrollRestoration = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [pathname])

    return null
}

export default AppRouter