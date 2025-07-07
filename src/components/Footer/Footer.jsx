import React from 'react'
import { FaLocationArrow, FaMobileAlt, FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'
import aira from '../../assets/aira.png';

export default function Footer() {
  return (
    <>
        <div className="rounded-t-3xl bg-gradient-to-r from-violet-950 to-violet-900">
            <section className="mx-auto max-w-[1200px] text-white">
                <div className=" grid py-5 md:grid-cols-3">
                    <div className=" px-4 py-8 ">
                        <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-3xl">
                            <a href="/#home" className="">
                                <img src={aira} alt="aira" className='h-14 w-auto' />
                            </a>
                        </h1>
                        <p className="">
                            A FYP project about resume analyzer powered by AI and built with React, Tailwind CSS, and Django (REST API).
                        </p>
                        <br />
                        <div className="flex items-center gap-3">
                            <FaLocationArrow />
                            <p>Johor Bahru, Malaysia</p>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <FaMobileAlt />
                            <p>+60 123456789</p>
                        </div>
                    </div>
                    {/* Social Handle */}
                    <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10 ">
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                                    Important Links
                                </h1>
                                <ul className={`flex flex-col gap-3`}>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Home
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        About
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Resume Analyzer
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        FAQs
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                                    Links
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Resume Writing Guides
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Resume Examples
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Resume Templates
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Cover Letter Writing Guides
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Cover Letter Example
                                    </li>
                                    <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                                        Cover Letter Templates
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                                    Social Links
                                </h1>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <a href="#" className="duration-200 hover:scale-105">
                                            <FaInstagram className="text-3xl" />
                                        </a>
                                        <a href="#" className="duration-200 hover:scale-105">
                                            <FaFacebook className="text-3xl" />
                                        </a>
                                        <a href="#" className="duration-200 hover:scale-105">
                                            <FaLinkedin className="text-3xl" />
                                        </a>
                                        <a href="https://github.com/KawaiiMoe3/aira.git" target='_blank' className="duration-200 hover:scale-105">
                                            <FaGithub className="text-3xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-t-2 border-gray-300/50 py-6 text-center">
                        © 2025. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}
