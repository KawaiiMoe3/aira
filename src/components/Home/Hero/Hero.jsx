import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import HeroImg from '../../../assets/hero.png';

export default function Hero() {

  // Check user's logged in status
  const { isAuthenticated } = useAuth();

  return (
    <div className='bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950'>
      <section className='container flex h-[750px] flex-col items-center justify-center md:h-[500px]'>
        <div className='grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2'>
          {/* Hero text container */}
          <div
            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left "
          >
            <h1 className=" text-4xl font-bold">
              Empower Your Resume with <span className='text-cyan-300'>AI-Powered Insights</span>
            </h1>
            <p className="text-xl">
              Get personalized, data-driven tips to improve your resume instantly. Use AI to highlight your strengths, fix weaknesses, and land interviews faster.
            </p>
            <div className="space-x-4 mt-4">
              {
                isAuthenticated ? (
                  <Link to="/analyzer/resume-analyzer" className="btn-primary">
                    Analyze Resume
                  </Link>
                ) : (
                  <Link to="/signin" className="btn-primary">
                    Get Started
                  </Link>
                )
              }
            </div>
          </div>
          {/* Hero image container */}
          <div
            className="w-full max-w-[400px] h-auto mx-auto"
          >
            <img src={HeroImg} alt="Not Found" className='' />
          </div>
        </div>
      </section>
    </div>
  )
}
