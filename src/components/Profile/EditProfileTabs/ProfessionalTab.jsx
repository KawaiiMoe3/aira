import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';

export default function ProfessionalRab() {

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [experiences, setExperiences] = useState([
        {
            company: '',
            role: '',
            start_date: '',
            end_date: '',
            contributions: '',
            skills: '',
            still_working: false,
        },
    ]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}edit-profile/experiences/`, { withCredentials: true });
                const data = response.data.experiences || [];
    
                // Convert backend format to form-friendly structure
                const formatted = data.map(exp => ({
                    ...exp,
                    company: exp.company || '',
                    role: exp.role || '',
                    start_date: exp.start_date || '',
                    end_date: exp.is_still_working ? '' : (exp.end_date || ''),
                    contributions: exp.contributions || '',
                    skills: exp.skills || '',
                    still_working: exp.is_still_working || false,
                }));
    
                setExperiences(formatted.length > 0 ? formatted : [{
                    company: '', role: '', start_date: '', end_date: '', contributions: '', skills: '', still_working: false
                }]);
            } catch (error) {
                console.error("Failed to load experiences", error);
                setErrors("Failed to load experiences.");
            }
        };
    
        fetchExperiences();
    }, []);    
    
    const handleChange = (index, e) => {
        const updated = [...experiences];
        updated[index][e.target.name] = e.target.value;
        setExperiences(updated);
    };
    
    const addExperience = () => {
        setExperiences([
            ...experiences,
            {
                company: '',
                role: '',
                start_date: '',
                end_date: '',
                contributions: '',
                skills: '',
            },
        ]);
    };
    
    const removeExperience = (index) => {
        const updated = [...experiences];
        updated.splice(index, 1);
        setExperiences(updated);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');
        setLoading(true);

        // Validation
        for (let exp of experiences) {
            if (!exp.company.trim() || !exp.role.trim() || !exp.start_date) {
                setErrors("Please fill in all required fields or remove empty ones.");
                setLoading(false);
                return;
            }
        }

        const experience = experiences.map((exp) => ({
            ...exp,
            end_date: exp.still_working ? 'Present' : exp.end_date,
            is_still_working: exp.still_working,
        }));

        try {
            // Get CSRF token
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;
        
            const response = await axios.post(
                `${API_BASE_URL}edit-profile/experiences/`,
                { experiences: experience },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log('Submitted experiences:', experiences);
            setMessage(response.data.message || "Experiences saved.");
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Failed to save experiences:", error);
            setErrors("Failed to save experiences.");
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
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Professional Experiences</h3>

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
                {experiences.map((exp, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">Experience {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={exp.role}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={exp.start_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={exp.end_date}
                                onChange={(e) => handleChange(index, e)}
                                disabled={exp.still_working}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Key Contributions</label>
                            <textarea
                                name="contributions"
                                value={exp.contributions}
                                onChange={(e) => handleChange(index, e)}
                                rows="3"
                                placeholder="What did you achieve or contribute?"
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Skills Used</label>
                            <textarea
                                name="skills"
                                value={exp.skills}
                                onChange={(e) => handleChange(index, e)}
                                rows="2"
                                placeholder="List of relevant skills used in this role"
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <label className="flex items-center cursor-pointer relative" htmlFor={`still_working_${ index + 1 }`}>
                            <input
                                id={`still_working_${ index + 1 }`}
                                type="checkbox"
                                name="is_still_working"
                                checked={exp.still_working}
                                onChange={(e) => {
                                    const updated = [...experiences];
                                    updated[index].still_working = e.target.checked;
                                    // Clear end_date if checked
                                    if (e.target.checked) updated[index].end_date = '';
                                    setExperiences(updated);
                                }}
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#8741eb] checked:border-slate-800"
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                    strokeWidth="currentColor" stroke-width="1">
                                    <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                        <label className="cursor-pointer ml-2 text-sm text-gray-700 dark:text-white" htmlFor={`still_working_${ index + 1 }`}>Still working here?</label>
                    </div>

                    {experiences.length > 1 && (
                    <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 mt-4 hover:underline"
                    >
                        Remove
                    </button>
                    )}
                </div>
                ))}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={addExperience}
                        className="btn-outline-darkmode"
                    >
                        Add Experience
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
