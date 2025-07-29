import React from 'react'
import { Helmet } from "react-helmet";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { LuScanText } from "react-icons/lu";
import { TbCloudUpload } from "react-icons/tb";

export default function UploadResume() {

    const { user } = useAuth();

    return (
        <div>
            <Helmet>
                <title>AIRA | Free Resume Review</title>
            </Helmet>
                <Navbar />
            <div className='bg-slate-100 dark:bg-slate-900 pt-20'>
                <div className="container p-2">
                    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-violet-950 to-violet-900 text-white p-12 my-12 rounded-2xl shadow-xl w-full max-w-4xl mx-auto'>
                        {/* Welcome Message */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
                                Welcome back, <span className='uppercase'>{user?.username}</span>! 👋
                            </h1>
                            <p className="text-lg text-blue-200">Let's optimize your next resume.</p>
                        </div>

                        {/* Drag and Drop zone */}
                        <div className="bg-purple-800 bg-opacity-40 rounded-2xl shadow-xl w-full max-w-xl p-6 text-center">
                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:border-blue-500 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out">
                                    <TbCloudUpload className='text-gray-400 w-8 h-8' />
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p class="mb-2 text-gray-400">
                                            <span class="font-semibold">Click to select</span> or drag and drop your resume here.
                                        </p>
                                        <p class="text-sm text-gray-400">
                                            PDF & DOCX only. (MAX. 5MB file size)
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden" />
                                </label>
                            </div> 
                        </div>

                        {/* Analyze Resume Button */}
                        <button 
                            className="mt-10 btn-primary flex items-center gap-2"
                        >
                            <span className="text-2xl">
                                <LuScanText />
                            </span>
                            Analyze Your Resume
                        </button>

                    </div>
                </div>
                <Footer /> 
            </div>
        </div>
    )
}
