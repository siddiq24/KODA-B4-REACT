import React from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Facebook, Google, Logo } from '../../svg/svg'
import { Eye, KeyRound, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router'

function ForgotPassword() {
    return (
        <AuthLayout img={'/forgot-password.jpg'} className={'object-cover object-right'}>
            <div className='h-full flex flex-col justify-center gap-8'>
                <Logo w={150} h={50} color={'#8E6447'} />
                <form action="" className='space-y-4'>
                    <h1 className='text-3xl text-[#8E6447] font-semibold'>Fill out the form correctly</h1>
                    <p className='text-gray-500'>We will send new password to your email</p>
                    <label htmlFor="" className='text-xl'>Email</label>
                    <div className='relative w-full mt-3 flex items-center'>
                        <input
                            type="text"
                            placeholder='Enter Your Email'
                            className='w-full absolute p-3 rounded-lg pl-14 outline outline-gray-300 text-lg'
                        />
                        <Mail className='m-4 text-gray-500' />
                    </div>
                    <button className='p-4 bg-[#ff8906] w-full rounded-lg text-lg'>Submit</button>
                </form>
            </div>
        </AuthLayout>
    )
}

export default ForgotPassword