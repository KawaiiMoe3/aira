import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuLockKeyholeOpen } from "react-icons/lu";
import aira from "../../assets/aira.png";
import { Helmet } from 'react-helmet';

export default function SignIn() {
    return (
        <>
            <Helmet>
                <title>AIRA - Sign In</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm md:max-w-md">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input 
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder='Your Email' 
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input 
                                type="password" 
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder='Password' 
                            />
                            <button 
                                type="button" 
                                className="transition duration-200 bg-gradient-to-r from-[#8741eb] to-[#5b4be7] hover:brightness-110 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Sign In</span>
                                <FaArrowRight className="w-4 h-4 inline-block" />
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
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 items-center px-5">
                                {/* Forgot Password */}
                                <div className="text-center whitespace-nowrap">
                                    <button className="transition duration-200 px-2 py-4 cursor-pointer text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <LuLockKeyholeOpen className="w-4 h-4 inline-block align-text-top" />
                                        <span className="inline-block ml-1">Forgot Password</span>
                                    </button>
                                </div>

                                {/* Sign Up */}
                                <div className="text-center whitespace-nowrap">
                                    <p className="text-sm text-gray-500">
                                        New here?{" "}
                                        <Link to="/signup" className="text-indigo-600 hover:underline">
                                            Sign Up
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

