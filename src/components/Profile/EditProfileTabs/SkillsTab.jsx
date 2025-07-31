import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';
import axios from 'axios';

export default function SkillsTab() {

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}edit-profile/skills/`, {
                    withCredentials: true,
                });
                const fetchedSkills = res.data.skills;
                setSkills(Array.isArray(fetchedSkills) && fetchedSkills.length > 0 ? fetchedSkills : []);
            } catch (err) {
                console.error("Failed to fetch skills:", err);
                setErrors("Failed to fetch skills.");
            }
        };
    
        fetchSkills();
    }, []);    

    const handleChange = (index, e) => {
        const newSkills = [...skills];
        newSkills[index].name = e.target.value;
        setSkills(newSkills);
    };
  
    const addSkill = () => {
        setSkills([...skills, { name: '' }]);
    };
  
    const removeSkill = (index) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');
        setLoading(true);

        // Filter out completely empty rows
        const nonEmptySkills = skills.filter(skill => skill.name.trim());

        // Skip validation if all are empty
        if (nonEmptySkills.length > 0) {
            for (let skill of nonEmptySkills) {
                if (!skill.name.trim()) {
                    setErrors("Please fill in all skill names or remove empty ones.");
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
                `${API_BASE_URL}edit-profile/skills/`,
                { skills },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Submitting skills:', skills);
            setMessage(res.data.message || "Skills saved.");
            setSkills(nonEmptySkills);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error("Failed to save skills:", err);
            setErrors("Failed to save skills.");
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

            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4 dark:text-white">Skills</h2>

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

                {skills.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                        No skills added yet.
                    </p>
                )}

                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Skill name"
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 dark:bg-slate-900 dark:text-white dark:border-slate-500"
                            required
                        />
                        <button type="button" onClick={() => removeSkill(index)} className="ml-2 text-red-600">
                            Remove
                        </button>
                    </div>
                ))}
                <div className="flex gap-2 mt-3">
                    <button
                        type="button"
                        onClick={addSkill}
                        className="btn-outline-darkmode"
                    >
                        Add Skill
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
