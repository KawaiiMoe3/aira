import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';

export default function SummaryTab() {

    const [summary, setSummary] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const MAX_LENGTH = 500;

    // Load initial if summary is existing
    useEffect(() => {
        axios.get(`${API_BASE_URL}edit-profile/summary/`, { withCredentials: true })
            .then(res => {
                setSummary(res.data.summary || '');
            })
            .catch(err => {
                console.error('Failed to load summary:', err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        setTimeout(() => setMessage(''), 3000);

        // Validate summary length
        if (summary.length > MAX_LENGTH) {
            setError(`Summary cannot exceed ${MAX_LENGTH} characters.`);
            setLoading(false);
            return;
        }

        try {
            // Get CSRF token from backend
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;

            const res = await axios.post(
                `${API_BASE_URL}edit-profile/summary/`,
                { summary },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            setMessage(res.data.message || 'Summary updated.');
        } catch (err) {
            if (err.response?.data) {
                setError(err.response.data.summary || 'Failed to update summary.');
            } else {
                setError('Something went wrong.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Toast */}
            {message && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm w-[300px] text-center">
                        {message}
                    </div>
                </div>
            )}
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">About yourself</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Summary</label>
                    <textarea
                        name="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows="5"
                        className="mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                        placeholder='Let people know about you.'
                    ></textarea>

                    {/* Live character counter */}
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                        <span className={summary.length > MAX_LENGTH ? 'text-red-500' : ''}>
                            {summary.length}
                        </span> / {MAX_LENGTH} characters
                    </div>

                    {/* Error display */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button
                        type="submit"
                        className="btn-primary"
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
                        "Save"
                    )}
                </button>
            </form>
        </div>
    )
}
