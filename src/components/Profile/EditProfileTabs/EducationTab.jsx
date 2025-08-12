import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';

export default function EducationTab() {

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}edit-profile/educations/`, { withCredentials: true });
                const data = response.data.educations || [];

                // Convert backend format to form-friendly structure
                const formatted = data.map(edu => ({
                    ...edu,
                    // Ensure these values are defined (for controlled inputs)
                    institution: edu.institution || '',
                    degree: edu.degree || '',
                    field_of_study: edu.field_of_study || '',
                    start_date: edu.start_date || '',
                    end_date: edu.is_still_studying ? '' : (edu.end_date || ''),
                    cgpa: edu.cgpa || '',
                    still_studying: edu.is_still_studying || false,
                }));

                setEducations(formatted);
            } catch (error) {
                console.error("Failed to load educations", error);
                setErrors("Failed to load educations.");
            }
        };

        fetchEducations();
    }, []);
    
    const handleChange = (index, e) => {
        const newEducations = [...educations];
        newEducations[index][e.target.name] = e.target.value;
        setEducations(newEducations);
    };
    
    const addEducation = () => {
        setEducations([
          ...educations,
          { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', cgpa: '' }
        ]);
    };
    
    const removeEducation = (index) => {
        const newEducations = [...educations];
        newEducations.splice(index, 1);
        setEducations(newEducations);
    };    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');
        setLoading(true);

        // Skip validation if all fields are removed
        if (educations.length > 0) {
            for (let edu of educations) {
                if (!edu.institution.trim() || !edu.start_date) {
                    setErrors("Please fill in all required fields or remove empty entries.");
                    setLoading(false);
                    return;
                }
            }
        }

        const education = educations.map((edu) => ({
            ...edu,
            end_date: edu.still_studying ? 'Present' : edu.end_date,
            is_still_studying: edu.still_studying,
        }));

        try {
            // Get CSRF token
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;

            const response = await axios.post(
                `${API_BASE_URL}edit-profile/educations/`, 
                { educations: education },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Submitting:', educations);
            setMessage(response.data.message || "Educations saved.");
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Failed to save educations: ", error);
            setErrors("Failed to save educations.");
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
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Educations</h3>

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
                {educations.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                        No educations added yet.
                    </p>
                )}

                {educations.map((edu, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white dark:dark:bg-gray-800 shadow">
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">Education {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Institution</label>
                            <input
                                type="text"
                                name="institution"
                                value={edu.institution}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                                placeholder='University of Malaya'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                                placeholder='Diploma/Bachelor Degree/Master'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Field of Study</label>
                            <input
                                type="text"
                                name="field_of_study"
                                value={edu.field_of_study}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                                placeholder='Software Engineer'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">CGPA</label>
                            <input
                                type="text"
                                name="cgpa"
                                value={edu.cgpa}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                                placeholder='4.00'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={edu.start_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={edu.end_date}
                                onChange={(e) => handleChange(index, e)}
                                disabled={edu.still_studying}
                                required={!edu.still_studying}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <label className="flex items-center cursor-pointer relative" htmlFor={`still_studying_${ index + 1 }`}>
                            <input
                                id={`still_studying_${ index + 1 }`}
                                type="checkbox"
                                name="is_still_studying"
                                checked={edu.still_studying}
                                onChange={(e) => {
                                    const newEducations = [...educations];
                                    newEducations[index].still_studying = e.target.checked;
                                    if (e.target.checked) {
                                        newEducations[index].end_date = ''; // Clear end_date if still studying
                                    }
                                    setEducations(newEducations);
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
                        <label className="cursor-pointer ml-2 text-sm text-gray-700 dark:text-white" htmlFor={`still_studying_${ index + 1 }`}>Still studying?</label>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-600 mt-4 hover:underline"
                    >
                        Remove
                    </button>
                </div>
                ))}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={addEducation}
                        className="btn-outline-darkmode"
                    >
                        Add Education
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
