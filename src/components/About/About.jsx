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
            <div className='bg-slate-100 pt-20 dark:bg-slate-900'>
                <div className="container">
                    {/* Centering wrapper */}
                    <div class="flex justify-center items-center">
                        <div class="max-w-[720px] mx-auto">
                            <div class="relative flex flex-col mt-6 mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                <div class="p-8">
                                    <h5 class="mb-2 text-black dark:text-white text-xl font-semibold">
                                        Smart Resume Optimization
                                    </h5>
                                    <p class="text-slate-600 dark:text-slate-400 leading-normal">
                                        AIRA leverages advanced technology and expert insights to help internship applicants, fresh graduates, and job seekers craft stronger resumes. Our platform provides personalized feedback on resume quality, and alignment with targeted job descriptions—ensuring your application stands out in a competitive job market.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <div class="max-w-[720px] mx-auto">
                            {/* Centering wrapper */}
                            <div class="relative flex flex-col mt-6 mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                <div class="p-8">
                                    <h5 class="mb-2 text-black dark:text-white text-xl font-semibold">
                                        Key Features
                                    </h5>
                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div className='space-y-4'>
                                            <h5 className='my-2 text-black dark:text-white text-xl font-semibold'>
                                                Keyword Analysis
                                            </h5>
                                            <p className='text-slate-600 dark:text-slate-400 leading-normal'>
                                                Identify the most relevant keywords in your resume and compare them with job descriptions to boost your chances of passing Applicant Tracking Systems (ATS).
                                            </p>
                                        </div>
                                        <div className='space-y-4'>
                                            <h5 className='my-2 text-black dark:text-white text-xl font-semibold'>
                                                Expert Feedback
                                            </h5>
                                            <p className='text-slate-600 dark:text-slate-400 leading-normal'>
                                                Receive AI-powered recommendations that mimic real recruiter insights—covering formatting, clarity, and content strength.
                                            </p>
                                        </div>
                                        <div className='space-y-4'>
                                            <h5 className='my-2 text-black dark:text-white text-xl font-semibold'>
                                                Dashboard Activity Tracking
                                            </h5>
                                            <p className='text-slate-600 dark:text-slate-400 leading-normal'>
                                                Stay organized and monitor your progress with an intuitive dashboard. Track submitted resumes, feedback history, and performance improvements over time—all in one place.
                                            </p>
                                        </div>
                                        <div className='space-y-4'>
                                            <h5 className='my-2 text-black dark:text-white text-xl font-semibold'>
                                                Downloadable Feedback Report
                                            </h5>
                                            <p className='text-slate-600 dark:text-slate-400 leading-normal'>
                                                Easily download a comprehensive feedback report to review offline or share with mentors and career advisors. This report includes keyword analysis, formatting suggestions, and expert tips tailored to your resume.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <div class="max-w-[720px] w-full mx-auto">
                            {/* Centering wrapper */}
                            <div class="relative flex flex-col mt-6 mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                <div class="p-8">
                                    <h5 class="mb-2 text-black dark:text-white text-xl font-semibold">
                                        Why Choose AIRA?
                                    </h5>
                                    <ul className='space-y-4 text-slate-600 dark:text-slate-400 leading-normal'>
                                        <li className="flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>AI-Powered Resume Analysis</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>Keyword Matching with Job Descriptions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>Clean, Modern Design Suggestions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>Downloadable Feedback Reports</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>Fast and User-Friendly Experience</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <div class="max-w-[720px] mx-auto">
                            {/* Centering wrapper */}
                            <div class="relative flex flex-col mt-6 mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                <div class="p-8">
                                    <h5 class="mb-2 text-black dark:text-white text-xl font-semibold">
                                        Our Technology
                                    </h5>
                                    <p class="text-slate-600 dark:text-slate-400 leading-normal">
                                        Our resume analyzer is powered by cutting-edge AI and built using React for a seamless user interface, Tailwind CSS for responsive design, and Django REST API for fast, secure, and scalable backend performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 pt-20 dark:bg-slate-900 dark:text-white'>
                <Footer />
            </div>
        </>
    )
}
