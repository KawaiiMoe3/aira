import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { useAuth } from '../../contexts/AuthContext'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { formatDate } from '../../utils/dateUtils';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import LiveClock from '../Timer/LiveClock';

import { ImProfile } from "react-icons/im";
import { FaUpload } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { MdOutlineAccessTime, MdOutlineRocketLaunch } from "react-icons/md";
import TableHistory from './TableHistory';

export default function Dashboard() {

    const { user } = useAuth();
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [totalUploadedResume, setTotalUploadedResume] = useState(0);

    // Update Profile Status
    useEffect(() => {
        axios.get(`${API_BASE_URL}profile/status/`, { withCredentials: true })
            .then(res => {
                setStatus(res.data.status);
                setMessage(res.data.message);
            })
            .catch(err => {
                console.error('Failed to fetch profile status:', err);
            });
    }, []);

    // Total uploaded resume
    useEffect(() => {
        axios.get(`${API_BASE_URL}analyzed-history/`, { withCredentials: true })
            .then(res => {
                setTotalUploadedResume(res.data.total_uploaded_resume)
            })
            .catch(err => {
                console.error("Failed to query total uploaded resumes:", err)
            });
    }, []);

    // Dynamic color classes based on profile status
    const statusColor = {
        Excellent: 'text-green-600',
        Good: 'text-blue-500',
        Average: 'text-yellow-500',
        Incomplete: 'text-red-500'
    }[status] || 'text-gray-600';

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Navbar />
            <div className='bg-slate-100 dark:bg-slate-900 pt-20'>
                <div className="container p-2">
                    {/* Title */}
                    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 items-center'>
                        <h1 className='text-4xl font-bold dark:text-white'>Dashboard</h1>
                        <p className='flex items-center md:justify-end justify-start mt-2 md:mt-0 text-blue-gray-700 dark:text-white gap-2 text-xl'>
                            <MdOutlineAccessTime />
                            <LiveClock />
                        </p>
                    </div>
                    {/* Status section */}
                    <div className='mt-12'>
                        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                            {/* Status items */}
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-[#1e1e1e] text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <ImProfile className='w-8 h-8' />
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans dark:text-slate-500 text-sm leading-normal font-normal text-blue-gray-600">
                                        Your Profile Status
                                    </p>
                                    <h4 className={`text-2xl font-semibold ${statusColor}`}>
                                        {status}
                                    </h4>
                                </div>
                                <div className="border-t border-blue-gray-50 dark:border-slate-500 p-4">
                                    <p className={`text-base text-center font-normal leading-relaxed ${statusColor}`}>
                                        {message}
                                    </p>
                                    {(status === 'Average' || status === 'Incomplete') && (
                                    <div className="flex justify-center mt-4 text-center">
                                        <Link to="/profile/edit-profile">
                                            <button className="flex items-center gap-2 btn-outline-darkmode">
                                                <MdOutlineRocketLaunch className='w-5 h-5' />
                                                Boost My Profile
                                            </button>
                                        </Link>
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-[#1e1e1e] text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <FaUpload className='w-8 h-8' />
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans dark:text-slate-500 text-sm leading-normal font-normal text-blue-gray-600">
                                        Uploaded Resumes
                                    </p>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 dark:text-slate-100">{totalUploadedResume || 0}</h4>
                                </div>
                                <div className="border-t border-blue-gray-50 dark:border-slate-500 p-4">
                                    <p className="block antialiased font-sans text-base text-center leading-relaxed font-normal text-yellow-500">
                                        Hints: Multiple resumes help target your dream job better.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-[#1e1e1e] text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <TbActivity className='w-8 h-8' />
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans dark:text-slate-500 text-sm leading-normal font-normal text-blue-gray-600 ">
                                        Last Activities
                                    </p>
                                    <h4 className="block antialiased tracking-normal font-sans text-xl md:text-2xl font-semibold leading-snug text-blue-gray-900 dark:text-slate-100">{formatDate(user?.last_login)}</h4>
                                </div>
                                <div className="border-t border-blue-gray-50 dark:border-slate-500 p-4">
                                    <p className="block antialiased font-sans text-base text-center leading-relaxed font-normal text-green-500">
                                        Welcome back! Stay consistent to stay ahead.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Upload Resume button */}
                    <div className='mt-12 flex justify-center'>
                        <Link to="/analyzer/upload-resume">
                            <button className='btn-primary flex items-center gap-2'>
                                <MdOutlineRocketLaunch className='w-5 h-5' />
                                Boost Your Resume Now!
                            </button>
                        </Link>
                    </div>
                    {/* Table History */}
                    <div className='my-12'>
                        <TableHistory />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
