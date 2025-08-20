import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';
import { FaLock, FaArrowLeft, FaTimes } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { RiAiGenerate2 } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";

export default function CoverLetterGenerator() {
    const [step, setStep] = useState(1);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [generatedLetter, setGeneratedLetter] = useState("");

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          setResumeFile(file);
          setStep(2);
        }
      };
    
      const handleGenerate = () => {
        // Simulate AI response
        setGeneratedLetter(
          `Dear Hiring Manager,\n\nThis is a generated cover letter for your job description:\n"${jobDescription}"\n\nRegards,\nAI Assistant\n hahahahahahahahahhahahahaha\nsdjfhjk\nghjdfhgdhf\nhsdhugs\nsjdhj\njshdu\nshjdu\nhsdiuh`
        );
        setStep(3);
      };
    
      const handleReset = () => {
        setResumeFile(null);
        setJobDescription("");
        setGeneratedLetter("");
        setStep(1);
      };
    
    return (
        <div className='bg-slate-100 dark:bg-slate-900'>
            <Helmet>
                <title>Free AI Cover Letter Generator | AIRA</title>
            </Helmet>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center py-40">
                <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-6 bg-gradient-to-r from-violet-950 to-violet-900">
                    {/* Step Indicators */}
                    <div className="flex justify-center items-center space-x-6 mb-6">
                        {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                            step >= s
                                ? "bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                        >
                            {s}
                        </div>
                        ))}
                    </div>
                    <h2 className="my-4 text-3xl text-center font-bold text-white">Cover Letter Generator</h2>

                    {/* Step 1: Upload Resume */}
                    {step === 1 && (
                        <div className="text-center space-y-4">
                        <p className='text-white'>
                            First, <span className="font-semibold">upload your resume</span> to
                            generate a cover letter for you.
                        </p>
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 block cursor-pointer hover:border-purple-400 transition">
                            <TbCloudUpload className="mx-auto my-6 text-purple-500 w-8 h-8" />
                            <p className="text-sm text-gray-400 mt-5 mb-1">
                                <span className="font-semibold">Click to select</span> or drag and drop your resume here.
                            </p>
                            <p className="text-xs text-gray-400 mb-6">
                                PDF & DOCX only. (MAX. 5MB file size)
                            </p>
                            <input
                            type="file"
                            accept=".pdf,.docx"
                            className="hidden"
                            onChange={handleResumeUpload}
                            />
                        </label>
                        <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                            <span role="img" aria-label="lock">
                            <FaLock />
                            </span>
                            We will ensure your data is secure.
                        </p>
                        </div>
                    )}

                    {/* Step 2: Job Description */}
                    {step === 2 && (
                        <div className="space-y-4">
                        <p className='text-white text-center'>
                            Now, paste the <span className="font-semibold">job description</span> for
                            the role you're applying for.
                        </p>
                        <textarea
                            className="w-full border border-gray-300 dark:border-gray-600 
                                        bg-slate-200 dark:bg-slate-800 rounded-lg p-3 
                                        text-gray-800 dark:text-gray-200 
                                        focus:ring-2 focus:ring-violet-500 outline-none
                                        transition-all duration-200"
                            rows={5}
                            placeholder="Paste job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        {/* File info + actions */}
                        <div className="flex justify-between items-center">
                            {resumeFile && (
                            <div className="flex items-center gap-2 text-white px-3 py-1">
                                <IoDocumentTextOutline className='w-5 h-5' />
                                <span>{resumeFile.name}</span>
                                <button onClick={handleReset}>
                                    <FaTimes className="text-red-500" title='delete' />
                                </button>
                            </div>
                            )}
                            <div className="flex gap-2 ml-auto">
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-1 btn-outline"
                            >
                                <FaArrowLeft className='w-4 h-4' /> Back
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={!jobDescription}
                                className="flex items-center gap-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RiAiGenerate2 className='w-6 h-6' />
                                Generate
                            </button>
                            </div>
                        </div>
                        </div>
                    )}

                    {/* Step 3: Generated Cover Letter */}
                    {step === 3 && (
                        <div className="space-y-4">
                        <div className="border rounded-xl p-4 bg-slate-100 dark:bg-slate-800 relative break-words">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                            {generatedLetter}
                        </pre>
                        </div>
                        <div className="flex justify-between">
                            <button
                            onClick={handleReset}
                            className="flex items-center gap-1 btn-outline-darkmode"
                            >
                            <FaArrowLeft /> Back
                            </button>
                            <button className="flex items-center gap-2 btn-primary">
                            <LuDownload className='w-5 h-5' />
                            Download
                            </button>
                        </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
