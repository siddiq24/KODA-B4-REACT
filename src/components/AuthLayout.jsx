import React from 'react'

function AuthLayout({ children, img, className }) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <section className='md:flex-4'>
        <img src={img} alt="" className={`h-full object-cover ${className}`} />
      </section>
      <section className='absolute md:relative inset-10 md:inset-0 bg-white rounded-lg md:flex-6 py-4 px-[5%]'>
        {children}
      </section>
    </div>
  )
}

export default AuthLayout