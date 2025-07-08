import React from 'react'
import CountUp from 'react-countup';

export default function OverviewConter() {
  return (
    <section className='container h-12 md:h-32 p-3'>
        <div className='rounded-md grid grid-cols-3 divide-x divide-slate-700 mx-auto mx-auto w-full md:max-w-[800px] shadow-lg bg-white -translate-y-10 md:-translate-y-16 p-2 my-4 md:p-8 dark:bg-gray-800 dark:text-white/70'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl'>
                    <CountUp end={200} suffix="+" duration={2.75} />
                </h1>
                <h1 className='sm:text-md text-xs md:text-lg'>
                    Users
                </h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl'>
                    <CountUp end={15000} suffix="+" duration={2.75} />
                </h1>
                <h1 className='sm:text-md text-xs md:text-lg'>
                    Total Scans
                </h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl'>
                    <CountUp end={2380} suffix="+" duration={2.75} />
                </h1>
                <h1 className='sm:text-md text-xs md:text-lg'>
                    Suggestions Given
                </h1>
            </div>
        </div>
    </section>
  )
}
