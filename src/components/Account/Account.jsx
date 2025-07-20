import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import { FiSettings } from 'react-icons/fi';
import { RiLockPasswordLine } from "react-icons/ri";
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function Account() {

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Collapse menu after link click if mobile
    const handleLinkClick = () => {
        if (isMobile) setIsOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>Manage your account</title>
            </Helmet>
            <Navbar />
            <div className="bg-slate-100 dark:bg-slate-900">
                <div className="container pt-20">
                    <div className="flex flex-col md:flex-row w-full min-h-screen p-4 gap-4">
                        {/* Sidebar Tabs */}
                        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:text-white">
                            {/* Toggle Button for Mobile */}
                            <div className="md:hidden mb-4">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full btn-outline-darkmode flex justify-between items-center"
                                >
                                    Settings
                                    {isOpen ? <IoChevronUp className="w-5 h-5" /> : <IoChevronDown className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Desktop-only Title */}
                            <h2 className="hidden md:block text-lg font-semibold mb-4">Settings</h2>

                            <ul 
                                className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden 
                                    ${isOpen ? 'max-h-screen' : 'max-h-0'} 
                                    md:max-h-full md:block`}
                            >
                                <li>
                                    <NavLink
                                    to="general"
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                                        isActive
                                            ? 'bg-gray-200 font-medium dark:bg-gray-600'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-500'
                                        }`
                                    }
                                    >
                                    <FiSettings className="w-5 h-5" />
                                    <span>General</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                    to="password"
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                                        isActive
                                            ? 'bg-gray-200 font-medium dark:bg-gray-600'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-500'
                                        }`
                                    }
                                    >
                                    <RiLockPasswordLine className="w-5 h-5" />
                                    <span>Password</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Tab Content */}
                        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
