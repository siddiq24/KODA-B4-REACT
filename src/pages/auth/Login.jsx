import React, { useState, useEffect } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Facebook, Google, Logo } from '../../svg/svg'
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../redux/slice/AuthSlice'
import { toast } from 'react-toastify'

function Login() {
    const [form, setForm] = useState({ email: "", password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const { user, isLoading, error, token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])
    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Login failed')
            dispatch(clearError())
        }
    }, [error, dispatch])
    useEffect(() => {
        if (user && token && !isLoading) {
            const role = user.role || 'user'
            const userName = user.fullname

            toast.success(`Welcome back, ${userName}!`)

            if (role === 'admin') {
                navigate('/admin/dashboard', { replace: true })
            } else {
                navigate('/products', { replace: true })
            }
        }
    }, [user, token, isLoading, navigate])

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.email || !form.password) {
            toast.error('Please fill in all fields')
            return
        }

        if (!form.email.includes('@')) {
            toast.error('Please enter a valid email')
            return
        }

        try {
            await dispatch(login(form)).unwrap()
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <AuthLayout img={'/login.jpg'}>
            <div className='h-full flex flex-col justify-center gap-4 md:gap-8'>
                <Logo w={150} h={50} color={'#8E6447'} />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <h1 className='text-2xl md:text-3xl text-[#8E6447] font-semibold'>Login</h1>
                    <p className='text-gray-500'>Fill out the form correctly</p>

                    <div>
                        <label htmlFor="email" className='md:text-xl'>Email</label>
                        <div className='relative w-full mt-3 flex items-center'>
                            <input
                                id='email'
                                name='email'
                                type="email"
                                placeholder='Enter Your Email'
                                value={form.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className='w-full p-3 rounded-lg pl-14 outline outline-gray-300 md:text-lg disabled:opacity-50'
                                required
                            />
                            <Mail className='absolute left-4 text-gray-500' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className='md:text-xl'>Password</label>
                        <div className='relative w-full mt-3 flex items-center'>
                            <input
                                id='password'
                                name='password'
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Your Password'
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                className='w-full p-3 rounded-lg pl-14 pr-14 outline outline-gray-300 md:text-lg disabled:opacity-50'
                                required
                                minLength={6}
                            />
                            <KeyRound className='absolute left-4 text-gray-500' />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='absolute right-4 text-gray-500 hover:text-gray-700'
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className='stroke-1' /> : <Eye className='stroke-1' />}
                            </button>
                        </div>
                    </div>

                    <div className='w-full flex justify-end'>
                        <Link to={'/auth/forgot-password'} className='text-[#ff8906] hover:underline'>
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className='p-4 bg-[#ff8906] w-full rounded-lg text-lg text-white hover:bg-[#e67a00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className='text-center text-gray-500'>
                    Don't have an account?
                    <Link to={'/auth/register'} className='text-[#ff8906] hover:underline ml-1'>
                        Register
                    </Link>
                </p>

                <div className='relative py-4'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>or</span>
                    </div>
                </div>

                <div className='flex gap-4 w-full'>
                    <button
                        type="button"
                        disabled={isLoading}
                        className='flex flex-1 rounded-lg border border-gray-200 shadow-sm gap-3 justify-center p-4 hover:bg-gray-50 disabled:opacity-50'
                    >
                        <Facebook />
                        Facebook
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        className='flex flex-1 rounded-lg border border-gray-200 shadow-sm gap-3 justify-center p-4 hover:bg-gray-50 disabled:opacity-50'
                    >
                        <Google />
                        Google
                    </button>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login