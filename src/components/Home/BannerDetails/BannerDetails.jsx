import React from 'react'

export default function BannerDetails({ reverse, title, description, points, image }) {
  return (
    <section className='bg-slate-100 dark:bg-slate-900 dark:text-white'>
        <div className='container flex flex-col items-center justify-center px-4 py-10 md:h-[500px]'>
            <div className='grid grid-cols-1 items-center gap-4  md:grid-cols-2'>
                {/* Text container */}
                <div
                    className={`flex flex-col items-start gap-4 text-left md:items-start md:p-8 md:text-left ${
                    reverse ? "md:order-last" : ""
                    } `}
                >
                    <h1 className="text-2xl md:text-4xl ">
                        {title}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                    <div>
                        <ul className='flex list-inside list-disc flex-col gap-2  md:gap-4'>
                            {
                                points?.map((point, index) => (
                                    <li key={index} className='font-medium'>{point}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {/* Img container */}
                <div
                    className={reverse ? "order-1" : ""}
                >
                    <img src={image} alt="banner details img" className='max-auto w-[600px] p-4 hover:drop-shadow-md' />
                </div>
            </div>
        </div>
    </section>
  )
}
