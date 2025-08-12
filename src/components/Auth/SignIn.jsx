import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuLockKeyholeOpen } from "react-icons/lu";
import aira from "../../assets/aira.png";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';
import { GOOGLE_CLIENT_ID } from '../../utils/ViteGoogleClientId';
import GoogleSignInButton from './GoogleSignInButton';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { checkAuth } = useAuth(); // Get auth checker from context

    const navigate = useNavigate();

    const handleSignIn = async () => {
        // Frontend validation
        if (!email || !password) {
            setErrorMsg('Email and password are required.');
            setShowError(true);
            return;
        }
    
        try {
            setLoading(true);

            // Get CSRF token
            await axios.get(`${API_BASE_URL}csrf/`, {withCredentials: true});
            // Get it from cookies
            const csrfToken = Cookies.get('csrftoken');
            // Send CSRF token in headers during Sign in
            const response = await axios.post(
                `${API_BASE_URL}signin/`,
                { email, password },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                await checkAuth(); // Update global auth context
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.detail) {
                setErrorMsg(err.response.data.detail);
            } else {
                setErrorMsg('Something went wrong. Please try again.');
            }
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <>
            <Helmet>
                <title>AIRA - Sign In</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm ">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            {/* Error Alert Box */}
                            {showError && errorMsg && (
                                <div
                                    className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded"
                                    role="alert"
                                >
                                    <span className="block sm:inline pl-2 text-sm">{errorMsg}</span>
                                    <button onClick={() => setShowError(false)}>
                                        <svg
                                            className="fill-current h-6 w-6"
                                            role="button"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <title>Close</title>
                                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Your Email"
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                                placeholder='Password' 
                            />
                            <button 
                                type="button" 
                                className="btn-primary-w-full"
                                onClick={handleSignIn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="inline-block">Signing In...</span>
                                    ) : (
                                    <>
                                        <span className="inline-block mr-2">Sign In</span>
                                        <FaArrowRight className="w-4 h-4 inline-block" />
                                    </>
                                )}
                            </button>
                        </div>
                        <h5 className='text-center text-gray-400'>or continue with</h5>
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                {/* <button 
                                    type="button" 
                                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                                >
                                    Google
                                </button> */}
                                <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} />
                            </div>
                        </div>
                        <hr />
                        <div className="py-5">
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 items-center px-5">
                                {/* Forgot Password */}
                                <div className="text-center whitespace-nowrap">
                                    <button
                                        onClick={handleForgotPassword}
                                        className="transition duration-200 px-2 py-4 cursor-pointer text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                                    >
                                        <LuLockKeyholeOpen className="w-4 h-4 inline-block align-text-top" />
                                        <span className="inline-block ml-1">Forgot Password</span>
                                    </button>
                                </div>

                                {/* Sign Up */}
                                <div className="text-center whitespace-nowrap">
                                    <p className="text-sm text-gray-500">
                                        New here?{" "}
                                        <Link to="/signup" className="text-indigo-600 hover:underline">
                                            Sign Up
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

