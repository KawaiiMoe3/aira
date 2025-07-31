import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';

export default function LanguagesTab() {

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);

    // Load initial if languages is existing
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}edit-profile/languages/`, { withCredentials: true });
                const langs = res.data.languages || [];
                setLanguages(langs);
            } catch (err) {
                console.error("Failed to load languages:", err);
                setErrors("Failed to load languages.");
            }
        };
        fetchLanguages();
    }, []);         
    
    const handleChange = (index, field, value) => {
        const updated = [...languages];
        updated[index][field] = value;
        setLanguages(updated);
    };
    
    const handleAdd = () => {
        setLanguages([...languages, { name: '', proficiency: '' }]);
    };
    
    const handleRemove = (index) => {
        const updated = [...languages];
        updated.splice(index, 1);
        setLanguages(updated);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setErrors('');

        // Filter out completely empty rows
        const nonEmptyLanguages = languages.filter(
            (lang) => lang.name.trim() || lang.proficiency.trim()
        );

        // Skip validation if all fields are removed
        if (nonEmptyLanguages.length > 0) {
            for (let lang of nonEmptyLanguages) {
                if (lang.name.trim() && !lang.proficiency.trim()) {
                    setErrors(`Proficiency is required for language "${lang.name.trim()}"`);
                    setLoading(false);
                    return;
                }
                if (!lang.name.trim() && lang.proficiency.trim()) {
                    setErrors("Language name is required if proficiency is provided.");
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            // Get CSRF token
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;
    
            const res = await axios.post(
                `${API_BASE_URL}edit-profile/languages/`,
                { languages },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log("Submitted languages: ", languages);
            setMessage(res.data.message || "Languages saved successfully.");
            setLanguages(nonEmptyLanguages);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error("Failed to save languages:", err);
            setErrors("Failed to save languages.");
        } finally {
            setLoading(false);
        }
        
    };

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

            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold mb-4 dark:text-white">Add your languages</h2>
                {/* Alert */}
                {errors && (
                <div
                    className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 mb-2 rounded"
                    role="alert"
                >
                    <span className="block sm:inline pl-2 text-sm">{errors}</span>
                    <button onClick={() => setErrors(null)}>
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

                {/* Fallback if no entries */}
                {languages.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                        No languages added yet.
                    </p>
                )}

                {/* Language Input Fields */}
                {languages.map((lang, index) => (
                    <div key={index} className="flex items-center mb-2 gap-4">
                        <input
                            type="text"
                            placeholder="Language"
                            value={lang.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            required
                        />
                        <select
                            value={lang.proficiency}
                            onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            required
                        >
                            <option value="">--Select Proficiency--</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Basic">Basic</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="btn-outline-darkmode"
                    >
                        Add Language
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
