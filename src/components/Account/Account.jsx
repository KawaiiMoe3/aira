import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import { FiSettings } from 'react-icons/fi';
import { RiLockPasswordLine } from "react-icons/ri";

export default function Account() {
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
                            <h2 className="text-lg font-semibold mb-4">Settings</h2>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                    to="general"
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
