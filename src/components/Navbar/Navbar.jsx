import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../contexts/ProfileContext';
import Swal from 'sweetalert2';

import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { FaRegCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import { LuSettings } from "react-icons/lu";
import ResponsiveMenu from './ResponsiveMenu';
import aira from '../../assets/aira.png';
import n1 from '../../assets/Navbar/n1.jpg';
import n2 from '../../assets/Navbar/n2.jpg';
import guest from '../../assets/guest.png';

export default function Navbar() {

    const navigate = useNavigate();

    // Dark mode switcher
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
    );
    const element = document.documentElement;
    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
            // console.log("dark theme");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
            // console.log("light theme");
        }
    }, [theme]);

    // Responsive menu (mobile or small screen)
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    // Close menu automatically when screen is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowMenu(false);
            }
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    // For Avatar with dropdown menu
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Logout button
    const { isAuthenticated, user, logout } = useAuth();
    const { profileImage } = useProfile();
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Leaving so soon?',
            text: 'Are you sure you want to sign out?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sign Out',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                title: 'custom-title',
                htmlContainer: 'custom-text',
                popup: 'custom-swal-bg',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
            },
        });

        if(result.isConfirmed) {
            await logout();
            setIsOpen(false);
            navigate('/');
        }
    };

    return (
        <div>
            <header className='fixed top-0 left-0 right-0 z-[99] bg-navbar text-white border-b-[1px] border-primary/50'>
                <nav className='container flex h-[70px] items-center justify-between py-2 px-2'>
                    {/* Logo section */}
                    <div className='text-2xl md:text-3xl text-white'>
                        <Link to="/">
                            <img src={aira} alt="aira" className='h-10 w-auto' />
                        </Link>
                    </div>
                    {/* Desktop menu section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-4'>
                            <li className="cursor-pointer">
                                <Link to="/">Home</Link>
                            </li>
                            <li className='group relative cursor-pointer'>
                                <span className='flex items-center gap-[2px] h-[72px]'>
                                    About
                                    <span>
                                        <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                                    </span>
                                </span>
                                {/* Dropdown section */}
                                <div className="absolute right-0 top-full z-50 hidden w-[150px] bg-gradient-to-r from-[#8741eb] to-[#5b4be7] shadow-lg p-3 text-white rounded-xl group-hover:block">
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 transition">
                                            <Link to="/about" className="text-sm w-full">About AIRA</Link>
                                        </li>
                                        <li className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 transition">
                                            <Link to="/faqs" className="text-sm w-full">FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='group cursor-pointer'>
                                <span className='flex items-center gap-[2px] h-[72px]'>
                                    Resources
                                    <span>
                                        <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                                    </span>
                                </span>
                                {/* Dropdown full width section */}
                                <div className='absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-gradient-to-r from-[#8741eb] to-[#5b4be7] p-2 text-white shadow-md group-hover:block'>
                                    <div className='grid grid-cols-3 gap-5'>
                                        <div className='overflow-hidden'>
                                            <img 
                                                src={n1} 
                                                alt="No image" 
                                                className='max-h-[300px] w-full rounded-b-3xl object-contain' 
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <h1 className="pb-3 text-xl font-semibold">Useful Resources</h1>
                                            <p className="text-sm text-slate-300">
                                                Explore expert resume writing guides, real-world examples, and customizable templates — everything you need to craft a resume that stands out.
                                            </p>
                                            <div className="grid grid-cols-3 ">
                                            <ul className="mt-3 flex flex-col gap-2">
                                                <h1 className="pb-1 text-xl font-semibold">
                                                    Resume
                                                </h1>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Resume Writing Guides
                                                </li>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Resume Examples
                                                </li>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Resume Templates
                                                </li>
                                            </ul>
                                            <ul className="mt-3 flex flex-col gap-2">
                                                <h1 className="pb-1 text-xl font-semibold">
                                                    Cover Letter
                                                </h1>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Cover Letter Writing Guides
                                                </li>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Cover Letter Example
                                                </li>
                                                <li className="cursor-pointer text-white/80 hover:text-slate-400">
                                                    Cover Letter Templates
                                                </li>
                                            </ul>
                                            <div>
                                                <img 
                                                    src={n2} 
                                                    alt="no image" 
                                                    className='mt-4 max-h-[200px] w-full rounded-b-3xl object-contain' 
                                                />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {isAuthenticated ? (
                            <>
                                <li className="cursor-pointer">
                                    <Link to="/analyzer/upload-resume">Analyzer</Link>
                                </li>
                                <li className="cursor-pointer">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="relative" ref={dropdownRef}>
                                                {/* Avatar Trigger */}
                                                <div
                                                    onClick={() => setIsOpen((prev) => !prev)}
                                                    className="flex items-center gap-1 cursor-pointer h-[72px] text-slate-300 hover:brightness-125 transition-all duration-200 px-2 py-1 rounded-md"
                                                >
                                                    <img
                                                        src={profileImage || guest}
                                                        alt="User Avatar"
                                                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                                    />
                                                    <span className='inline-block max-w-[12ch] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                        {user.username}
                                                    </span>
                                                    <FaCaretDown
                                                        className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${
                                                            isOpen ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </div>
                                    
                                                {/* Dropdown */}
                                                {isOpen && (
                                                    <div className="absolute top-full right-0 z-50 w-[250px] bg-gradient-to-r from-[#8741eb] to-[#5b4be7] shadow-lg p-3 text-white rounded-xl">
                                                        <ul className="space-y-2">
                                                            {/* Email */}
                                                            <li className="flex items-center gap-2 p-2 rounded-md text-white/70 transition">
                                                                <FaRegCircleUser className="w-5 h-5" />
                                                                <span className="text-sm truncate">{user.email}</span>
                                                            </li>
                                                            <Link to="/profile">
                                                                <li className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 transition">
                                                                    <FaUserCircle className="w-5 h-5" />
                                                                    <span className="text-sm">Profile</span>
                                                                </li>
                                                            </Link>
                                                            <Link to="/account">
                                                                <li className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 transition">
                                                                    <LuSettings className="w-5 h-5" />
                                                                    <span className="text-sm">Account</span>
                                                                </li>
                                                            </Link>
                                                            <hr className="border-violet-400 my-2" />
                                    
                                                            <li className="flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 transition">
                                                                <button
                                                                    onClick={handleLogout}
                                                                    className="text-sm text-left w-full flex gap-2"
                                                                >
                                                                    <FiLogOut className="w-5 h-5" />
                                                                    Sign out
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </>
                            ) : (
                            <li>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <Link to="/signin" className="btn-primary">Sign In</Link>
                                    </div>
                                </div>
                            </li>
                            )}
                            {/* Light and dark mode switcher */}
                            {
                                theme === "dark" ? (
                                    <BiSolidSun className='text-2xl' onClick={() => setTheme("light")} />
                                ) : (
                                    <BiSolidMoon className='text-2xl' onClick={() => setTheme("dark")} />
                                )
                            }
                        </ul>
                    </div>
                    {/* Mobile menu section */}
                    <div className="flex items-center gap-4 md:hidden ">
                        {
                            theme === "dark" ? (
                                <BiSolidSun
                                    onClick={() => setTheme("light")}
                                    className="text-2xl"
                                />
                                ) : (
                                <BiSolidMoon
                                    onClick={() => setTheme("dark")}
                                    className="text-2xl"
                                />
                            )
                        }
                        {
                            showMenu ? (
                                <HiMenuAlt1
                                    onClick={toggleMenu}
                                    className=" cursor-pointer transition-all"
                                    size={30}
                                />
                            ) : (
                                <HiMenuAlt3
                                    onClick={toggleMenu}
                                    className="cursor-pointer transition-all"
                                    size={30}
                                />
                            )
                        }
                    </div>
                </nav>
            </header>
            {/* Mobile menu section */}
            <ResponsiveMenu showMenu={showMenu} profileImage={profileImage} />
        </div>
    )
}
