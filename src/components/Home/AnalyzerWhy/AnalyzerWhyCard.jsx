import React from 'react'

export default function AnalyzerWhyCard({ title, description, image }) {
  return (
    <div className='mx-2 mb-7 rounded-lg p-4 shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-800 dark:text-white'>
        <div className="overflow-hidden rounded-lg ">
            <img
                src={image}
                alt="No image"
                className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
        </div>
        <div className="space-y-3 py-3">
            <h1 className="text-xl font-bold">
                {title}
            </h1>
            <p className="">
                {description}
            </p>
        </div>
    </div>
  )
}
