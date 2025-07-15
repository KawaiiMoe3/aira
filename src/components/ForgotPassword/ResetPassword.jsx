import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import aira from "../../assets/aira.png";
import ok from "../../assets/ok.png";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    
    // Live Password Checklist
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });
    const handlePasswordChange = (value) => {
        setPassword(value);
    
        setPasswordValidations({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };    

    // Password Validation
    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const upper = /[A-Z]/;
        const lower = /[a-z]/;
        const number = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;
    
        return (
            minLength.test(password) &&
            upper.test(password) &&
            lower.test(password) &&
            number.test(password) &&
            special.test(password)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setShowSuccess(false);
        setShowError(false);

        if (!password || !confirm) {
            setError("Both password fields are required.");
            setShowError(true);
            return;
        } else if (password !== confirm) {
            setError("Passwords do not match.");
            setShowError(true);
            return;
        } else if (!validatePassword(password)) {
            setError(
                "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
            );
            setShowError(true);
            return;
        }
        
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/api/password-reset-confirm/", {
                uid,
                token,
                password,
            });
            setMessage(res.data.message);
            setShowSuccess(true);
            setPassword("");
            setConfirm("");

            // Auto redirect to sign in page when password reset is successful
            let timerInterval;
            Swal.fire({
                imageUrl: ok,
                title: 'Password Reset Successfully!',
                html: 'Continue to Sign in page in (<b></b>) milliseconds.',
                timer: 5000,
                timerProgressBar: true,
                customClass: {
                    title: 'custom-title',
                    htmlContainer: 'custom-html',
                    popup: 'custom-swal-bg',
                },
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    navigate("/signin");
                },
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Something went wrong. Please try again.";
            setMessage(errorMsg);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>AIRA - Reset Password</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-violet-950 to-violet-900 flex flex-col justify-center">
                <div className="px-4 py-8 sm:px-6 sm:py-10 mx-auto w-full max-w-sm">
                    <img src={aira} alt="AIRA" className="mx-auto mb-5 h-12" />
                    <div className="bg-white shadow w-full rounded-lg">
                        <div className="px-5 py-7">
                            {/* Success Alert */}
                            {showSuccess && (
                                <div className="w-full flex justify-between bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-2 rounded">
                                    <span className="block sm:inline pl-2 text-sm">{message}</span>
                                    <button onClick={() => setShowSuccess(false)}>
                                        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                                            <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 11-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 111.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Error Alert */}
                            {showError && (
                                <div className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded">
                                    <span className="block sm:inline pl-2 text-sm">{message || error}</span>
                                    <button onClick={() => setShowError(false)}>
                                        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                                            <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 11-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 111.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <h1 className="text-center mb-4 font-bold">Reset your password</h1>
                            <p className="text-center mb-6 text-sm text-gray-600">
                                Enter a new password for your account.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
                                <input
                                    type="password"
                                    className="border rounded-lg px-3 py-2 mb-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="New password"
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    required
                                    disabled={loading}
                                />

                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
                                <input
                                    type="password"
                                    className="border rounded-lg px-3 py-2 mb-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Confirm password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                                {/* Password Checklist */}
                                <ul className="mb-3 text-sm pl-2 space-y-1">
                                    <li className={passwordValidations.length ? "text-green-600" : "text-red-500"}>
                                        {passwordValidations.length ? "✓" : "✗"} At least 8 characters
                                    </li>
                                    <li className={passwordValidations.uppercase ? "text-green-600" : "text-red-500"}>
                                        {passwordValidations.uppercase ? "✓" : "✗"} At least 1 uppercase letter
                                    </li>
                                    <li className={passwordValidations.lowercase ? "text-green-600" : "text-red-500"}>
                                        {passwordValidations.lowercase ? "✓" : "✗"} At least 1 lowercase letter
                                    </li>
                                    <li className={passwordValidations.number ? "text-green-600" : "text-red-500"}>
                                        {passwordValidations.number ? "✓" : "✗"} At least 1 number
                                    </li>
                                    <li className={passwordValidations.special ? "text-green-600" : "text-red-500"}>
                                        {passwordValidations.special ? "✓" : "✗"} At least 1 special character
                                    </li>
                                </ul>

                                <button
                                    type="submit"
                                    className="btn-primary w-full mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
