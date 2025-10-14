import React from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Facebook, Google, Logo } from '../../svg/svg'
import { Eye, KeyRound, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router'

function Login() {
    return (
        <AuthLayout img={'/login.jpg'}>
            <div className='h-full flex flex-col justify-center gap-8'>
                <Logo w={150} h={50} color={'#8E6447'} />
                <form action="" className='space-y-4'>
                    <h1 className='text-3xl text-[#8E6447] font-semibold'>Login</h1>
                    <p className='text-gray-500'>Fill out the form correctly</p>
                    <label htmlFor="" className='text-xl'>Email</label>
                    <div className='relative w-full mt-3 flex items-center'>
                        <input
                            type="text"
                            placeholder='Enter Your Email'
                            className='w-full absolute p-3 rounded-lg pl-14 outline outline-gray-300 text-lg'
                        />
                        <Mail className='m-4 text-gray-500' />
                    </div>
                    <label htmlFor="" className='text-xl'>Password</label>
                    <div className='relative w-full mt-3 flex items-center justify-between'>
                        <input
                            type="text"
                            placeholder='Enter Your Password'
                            className='w-full absolute p-3 rounded-lg pl-14 outline outline-gray-300 text-lg'
                        />
                        <KeyRound className='m-4 text-gray-500' />
                        <div>
                            <Eye className='m-4 stroke-1' />
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <Link to={'/auth/forgot-password'} className='text-[#ff8906] '>Lupa Password?</Link>
                    </div>
                    <button className='p-4 bg-[#ff8906] w-full rounded-lg text-lg'>Login</button>
                </form>
                <p className='text-center text-gray-500'>No Have an Account?
                    <Link to={'/auth/register'} className='text-[#ff8906]'> Register</Link>
                </p>
                <div className='relative py-4 text-center'>
                    <div className='absolute inset-0 flex justify-center'>
                        <div className='w-fit text-gray-500 text-2xl px-18 text-center bg-white'>or</div>
                    </div>
                    <hr className='border-gray-300' />
                </div>
                <div className='flex gap-8 w-full'>
                    <Link
                        className='flex flex-1 rounded-lg border border-gray-100 shadow-md gap-3 justify-center p-4'>
                        <Facebook />
                        Facebook
                    </Link>
                    <Link
                        className='flex flex-1 rounded-lg border border-gray-100 shadow-md gap-3 justify-center p-4'>
                        <Google />
                        Google
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login