import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Helmet } from "react-helmet";
import faq1 from "../../assets/Faqs/faq1.png";
import { FaChevronRight } from 'react-icons/fa';
import faqs from "../../data/FaqsData";

export default function Faqs() {
    // Set 0 as default to open the first FAQ
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Helmet>
                <title>FAQs</title>
            </Helmet>
            <Navbar />
            <div className='bg-slate-100 dark:bg-slate-900'>
                <div className='bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950'>
                    <section className='container flex h-[750px] flex-col items-center justify-center md:h-[500px]'>
                        <div className='items-center dark:text-white md:grid-cols-2'>
                            {/* Hero image container */}
                            <div
                                className="w-full max-w-[950px] h-auto mx-auto"
                            >
                                <img src={faq1} alt="Not Found" className='' />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="p-4 my-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Left Column */}
                            <div>
                                <h2 className="text-2xl font-semibold text-black dark:text-white">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-[15px] text-slate-600 mt-4 leading-relaxed dark:text-slate-400">
                                    Find quick answers to common questions about our platform, features, and services. Whether you're just getting started or need help with specific tools, we've got you covered.
                                </p>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6 lg:col-span-2">
                                {faqs.map((faq, index) => {
                                    const isOpen = openIndex === index;

                                    return (
                                        <div key={index} className="pb-4">
                                            <button
                                                onClick={() => toggle(index)}
                                                className="w-full flex justify-between items-center text-left"
                                            >
                                                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                                                    {faq.question}
                                                </h3>
                                                <span
                                                    className={`text-gray-500 ml-4 transition-transform duration-300 ${
                                                    isOpen ? 'rotate-90' : 'rotate-0'
                                                    }`}
                                                >
                                                    <FaChevronRight />
                                                </span>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                    isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <p className="text-[15px] text-slate-600 leading-relaxed dark:text-slate-400">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
