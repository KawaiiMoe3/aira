import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';
import axios from 'axios';

export default function ProfileInfoTab() {

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);   

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        position: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: '',
        other_link: ''
    });

    // Load initial the data if profile info is existing
    useEffect(() => {
        axios.get(`${API_BASE_URL}edit-profile/info/`, { withCredentials: true })
            .then(res => setFormData(res.data))
            .catch(err => {
                console.error('Failed to load profile info:', err);
            });
    }, []);    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null }); // clear error when typing
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Full Name: max 50 chars, only alphanumeric and space
        if (!/^[A-Za-z0-9 ]{1,50}$/.test(formData.full_name.trim())) {
            newErrors.full_name = 'Full name must be alphanumeric, spaces only, max 50 characters.';
        }

        // Maximum length of characters for position and location
        if (formData.position && formData.position.length > 100) {
            newErrors.position = 'Position cannot exceed 100 characters.';
        }
        if (formData.location && formData.location.length > 100) {
            newErrors.location = 'Location cannot exceed 100 characters.';
        }

        // URL validation
        ['linkedin', 'github', 'portfolio', 'other_link'].forEach((field) => {
            if (formData[field] && !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(formData[field])) {
                newErrors[field] = `Please enter a valid URL for ${field.replace('_', ' ')}.`;
            }
        });

        // Show validation errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        try {
            setLoading(true);

            // Get CSRF token from backend
            const csrfResponse = await axios.get(`${API_BASE_URL}csrf/`, {
                withCredentials: true,
            });
            const csrfToken = csrfResponse.data.csrfToken;

            // Submit or update profile info
            const response = await axios.post(
                `${API_BASE_URL}edit-profile/info/`,
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log('Profile info updated:', response.data);
            setSuccessMessage(response.data.message || 'Profile updated successfully.');
            setErrors({});
            setTimeout(() => setSuccessMessage(''), 3000);

            // Update formData with returned values
            setFormData(prev => ({
                ...prev,
                ...response.data
            }));
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                console.error('Unexpected error:', err);
                setErrors({ detail: 'Something went wrong.' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Toast */}
            {successMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm w-[300px] text-center">
                        {successMessage}
                    </div>
                </div>
            )}
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Profile Info</h3>
            </div>

            {/* Alert */}
            {Object.entries(errors).map(([key, value], i) =>
                key === 'detail' && value ? (
                    <div key={i} className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded flex justify-between" role="alert">
                        <span className="text-sm">{value}</span>
                        <button onClick={() => setErrors({ ...errors, [key]: null })}>
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
                ) : null
            )}

            <form onSubmit={handleSubmit}>
            {[
                { label: "Full Name", name: "full_name", type: "text" },
                { label: "Phone", name: "phone", type: "text" },
                { label: "Position", name: "position", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "LinkedIn", name: "linkedin", type: "url" },
                { label: "GitHub", name: "github", type: "url" },
                { label: "Portfolio", name: "portfolio", type: "url" },
                { label: "Other Link", name: "other_link", type: "url" },
            ].map(({ label, name, type }, index, array) => (
                <React.Fragment key={name}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            placeholder={`Your ${label.toLowerCase()}`}
                        />
                        {errors[name] && (
                            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                        )}
                    </div>

                    {/* Insert "Contacts" title after "Position" */}
                    {name === "position" && (
                        <h3 className="text-xl font-semibold mb-4 dark:text-white">Contacts</h3>
                    )}
                </React.Fragment>
            ))}

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
                        "Save"
                    )}
                </button>
            </form>
        </div>
    )
}
