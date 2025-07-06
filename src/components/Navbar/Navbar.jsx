import React, { useEffect, useState } from 'react'
import { BiPhoneCall, BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';

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
                        <a href="#">
                            {" "}
                            <span className='inline-block font-bold text-primary'>AIRA</span>
                        </a>
                    </div>
                    {/* Desktop menu section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-4'>
                            <li className='group relative cursor-pointer'>
                                <a href="#" className='flex items-center gap-[2px] h-[72px]'>
                                    Home
                                    <span>
                                        <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                                    </span>
                                </a>
                                {/* Dropdown section */}
                                <div className='absolute -left-9 z-[99999] hidden w-[150px] bg-white shadow-md p-2 text-black rounded-md group-hover:block'>
                                    <ul className='space-y-3'>
                                        <li className='p-2 hover:bg-violet-200'>Services</li>
                                        <li className='p-2 hover:bg-violet-200'>About Us</li>
                                        <li className='p-2 hover:bg-violet-200'>Privacy Policy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className='group cursor-pointer'>
                                <a href="#" className='flex items-center gap-[2px] h-[72px]'>
                                    Services
                                    <span>
                                        <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                                    </span>
                                </a>
                                {/* Dropdown full width section */}
                                <div className='absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white p-2 text-black shadow-md group-hover:block'>
                                    <div className='grid grid-cols-3 gap-5'>
                                        <div className='overflow-hidden'>
                                            <img 
                                                src="https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png" 
                                                alt="pics" 
                                                className='max-h-[300px] w-full rounded-b-3xl object-fill' 
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <h1 className="pb-3 text-xl font-semibold">Best Selling</h1>
                                            <p className="text-sm text-slate-600">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Aspernatur exercitationem delectus iusto animi aperiam
                                            deleniti reprehenderit doloribus, numquam corporis quae.
                                            </p>
                                            <div className="grid grid-cols-3 ">
                                            <ul className="mt-3 flex flex-col gap-2">
                                                <h1 className="pb-1 text-xl font-semibold">
                                                    Development
                                                </h1>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    Web development
                                                </li>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    IOS App Development
                                                </li>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    App Development
                                                </li>
                                            </ul>
                                            <ul className="mt-3 flex flex-col gap-2">
                                                <h1 className="pb-1 text-xl font-semibold">
                                                    Other Services
                                                </h1>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    Cloud Services
                                                </li>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    Mobile App
                                                </li>
                                                <li className="cursor-pointer text-black/80 hover:text-primary">
                                                    App Development
                                                </li>
                                            </ul>
                                            <div>
                                                <img src="https://picsum.photos/180" alt="no image" />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="cursor pointer">
                                <a href="/#contact">Contact</a>
                            </li>
                            <li>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <BiPhoneCall className="h-[40px] w-[40px] rounded-md bg-primary p-2 text-2xl text-white hover:bg-primary/90" />
                                    </div>
                                    <div>
                                        <p className="text-sm">Call us on</p>
                                        <p className="text-lg">+91 123456789</p>
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
