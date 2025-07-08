import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import a1 from '../../assets/About/a1.png';
import { Helmet } from "react-helmet";

export default function About() {
    return (
        <>
            <Helmet>
                <title>About AIRA</title>
            </Helmet>
            <div className='bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950'>
                <Navbar />
                <section className='container flex h-[750px] flex-col items-center justify-center md:h-[500px]'>
                    <div className='grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2'>
                        {/* Hero image container */}
                        <div 
                            data-aos="fade-left"
                            data-aos-duration="400"
                            data-aos-once="true"
                            className="w-full max-w-[400px] h-auto mx-auto"
                        >
                            <img src={a1} alt="Not Found" className='' />
                        </div>
                        {/* Hero text container */}
                        <div
                            data-aos="fade-right"
                            data-aos-duration="400"
                            data-aos-once="true"
                            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left "
                        >
                            <h1 className=" text-4xl font-bold">
                                About <span className='text-cyan-300'>AIRA</span>
                            </h1>
                            <p className="text-xl">
                                Supporting internship students, fresh grads, and job seekers in building standout resumes through AI-driven insights and personalized guidance.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <div className='bg-slate-100 pt-20 dark:bg-slate-900 dark:text-white'>
                <div className="container">
                    hihi
                </div>
            </div>
            <div className='bg-slate-100 pt-20 dark:bg-slate-900 dark:text-white'>
                <Footer />
            </div>
        </>
    )
}
