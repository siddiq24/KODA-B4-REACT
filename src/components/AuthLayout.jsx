import React from 'react'

function AuthLayout({ children, img }) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <section className='md:flex-4'>
        <img src={img} alt="" className='object-center h-full md:h-fit object-cover' />
      </section>
      <section className='absolute md:relative inset-10 md:inset-0 bg-white rounded-lg md:flex-6 p-8'>
        {children}
      </section>
    </div>
  )
}

export default AuthLayout