import React from 'react'
import AnalyzerWhyCard from './AnalyzerWhyCard'
import { analyzerWhyData } from '../../../data/analyzerWhyData';

export default function AnalyzerWhy() {
  return (
    <div className='dark:bg-gray-900 dark:text-white'>
        <section
            className='container mb-10 py-8'
        >
            <h1 className='mb-8 py-2 pl-2 text-center text-3xl font-bold'>
                Why choose AIRA?
            </h1>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
                {
                    analyzerWhyData.map((item) => (
                        <AnalyzerWhyCard 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                        />
                    ))
                }
            </div>
        </section>
    </div>
  )
}
