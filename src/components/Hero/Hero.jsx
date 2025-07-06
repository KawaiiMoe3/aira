import React from 'react'
import HeroImg from '../../assets/hero.png';

export default function Hero() {
  return (
    <div className='bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950'>
      <section className='container flex h-[650px] flex-col items-center justify-center md:h-[500px]'>
        <div className='grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2'>
          {/* Hero text container */}
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left "
          >
            <h1 className=" text-4xl ">
              Empower Your Resume with AI-Powered Insights
            </h1>
            <p className="">
              Optimize your resume, get ATS-ready, and land your dream job faster.
            </p>
            <div className="space-x-4">
              <button className="btn-primary">
                Get Started
              </button>
              <button className="btn-outline">
                Login
              </button>
            </div>
          </div>
          {/* Hero image container */}
          <div 
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="w-full max-w-[400px] h-auto mx-auto"
          >
            <img src={HeroImg} alt="Not Found" className='' />
          </div>
        </div>
      </section>
    </div>
  )
}
