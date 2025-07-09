import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";
import aira from "../../assets/aira.png";
import { Helmet } from 'react-helmet';

export default function SignIn() {
    return (
        <>
            <Helmet>
                <title>AIRA - Sign Up</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm md:max-w-md">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
                            <input 
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder='Your Username*' 
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input 
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder='Your Email*' 
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input 
                                type="password" 
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder='Password*' 
                            />
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                                    <input 
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#8741eb] checked:border-slate-800"
                                        id="check-2" 
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                            strokeWidth="currentColor" stroke-width="1">
                                            <path fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="cursor-pointer ml-2 text-slate-500 text-sm" htmlFor="check-2">
                                    I agree to
                                    <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a>
                                    {" "}and
                                    <a href="#" className="text-indigo-600 hover:underline ml-1">Privacy Policy</a>
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                            </div>
                            <button 
                                type="button" 
                                className="mt-4 transition duration-200 bg-gradient-to-r from-[#8741eb] to-[#5b4be7] hover:brightness-110 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Sign Up</span>
                                <FaArrowUp className="w-4 h-4 inline-block" />
                            </button>
                        </div>
                        <h5 className='text-center text-gray-400'>or continue with</h5>
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                <button 
                                    type="button" 
                                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                                >
                                    Google
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="py-5">
                            <div className="grid grid-cols-1 gap-1 items-center px-5">
                                {/* Sign Up */}
                                <div className="text-center whitespace-nowrap">
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{" "}
                                        <Link to="/signin" className="text-indigo-600 hover:underline">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link 
                                    to="/"
                                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-slate-400 hover:bg-gray-200 hover:text-slate-900"
                                >
                                    <FaArrowLeft className="w-4 h-4 inline-block align-text-top" />
                                    <span className="inline-block ml-1">
                                        Back to Home
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

