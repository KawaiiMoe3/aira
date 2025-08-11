import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import CopyButton from '../CopyButton/CopyButton';
import { useAuth } from '../../contexts/AuthContext';
import { useReactToPrint } from 'react-to-print';

import { GrOptimize } from "react-icons/gr";
import { IoInformationCircle } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";

export default function Feedback() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}feedback/${id}`, {
                    withCredentials: true,
                });
                setData(res.data);
            } catch (err) {
                setError("Failed to fetch feedback.");
                console.error("Failed to fetch feedback: ", err)
                navigate("/404", {replace: true});
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [id]);

    // Print only specific area (Profile)
    const printRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `${user?.username || 'User'}'s Analysis Report`,
        onAfterPrint: () => console.log('Analysis report downloaded.'),
    });

    if (loading) return <div className="text-center text-white mt-10">Loading feedback...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div>
            {/* Floating Download Button */}
            <div className="fixed bottom-20 right-6 z-50 group">
                <button
                    onClick={handlePrint}
                    className="flex items-center bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 overflow-hidden group-hover:w-32 pl-3"
                >
                    {/* Icon */}
                    <LuDownload className="w-5 h-5 flex-shrink-0" />

                    {/* Text appears on hover */}
                    <span className="ml-2 max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300">
                        Download
                    </span>
                </button>
            </div>

            {/* Title of page */}
            <div ref={printRef}>
                <h1 className="mt-6 text-3xl font-extrabold text-center text-indigo-800 dark:text-indigo-400">
                    Resume Analysis & AI Suggestions
                </h1>
                <div className="p-6 max-w-5xl mx-auto space-y-8">
                    {/* AI Feedback */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-lg rounded-2xl p-6 relative">
                        <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                            💡 AI Feedback & Suggestion
                        </h1>
                        <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {data.ai_feedback}
                        </p>
                        <div className="absolute top-6 right-4 flex gap-3">
                            <CopyButton textToCopy={data.ai_feedback} />
                        </div>
                    </div>

                    {/* Enhanced Resume */}
                    <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 shadow-lg rounded-2xl p-6 relative">
                        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                            📝
                            Enhanced Resume
                        </h2>
                        <pre className="mt-4 bg-gray-50 dark:bg-slate-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-100 overflow-x-auto whitespace-pre-wrap">
                            {data.enhanced_resume}
                        </pre>
                        <div className="absolute top-6 right-4 flex gap-3">
                            <CopyButton textToCopy={data.enhanced_resume} />
                        </div>
                    </div>
                    {/* Disclaimer */}
                    <div className='flex justify-center items-center gap-1'>
                        <IoInformationCircle className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            This AI-generated content can make mistakes. Check important info.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
