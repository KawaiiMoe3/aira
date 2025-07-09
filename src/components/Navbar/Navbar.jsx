import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';
import aira from '../../assets/aira.png';
import n1 from '../../assets/Navbar/n1.jpg';
import n2 from '../../assets/Navbar/n2.jpg';

export default function Navbar() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
    );

    const [showMenu, setShowMenu] = useState(false);
    
    const element = document.documentElement;
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    // Dark mode switcher
    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
            console.log("dark theme");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
            console.log("light theme");
        }
    }, [theme]);

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
                            <li className="cursor pointer">
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
                                <div className='absolute -left-9 z-[99999] hidden w-[150px] bg-gradient-to-r from-[#8741eb] to-[#5b4be7] shadow-md p-2 text-white rounded-md group-hover:block'>
                                    <ul className='space-y-3'>
                                        <li className='p-2 hover:bg-violet-500'>
                                            <Link to="/about">About AIRA</Link>
                                        </li>
                                        <li className='p-2 hover:bg-violet-500'>
                                            <Link to="/faqs">FAQs</Link>
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
                            <li>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <Link to="/signin" className="btn-primary">Sign In</Link>
                                    </div>
                                </div>
                            </li>
                            {/* Light and dark mode switcher */}
                            {
                                theme === "dark" ? (
                                    <BiSolidMoon className='text-2xl' onClick={() => setTheme("light")} />
                                ) : (
                                    <BiSolidSun className='text-2xl' onClick={() => setTheme("dark")} />
                                )
                            }
                        </ul>
                    </div>
                    {/* Mobile menu section */}
                    <div className="flex items-center gap-4 md:hidden ">
                        {
                            theme === "dark" ? (
                                <BiSolidMoon
                                    onClick={() => setTheme("light")}
                                    className="text-2xl"
                                />
                                ) : (
                                <BiSolidSun
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
            <ResponsiveMenu showMenu={showMenu} />
        </div>
    )
}
