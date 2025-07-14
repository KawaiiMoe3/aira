import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/password-reset/", { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response.data.error || "Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="btn-primary w-full">Send Reset Email</button>
            </form>
            {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </div>
    );
}
