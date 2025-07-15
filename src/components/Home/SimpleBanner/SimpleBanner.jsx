import React from 'react'

export default function SimpleBanner() {
  return (
    <div className='bg-gradient-to-r from-violet-950 to-violet-900'>
      <div
        className='container py-8 md:py-12'
      >
        <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
          <div className='px-2'>
            <iframe
              className='aspect-video w-full'
              src="https://www.youtube.com/embed/pjqi_M3SPwY?si=eeAWriBfmYcpe3w3" 
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          <div className='flex flex-col items-center gap-4 text-center text-white dark:text-white md:col-span-2  md:items-start md:text-left'>
            <h1 className='text-3xl font-bold'>
              Boost Your Resume with these Practical Tips!
            </h1>
            <p>
              Learn how to craft a standout resume that captures attention and increases your chances of landing your dream job. These tips are simple, effective, and easy to apply!
            </p>
            <button className='btn-outline'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
