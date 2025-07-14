import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/api/password-reset-confirm/", {
                uid,
                token,
                password,
            });
            setMessage(res.data.message);
            setTimeout(() => navigate("/signin"), 3000);
        } catch (err) {
            setMessage(err.response.data.error || "Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <button className="btn-primary w-full">Reset Password</button>
            </form>
            {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </div>
    );
}
