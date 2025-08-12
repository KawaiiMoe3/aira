import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import { Helmet } from "react-helmet";
import axios from 'axios';
import AiAnalyzingModal from '../LoadingModal/AiAnalyzingModal';

import { LuScanText } from "react-icons/lu";
import { TbCloudUpload } from "react-icons/tb";
import { IoWarning } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // pdf, docx

export default function UploadResume() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAiModel, setSelectedAiModel] = useState('gpt-5-nano');
    const [previewURL, setPreviewURL] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    const validateFile = (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Invalid file format. Please provide docx or pdf file.';
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `The file is larger than ${MAX_FILE_SIZE_MB}MB.`;
        }
        return '';
    };

    const handleFile = (file) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            setSelectedFile(null);
            setPreviewURL('');
        } else {
            setSelectedFile(file);
            setError('');

            if (file.type === 'application/pdf') {
                const url = URL.createObjectURL(file);
                setPreviewURL(url);
            } else {
                setPreviewURL('');
            }
        }
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
        handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError('Please select a resume to analyze.');
            return;
        }
    
        setLoading(true);
        setShowLoadingModal(true);
        setError('');
        
        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            formData.append('ai_model', selectedAiModel);
            
            /** Demo ai feedback belike:
             * formData.append('ai_feedback', 'Your resume is well-structured, but you could improve your skills section by adding more action-oriented keywords.');
             * formData.append('enhanced_resume', `Name: ${user.username || 'John Doe'}\nSkills: Python, React, Machine Learning\nExperience: 3 Years at ABC Corp`);
             */

            // Get CSRF token from backend
            const csrfResponse = await axios.get(`${API_BASE_URL}csrf/`, {
                withCredentials: true,
            });
            const csrfToken = csrfResponse.data.csrfToken;

            // Submit resume for analyze
            const response = await axios.post(
                `${API_BASE_URL}analyze-resume/`,
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            setShowLoadingModal(false);
            setSelectedFile(null);
            setPreviewURL('');

            if (response.status === 200) {
                const resumeId = response.data.id;
                window.open(`/feedback/${resumeId}`, '_blank');
            } else {
                setError('Failed to analyze resume. please try again.');
            }
        } catch (error) {
            console.error(error);
        
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Server error. Please try again later.');
            }
        
            setShowLoadingModal(false);
        } finally {
            setLoading(false);
        }
    };

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
                        <div className="text-center mb-6">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
                                Welcome back, {user?.username}! 👋
                            </h1>
                            <p className="text-lg text-blue-200">Let's analyze your next resume.</p>
                        </div>

                        {/* Select AI Model */}
                        <div className="mb-6 w-full max-w-xl flex flex-col sm:flex-row sm:items-center gap-3">
                            <label
                                htmlFor="ai-model"
                                className="text-white dark:text-gray-200 font-medium whitespace-nowrap"
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
                                        focus:ring-2 focus:ring-violet-500"
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

                        {/* Drag and Drop zone */}
                        <div className="bg-purple-800 bg-opacity-40 rounded-2xl shadow-xl w-full max-w-xl p-6 text-center">
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex items-center justify-center w-full transition-all duration-300 ease-in-out ${
                                    dragActive ? 'border-blue-500 bg-purple-900 bg-opacity-30' : ''
                                  }`}
                            >
                                <label 
                                    htmlFor="dropzone-file" 
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:border-blue-500 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <TbCloudUpload className='text-gray-400 w-8 h-8' />
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-gray-400">
                                            <span className="font-semibold">Click to select</span> or drag and drop your resume here.
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            PDF & DOCX only. (MAX. 5MB file size)
                                        </p>
                                        {selectedFile && (
                                        <div className="mt-4 text-sm text-green-200">
                                            <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </div>
                                        )}
                                        {error && (
                                        <div className="mt-4 text-sm text-red-400">
                                            <strong>{error}</strong>
                                        </div>
                                        )}
                                    </div>
                                    <input 
                                        id="dropzone-file" 
                                        type="file" 
                                        className="hidden" 
                                        accept=".pdf,.docx"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div> 

                            {/* Preview Section */}
                            {previewURL && (
                                <div className="mt-6">
                                <h3 className="flex justify-center items-center gap-1 text-lg font-semibold text-white mb-2">
                                    <FaFilePdf className='w-5 h-5' />
                                    PDF Preview
                                </h3>
                                <embed
                                    src={previewURL}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                    className="rounded-lg shadow-md border border-gray-300"
                                />
                                </div>
                            )}

                            {/* Fallback for non-PDF */}
                            {selectedFile && !previewURL && !error && (
                                <div className="mt-6 flex justify-center items-center gap-1 text-yellow-300 text-sm">
                                    <IoWarning className='w-5 h-5' />
                                    Preview not supported for DOCX files.
                                </div>
                            )}
                        </div>

                        {/* Analyze Resume Button */}
                        <button 
                            className={`mt-10 btn-primary flex items-center gap-2 ${
                                loading ? 'cursor-not-allowed opacity-70' : ''
                            }`}
                            onClick={handleAnalyze}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                </div>
                            ) : (
                                <>
                                    <span className="text-2xl">
                                        <LuScanText />
                                    </span>
                                    Analyze Your Resume
                                </>
                            )}
                        </button>
                        
                        {/* Loading analyze */}
                        <AiAnalyzingModal isOpen={showLoadingModal} />
                    </div>
                </div>
                <Footer /> 
            </div>
        </div>
    )
}
