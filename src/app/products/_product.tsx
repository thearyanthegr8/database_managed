import Image from 'next/image'
import React from 'react'

function Product() {
  return (
    <>
    <section className='w-11/12 md:w-4/5 h-screen m-auto flex items-center'>
      <div className='w-full flex-col md:flex-row md:justify-between md:space-x-10 items-center flex'>
        <div className='relative'>
          <div className='w-[40rem] aspect-square relative'>
          <Image src='/image/sample.jpg' alt='soda can' fill objectFit='cover' />
          </div>
          <div className='arrows w-full absolute inset-y-1/2 flex justify-between px-3'>
            <button><i className='fa-solid fa-chevron-left'/></button>
            <button><i className='fa-solid fa-chevron-right'/></button>
          </div>
        </div>
        <div className='space-y-5 p-5'>
          <h4 className='text-xl font-semibold'>Product</h4>
          <h1 className='text-3xl font-bold'>Soda can</h1>
          <h2 className='text-xl font-bold'>$1.5</h2>
          <p className='text-sm'>Description</p>
          <p className='text-sm'>Lorem ipsum.....</p>
          <div className='space-y-5'>
            <input className='w-24 h-8 px-3 border border-gray-600 outline-0' type='number' id='amount' />
            <div className='flex gap-2'>
              <button className='w-8 h-8 bg-red-500 rounded-full shadow-xl'></button>
              <button className='w-8 h-8 bg-blue-500 rounded-full shadow-xl'></button>
              <button className='w-8 h-8 bg-gray-500 rounded-full shadow-xl'></button>
              <button className='w-8 h-8 bg-yellow-500 rounded-full shadow-xl'></button>
            </div>
          </div>
          <div className='space-x-5 flex items-center'>
            <button className='flex items-center space-x-2 border border-rose-400 px-5 py-2 rounded-md hover:bg-rose-400 hover:text-white'>
              <i className='fa-regular fa-heart text-xl'></i>
              <span>Add to cart</span>
            </button>
            <button className='bg-rose-400 px-5 py-2 rounded-md text-white hover:bg-white hover:border hover:border-gray-600 hover:text-black'>
              <i className='fa-solid fa-cart-shopping'></i>
              <span>Favourites</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Product
