import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChevronDown, FaGithub } from "react-icons/fa";

export default function ResponsiveMenu({ showMenu }) {
    // console.log("showMenu", showMenu);

    // Dropdown menu for 'about', 'resources'
    const [activeDropdown, setActiveDropdown] = useState(null);
    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };
    
    return (
        <div 
            className={`${
                showMenu ? "left-0" : "-left-[100%]"
            } h-screen w-[75%] fixed top-0 z-50 transition-all duration-500 pt-24 pb-6 px-8 flex flex-col justify-between 
            bg-white/30 dark:bg-slate-900/30 
            backdrop-blur-md 
            border-r border-white/20 dark:border-slate-700/30 
            shadow-lg
            rounded-tr-[12px] rounded-br-[12px]
            text-black dark:text-white`}
        >
            <div className="card">
                <div className="flex items-center justify-start gap-3">
                    <FaUserCircle size={50} />
                    <div>
                        <h1>KawaiiMoe</h1>
                        <h1 className="text-sm text-slate-500 dark:text-slate-400">Premium user</h1>
                    </div>
                </div>
                <nav className="mt-12">
                    <ul className="space-y-4 text-xl">
                        <li>
                            <Link
                                to="/"
                                className='mb-2 inline-block'
                            >
                                Home
                            </Link>
                        </li>
                        {/* About Dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("about")}
                                className="inline-flex items-center gap-2 mb-2"
                            >
                                About
                                <FaChevronDown
                                    className={`transform transition-transform duration-300 ${
                                        activeDropdown === "about" ? "rotate-180" : ""
                                    }`}
                                    size={12}
                                />
                            </button>
                            {activeDropdown === "about" && (
                                <ul className="ml-4 mt-2 space-y-2 text-base text-slate-700 dark:text-slate-300">
                                    <li>
                                        <Link
                                            to="/about"
                                            className='mb-2 inline-block'
                                        >
                                            About AIRA
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faqs" className="block hover:text-primary">
                                            FAQs
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        {/* Resources Dropdown */}
                        <li>
                            <button
                                onClick={() => toggleDropdown("resources")}
                                className="inline-flex items-center gap-2 mb-2"
                            >
                                Resources
                                <FaChevronDown
                                    className={`transform transition-transform duration-300 ${
                                        activeDropdown === "resources" ? "rotate-180" : ""
                                    }`}
                                    size={12}
                                />
                            </button>
                            {activeDropdown === "resources" && (
                                <ul className="ml-4 mt-2 space-y-2 text-base text-slate-700 dark:text-slate-300">
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Resume Writing Guides
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Resume Writing Guides
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Resume Templates
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Cover Letter Writing Guides
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Cover Letter Examples
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block hover:text-primary">
                                            Cover Letter Templates
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/signin" className="mb-5 inline-block btn-primary">
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="footer">
                <h1 className='flex items-center gap-2'>
                    © 2025. All rights reserved.
                    <a href="https://github.com/KawaiiMoe3/aira" target="_blank" rel="noopener noreferrer">
                        <FaGithub className='text-2xl' />
                    </a>
                </h1>
            </div>
        </div>
    )
}
