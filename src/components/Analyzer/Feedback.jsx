import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';

export default function Feedback() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}feedback/${id}`);
                setData(res.data);
            } catch (err) {
                setError("Failed to fetch feedback.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [id]);

    if (loading) return <div className="text-center text-white mt-10">Loading feedback...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-200 mb-4">AI Feedback</h1>
            <p className="bg-white dark:bg-slate-800 p-4 rounded shadow text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {data.ai_feedback}
            </p>

            <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-300 mt-8 mb-2">Enhanced Resume</h2>
            <p className="bg-white dark:bg-slate-800 p-4 rounded shadow text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {data.enhanced_resume}
            </p>
        </div>
    );
}
