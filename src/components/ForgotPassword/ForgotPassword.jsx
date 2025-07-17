import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import aira from "../../assets/aira.png";
import { API_BASE_URL } from "../../utils/ViteApiBaseUrl";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Email format validation
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setShowSuccess(false);
        setShowError(false);
        setLoading(true);

        if (!email) {
            setError("Email is required.");
            setLoading(false);
            return;
        } else if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        
        try {
            const res = await axios.post(`${API_BASE_URL}password-reset/`, { email });
            setMessage(res.data.message);
            setShowSuccess(true);
            setEmail("");
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
            setMessage(errorMessage);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>AIRA - Forgot Password</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm ">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            {/* Email was found */}
                            {showSuccess && (
                            <div
                                className="w-full flex justify-between bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-2 rounded"
                                role="alert"
                            >
                                <span className="block sm:inline pl-2 text-sm">
                                    {message}
                                </span>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                >
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

                            {/* Email was not found */}
                            {showError && (
                            <div
                                className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded"
                                role="alert"
                            >
                                <span className="block sm:inline pl-2 text-sm">{message}</span>
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
                            <h1 className="text-center mb-4 font-bold">
                                Reset your password
                            </h1>
                            <p className="text-center mb-8 text-sm">
                                We will send you a secure email with a link to change your password.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Your Email"
                                    disabled={loading}
                                />
                                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                                <button 
                                    type="submit"
                                    className="btn-primary w-full mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        "Send"
                                    )}
                                </button>
                            </form>
                        </div>
                        <hr />
                        <div className="py-5">
                            <div className="grid grid-cols-1 gap-1 items-center px-5">
                                {/* Sign In */}
                                <div className="text-center whitespace-nowrap">
                                    <p className="text-sm text-gray-500">
                                        You don't have an account yet?{" "}
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
                                    to="/signin"
                                    className="btn-outline"
                                >
                                    <FaArrowLeft className="w-4 h-4 inline-block align-text-top" />
                                    <span className="inline-block ml-1">
                                        Back to SIgn In
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
