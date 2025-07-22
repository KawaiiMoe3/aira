import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';

export default function CertificationsTab() {

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [certifications, setCertifications] = useState([
        { title: '', issuer: '', date: '' },
    ]);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}edit-profile/certifications/`, { withCredentials: true });
                const data = response.data.certifications || [];
    
                const formatted = data.map(cert => ({
                    title: cert.title || '',
                    issuer: cert.issuer || '',
                    date: cert.date || '',
                }));
    
                setCertifications(formatted.length > 0 ? formatted : [{
                    title: '', issuer: '', date: ''
                }]);
            } catch (error) {
                console.error("Failed to load certifications", error);
                setErrors("Failed to load certifications.");
            }
        };
    
        fetchCertifications();
    }, []);    
    
    const handleChange = (index, e) => {
        const updated = [...certifications];
        updated[index][e.target.name] = e.target.value;
        setCertifications(updated);
    };
    
    const addCertification = () => {
        setCertifications([...certifications, { title: '', issuer: '', date: '' }]);
    };
    
    const removeCertification = (index) => {
        const updated = [...certifications];
        updated.splice(index, 1);
        setCertifications(updated);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');
        setLoading(true);

        // Validation of title
        for (const cert of certifications) {
            if (!cert.title) {
                setErrors("Please fill in the 'Title' field for each certification or remove the empty one.");
                setLoading(false);
                return;
            }
        }

        try {
            // Get CSRF token
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;

            const response = await axios.post(
                `${API_BASE_URL}edit-profile/certifications/`,
                { certifications },
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );

            console.log('Submitted Certifications:', certifications);
            setMessage(response.data.message || "Certifications updated successfully.");
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Failed to save certifications:", error);
            setErrors("Failed to save certifications.");
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

            <div className=''>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Certifications</h3>

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
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
            {certifications.map((cert, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow dark:bg-gray-800">
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">Certification {index + 1}</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={cert.title}
                            onChange={(e) => handleChange(index, e)}
                            required
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Issuer</label>
                        <input
                            type="text"
                            name="issuer"
                            value={cert.issuer}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., Coursera, Microsoft"
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Issue Date</label>
                        <input
                            type="date"
                            name="date"
                            value={cert.date}
                            onChange={(e) => handleChange(index, e)}
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                        {certifications.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="text-red-600 mt-3 hover:underline"
                        >
                            Remove
                        </button>
                        )}
                </div>
            ))}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={addCertification}
                        className="btn-outline-darkmode"
                    >
                        Add Certification
                    </button>

                    <button
                        type="submit"
                        className="btn-primary"
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
                </div>
            </form>
        </div>
    )
}
