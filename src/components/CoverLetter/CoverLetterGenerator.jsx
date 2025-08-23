import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';
import CopyButton from '../CopyButton/CopyButton';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import AiAnalyzingModal from '../LoadingModal/AiAnalyzingModal';

import { FaLock, FaArrowLeft, FaTimes } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { RiAiGenerate2 } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import Tooltip from "@mui/material/Tooltip";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // pdf, docx

export default function CoverLetterGenerator() {
    const [step, setStep] = useState(1);
    const [resumeFile, setResumeFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedAiModel, setSelectedAiModel] = useState('gpt-5-nano');
    const [jobDescription, setJobDescription] = useState("");
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [errorFileMsg, setErrorFileMsg] = useState('');
    const [errorGeneratedLetter, setErrorGeneratedLetter] = useState('');
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [downloadCoverLetter, setDownloadCoverLetter] = useState(null);

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setErrorFileMsg("Invalid file format. Please provide docx or pdf file.");
            return;
        }

        // Validate size
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setErrorFileMsg(`The file is larger than ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setErrorFileMsg(""); // clear error if valid
        setResumeFile(file);
        setStep(2);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleResumeUpload({ target: { files: e.dataTransfer.files } });
        }
    };
    
    const handleGenerate = async () => {
        // Validation for resume and job desc both are required
        if (!resumeFile || !jobDescription) {
            return
        }

        setShowLoadingModal(true);

        try {
            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('ai_model', selectedAiModel);
            formData.append('job_description', jobDescription);

            // Get CSRF token from backend
            const csrfResponse = await axios.get(`${API_BASE_URL}csrf/`, {
                withCredentials: true,
            });
            const csrfToken = csrfResponse.data.csrfToken;

            // Generate
            const response = await axios.post(
                `${API_BASE_URL}cover-letter-generator/`,
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            // Move to step 3 on success and display the AI feedback(cover letter)
            if (response.status === 200) {
                setGeneratedLetter(response.data.ai_feedback);
                setDownloadCoverLetter(response.data.analysis_report);
                console.log(response.data.analysis_report);
                setStep(3);
            }
        } catch (error) {
            console.error(error);
            setErrorGeneratedLetter(error.response?.data?.error || "Something went wrong...");
        } finally {
            setShowLoadingModal(false);
        }
    };
    
    const handleReset = () => {
        setResumeFile(null);
        setJobDescription("");
        setSelectedAiModel();
        setGeneratedLetter("");
        setStep(1);
    };
    
    return (
        <div className='bg-slate-100 dark:bg-slate-900'>
            <Helmet>
                <title>Free AI Cover Letter Generator | AIRA</title>
            </Helmet>
            <Navbar />
            <h1 className='text-center pt-40 text-purple-500 font-semibold uppercase'>
                Generate as many cover letters as you need
            </h1>
            <div className="flex items-center justify-center pt-10 pb-40 px-2">
                <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-6 bg-gradient-to-r from-violet-950 to-violet-900">
                    {/* Step Indicators */}
                    <div className="flex justify-center items-center mb-6">
                    {[1, 2, 3].map((s, idx, arr) => (
                        <div key={s} className="flex items-center">
                            {/* Step circle */}
                            <div
                                className={`w-8 h-8 flex items-center justify-center font-semibold rounded-full border-2 transition-colors
                                ${step >= s
                                    ? "bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white border-transparent"
                                    : "bg-gray-500 text-white border-gray-300"}
                                `}
                            >
                                {step > s ? (
                                    <TiTick className='w-5 h-5' />
                                ) : s}
                            </div>

                            {/* Line (not after last step) */}
                            {idx < arr.length -1 && (
                                <div
                                    className={`w-12 h-1 mx-2 rounded ${
                                        step > s ? "bg-gradient-to-r from-[#8741eb] to-[#5b4be7]" : "bg-gray-300"
                                    }`}
                                ></div>
                            )}
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
                            <div
                                className={`border-2 border-dashed hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out ${
                                    dragActive ? "border-blue-500 bg-purple-600 bg-opacity-30" : "border-gray-300"
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.docx"
                                    className="hidden"
                                    id="resume-upload"
                                    onChange={handleResumeUpload}
                                />
                                <label htmlFor="resume-upload" className="block cursor-pointer">
                                    <TbCloudUpload className="mx-auto my-6 text-purple-500 w-8 h-8" />
                                    <p className="text-sm text-gray-400 mt-5 mb-1">
                                        <span className="font-semibold">Click to select</span> or drag and drop your resume here.
                                    </p>
                                    <p className="text-xs text-gray-400 mb-6">
                                        PDF & DOCX only. (MAX. 5MB file size)
                                    </p>
                                    {errorFileMsg && (
                                        <div className="mt-4 text-sm text-red-400">
                                            <strong>{errorFileMsg}</strong>
                                        </div>
                                    )}
                                </label>
                            </div>
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
                                the role and responsibilities you're applying for.
                            </p>
                            {/* Select AI Model */}
                            <div className="mb-6 w-full flex flex-col sm:flex-row sm:items-center gap-3">
                                <label
                                    htmlFor="ai-model"
                                    className="text-white font-medium whitespace-nowrap"
                                >
                                    AI Model:
                                </label>
                                <select
                                    id="ai-model"
                                    name="ai_model"
                                    className="w-full sm:flex-1 rounded-lg border border-gray-300 dark:border-gray-600
                                            bg-slate-200 dark:bg-slate-800
                                            text-gray-700 dark:text-gray-200
                                            text-sm p-3 focus:outline-none 
                                            focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                                    value={selectedAiModel}
                                    onChange={(e) => setSelectedAiModel(e.target.value)}
                                >
                                    <option value="gpt-4.1-nano">
                                        🚀 GPT-4.1 nano (Quick Analysis)
                                    </option>
                                    <option value="gpt-5-nano" selected>
                                        ✨ GPT-5 nano (Recommended - Latest & Smart)
                                    </option>
                                    <option value="gpt-4o-mini">
                                        🤖 GPT-4o mini (Smartest & Creativity)
                                    </option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="jobDescription"
                                    className="block text-sm font-semibold text-white mb-2"
                                >
                                    Job Description:
                                </label>
                                <textarea
                                    id="jobDescription"
                                    name="job_description"
                                    className="w-full border border-gray-300 dark:border-gray-600 
                                                bg-slate-200 dark:bg-slate-800 rounded-lg p-3 
                                                text-gray-800 dark:text-gray-200 
                                                focus:ring-2 focus:ring-violet-500 outline-none
                                                transition-all duration-200"
                                    rows={10}
                                    placeholder="Paste your job description here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                            {/* File info + actions */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                {resumeFile && (
                                    <div className="flex items-center gap-2 text-white px-3 py-1 min-w-0 sm:max-w-xs md:max-w-sm lg:max-w-md">
                                        <IoDocumentTextOutline className="w-5 h-5 flex-shrink-0" />

                                        {/* Ellipsis + Tooltip (MUI) */}
                                        <Tooltip title={resumeFile.name} arrow placement="bottom">
                                            <span className="truncate block max-w-full cursor-default">
                                                {resumeFile.name}
                                            </span>
                                        </Tooltip>

                                        <button onClick={handleReset}>
                                            <Tooltip title="delete" placement="bottom-end">
                                                <FaTimes className="text-red-500" />
                                            </Tooltip>
                                        </button>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex gap-2 ml-auto sm:ml-0">
                                    <button
                                    onClick={handleReset}
                                    className="flex items-center gap-1 btn-outline"
                                    >
                                    <FaArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button
                                    onClick={handleGenerate}
                                    disabled={!jobDescription || showLoadingModal}
                                    className="flex items-center gap-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    <RiAiGenerate2 className="w-6 h-6" />
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
                                {errorGeneratedLetter ? (
                                    <p className="text-red-400 text-sm whitespace-pre-wrap">
                                        {errorGeneratedLetter}
                                    </p>
                                ) : (
                                    <>
                                        <div className='flex justify-between items-center mb-4'>
                                           <h2 className='font-semibold text-lg text-black dark:text-white'>
                                                [Example of Cover Letter]
                                            </h2>
                                            <CopyButton textToCopy={generatedLetter} />
                                        </div>
                                        <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                                            {generatedLetter}
                                        </pre>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-1 btn-outline"
                                >
                                    <FaArrowLeft /> Back
                                </button>
                                {downloadCoverLetter ? (
                                    <a
                                        href={`${API_BASE_URL}download-analysis-report/${downloadCoverLetter}/`}
                                        className="flex items-center gap-2 btn-primary"
                                        download
                                    >
                                        <LuDownload className='w-5 h-5' />
                                        Download
                                    </a>
                                ) : (
                                    <button 
                                        className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled
                                    >
                                        <LuDownload className='w-5 h-5' />
                                        Download Not Available
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* Loading analyze */}
                <AiAnalyzingModal isOpen={showLoadingModal} />
            </div>
            <Footer />
        </div>
    )
}
