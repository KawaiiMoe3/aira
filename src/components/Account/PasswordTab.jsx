import React, { useState } from 'react'
import axios from 'axios';

export default function PasswordTab() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);    

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        setSuccess("");
    
        // Basic checks
        if (!currentPassword || !password || !confirmPassword) {
            setErrors({ detail: "All fields are required." });
            return;
        }
        
        if (password !== confirmPassword) {
            setErrors({ detail: "New password and confirm password do not match." });
            return;
        }
        
        const allValid = Object.values(passwordValidations).every(Boolean);
        if (!allValid) {
            setErrors({ detail: "New password does not meet the requirements." });
            return;
        }
        
        try {
            setLoading(true);
        
            const res = await axios.post(
                "http://localhost:8000/api/user/change-password/",
                {
                    current_password: currentPassword,
                    new_password: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
        
            setSuccess("Password updated successfully!");
            setTimeout(() => setSuccess(''), 3000);
            setCurrentPassword("");
            setPassword("");
            setConfirmPassword("");
            setPasswordValidations({
                length: false,
                uppercase: false,
                lowercase: false,
                number: false,
                special: false,
            });
            setErrors({}); // Clear errors on success
        } catch (err) {
            if (err.response?.data?.error) {
                setErrors({ detail: err.response.data.error });
            } else {
                setErrors({ detail: "Something went wrong. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                {/* Toast */}
                {success && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm w-[300px] text-center">
                        {success}
                    </div>
                </div>
                )}
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Change Password</h3>
                {/* Alert */}
                {errors.detail && (
                    <div
                        className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 mb-2 rounded"
                        role="alert"
                    >
                        <span className="block sm:inline pl-2 text-sm">{errors.detail}</span>
                        <button onClick={() => setErrors({ ...errors, detail: null })}>
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 border rounded-lg p-2 mb-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">New Password</label>
                        <input
                            type="password"
                            className="mt-1 border rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 border rounded-lg p-2 mb-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 btn-primary"
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
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}
