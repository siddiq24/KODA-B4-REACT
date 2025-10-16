import React, { useState } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Facebook, Google, Logo } from '../../svg/svg'
import { Eye, EyeClosed, KeyRound, Mail, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { validateEmail, validatePassword } from '../../utils/validateInput'
import { useDispatch } from 'react-redux'
import { login, register } from '../../redux/slice/AuthSlice'

function Register() {
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
        conf_password: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [passA, setPassA] = useState(false)
    const [passB, setPassB] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!validateEmail(form.email)) return
        if (!validatePassword(form.password)) return

        if (!form.full_name || !form.email || !form.password || !form.conf_password) {
            return toast('Please fill in all fields', { type: 'error', theme: 'dark' })
        }

        if (form.password !== form.conf_password) {
            return toast('Passwords do not match', { type: 'error', theme: 'dark' })
        }

        try {
            const user = (await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${form.email}`)).data

            if (user.length > 0) {
                if (user[0].password == form.password) {
                    toast('Login Successfull', { type: 'success', theme: 'dark' })
                    navigate('/products', { replace: true })
                    dispatch(login(user))
                    return
                }
                navigate('/auth/login', { replace: true })
                return
            }


            form && dispatch(register(form))
            toast('Registration successful!', { type: 'success', theme: 'dark' })
            navigate('/auth/login')
        } catch (error) {
            console.error(error)
            toast('Registration failed. Please try again.', { type: 'error', theme: 'dark' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout img={'/register.jpg'}>
            <div className="h-full flex flex-col justify-center gap-8">
                <Logo w={150} h={50} color={'#8E6447'} />
                <form className="space-y-4">
                    <h1 className="text-3xl text-[#8E6447] font-semibold">Register</h1>
                    <p className="text-gray-500">Fill out the form correctly</p>

                    <label className="text-xl">Full Name</label>
                    <div className="relative flex items-center">
                        <UserRound className="absolute left-4 text-gray-500" />
                        <input
                            onChange={handleChange}
                            name="full_name"
                            type="text"
                            placeholder="Enter Your Full Name"
                            className="w-full p-3 pl-14 rounded-lg outline outline-gray-300 text-lg"
                        />
                    </div>

                    <label className="text-xl">Email</label>
                    <div className="relative flex items-center">
                        <Mail className="absolute left-4 text-gray-500" />
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-3 pl-14 rounded-lg outline outline-gray-300 text-lg"
                        />
                    </div>

                    <label className="text-xl">Password</label>
                    <div className="relative flex items-center">
                        <KeyRound className="absolute left-4 text-gray-500" />
                        <input
                            onChange={handleChange}
                            name="password"
                            type={passA ? 'text' : 'password'}
                            placeholder="Enter Your Password"
                            autoComplete="off"
                            className="w-full p-3 pl-14 rounded-lg outline outline-gray-300 text-lg"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setPassA(!passA)
                            }}
                            className='absolute right-4'
                        >
                            {passA
                                ? <Eye className=" text-gray-500" />
                                : <EyeClosed className="text-gray-500" />
                            }
                        </button>
                    </div>

                    <label className="text-xl">Confirm Password</label>
                    <div className="relative flex items-center">
                        <KeyRound className="absolute left-4 text-gray-500" />
                        <input
                            onChange={handleChange}
                            name="conf_password"
                            type={passA ? 'text' : 'password'}
                            placeholder="Enter Your Password Again"
                            autoComplete="off"
                            className="w-full p-3 pl-14 rounded-lg outline outline-gray-300 text-lg"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setPassB(!passB)
                            }}
                            className='absolute right-4'
                        >
                            {passB
                                ? <Eye className=" text-gray-500" />
                                : <EyeClosed className="text-gray-500" />
                            }
                        </button>
                    </div>

                    <button
                        onClick={handleClick}
                        type="submit"
                        disabled={loading}
                        className="p-4 bg-[#ff8906] relative w-full rounded-lg text-lg text-white hover:bg-[#e67c04] transition"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-gray-500">
                    Have an account?
                    <Link to="/auth/login" className="text-[#ff8906]"> Login</Link>
                </p>

                <div className="relative py-4 text-center">
                    <div className="absolute inset-0 flex justify-center">
                        <div className="w-fit text-gray-500 text-2xl px-4 bg-white">or</div>
                    </div>
                    <hr className="border-gray-300" />
                </div>

                <div className="flex gap-8 w-full">
                    <Link className="flex flex-1 items-center justify-center gap-3 border border-gray-100 shadow-md p-4 rounded-lg">
                        <Facebook />
                        Facebook
                    </Link>
                    <Link className="flex flex-1 items-center justify-center gap-3 border border-gray-100 shadow-md p-4 rounded-lg">
                        <Google />
                        Google
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Register