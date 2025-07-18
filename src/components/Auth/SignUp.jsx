import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import aira from "../../assets/aira.png";
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import Cookies from 'js-cookie';

export default function SignIn() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        agreeTerms: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = async () => {
        const { username, email, password, agreeTerms } = formData;
        const newErrors = {};
      
        const usernameRegex = /^[a-zA-Z0-9 ]{1,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Username Validation
        if (!username) {
            newErrors.username = "Username is required.";
        } else if (!usernameRegex.test(username) || username.trim() === "") {
            newErrors.username = "Username must be 1-50 characters, using letters, numbers, and spaces only. Cannot be only spaces.";
        }

        // Email Validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        // Password Validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        } else {
            if (!/[A-Z]/.test(password)) {
                newErrors.password = "Password must include at least one uppercase letter.";
            } else if (!/[a-z]/.test(password)) {
                newErrors.password = "Password must include at least one lowercase letter.";
            } else if (!/[0-9]/.test(password)) {
                newErrors.password = "Password must include at least one number.";
            } else if (!/[^A-Za-z0-9]/.test(password)) {
                newErrors.password = "Password must include at least one special character.";
            }
        }

        // Terms agreement
        if (!agreeTerms) {
            Swal.fire({
                icon: 'warning',
                text: 'You must agree to the Terms of Service and Privacy Policy.',
                customClass: {
                    htmlContainer: 'custom-text',
                    popup: 'custom-swal-bg',
                    confirmButton: 'custom-confirm-button',
                },
            });
            return;
        }
      
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors if validation passed
        setErrors({});
      
        // Submit the form
        try {
            // Get CSRF token
            await axios.get(`${API_BASE_URL}csrf/`, {withCredentials: true});
            // Get it from cookies
            const csrfToken = Cookies.get('csrftoken');
            
            const response = await axios.post(
                `${API_BASE_URL}signup/`, {
                    username,
                    email,
                    password,
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,
                }
            );
      
            if (response.status === 201) {
                // Redirect or show success message
                console.log("Signup successful!");
                navigate('/signin');
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.detail) {
                setErrors({ general: err.response.data.detail });
            } else if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ general: "Something went wrong." });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>AIRA - Sign Up</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm md:max-w-md">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            <div className='mb-4'>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
                                <input 
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Your Username*" 
                                />
                                {errors.username && <p className="text-red-500 mb-4 text-sm">{errors.username}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                <input 
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Your Email*" 
                                />
                                {errors.email && <p className="text-red-500 mb-4 text-sm">{errors.email}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                <input 
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Password*" 
                                />
                                {errors.password && <p className="text-red-500 mb-4 text-sm">{errors.password}</p>}
                            </div>
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                                    <input 
                                        type="checkbox"
                                        id="check-2"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#8741eb] checked:border-slate-800"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                            strokeWidth="currentColor" stroke-width="1">
                                            <path fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="cursor-pointer ml-2 text-slate-500 text-sm" htmlFor="check-2">
                                    I agree to
                                    <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a>
                                    {" "}and
                                    <a href="#" className="text-indigo-600 hover:underline ml-1">Privacy Policy</a>
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                            </div>
                            <button 
                                type="button"
                                onClick={handleSubmit}
                                className="btn-primary-w-full mt-2"
                            >
                                <span className="inline-block mr-2">Sign Up</span>
                                <FaArrowUp className="w-4 h-4 inline-block" />
                            </button>
                        </div>
                        <h5 className='text-center text-gray-400'>or continue with</h5>
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                <button 
                                    type="button" 
                                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                                >
                                    Google
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="py-5">
                            <div className="grid grid-cols-1 gap-1 items-center px-5">
                                {/* Sign In */}
                                <div className="text-center whitespace-nowrap">
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{" "}
                                        <Link to="/signin" className="text-indigo-600 hover:underline">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link 
                                    to="/"
                                    className="btn-outline"
                                >
                                    <FaArrowLeft className="w-4 h-4 inline-block align-text-top" />
                                    <span className="inline-block ml-1">
                                        Back to Home 
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

