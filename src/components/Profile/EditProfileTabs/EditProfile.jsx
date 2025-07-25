import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import { Helmet } from 'react-helmet'

import { IoChevronDown, IoChevronUp, IoLanguage, IoImageOutline } from "react-icons/io5";
import { TbFileDescription, TbSchool, TbCertificate } from "react-icons/tb";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LuInfo } from "react-icons/lu";

export default function EditProfile() {

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect if screen is mobile
    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Collapse menu after link click (mobile only)
    const handleNavClick = () => {
        if (isMobile) setIsOpen(false);
    };

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md transition ${
          isActive
            ? 'bg-gray-200 font-medium dark:bg-gray-600'
            : 'hover:bg-gray-100 dark:hover:bg-gray-500'
        }`;

    return (
        <>
            <Helmet>
                <title>Edit your profile</title>
            </Helmet>
            <Navbar />
            <div className="bg-slate-100 dark:bg-slate-900">
                <div className="container pt-20">
                    <div className="flex flex-col md:flex-row w-full min-h-screen p-4 gap-4">
                        {/* Sidebar Tabs */}
                        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:text-white">
                            {/* Mobile Toggle Button */}
                            <div className="md:hidden mb-4">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full btn-outline-darkmode flex justify-between items-center"
                                >
                                    Profile Sections
                                    {isOpen ? <IoChevronUp className="w-5 h-5" /> : <IoChevronDown className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Title visible only on desktop */}
                            <h2 className="hidden md:block text-lg font-semibold mb-2">Profile Sections</h2>
                            <ul 
                                className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden 
                                    ${isOpen ? 'max-h-screen' : 'max-h-0'} 
                                    md:max-h-full md:block`}
                            >
                                <li>
                                    <NavLink
                                        to="profile-info"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <LuInfo className='w-5 h-5' />
                                        <span>Info</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="profile-image"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <IoImageOutline className='w-5 h-5' />
                                        <span>Profile Image</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="summary"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <TbFileDescription className='w-5 h-5' />
                                        <span>Summary</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="languages"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <IoLanguage className='w-5 h-5' />
                                        <span>Languages</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="skills"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <HiOutlineLightningBolt className='w-5 h-5' />
                                        <span>Skills</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="education"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <TbSchool className='w-5 h-5' />
                                        <span>Education</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="professional"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <MdOutlineWorkOutline className='w-5 h-5' />
                                        <span>Professional</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="projects"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <AiOutlineFundProjectionScreen className='w-5 h-5' />
                                        <span>Projects</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="certifications"
                                        className={navItemClass} onClick={handleNavClick}
                                    >
                                        <TbCertificate className='w-5 h-5' />
                                        <span>Certifications</span>
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
