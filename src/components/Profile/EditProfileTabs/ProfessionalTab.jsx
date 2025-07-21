import React, { useState } from 'react'

export default function ProfessionalRab() {

    const [experiences, setExperiences] = useState([
        {
            company: '',
            role: '',
            start_date: '',
            end_date: '',
            contributions: '',
            skills: '',
        },
    ]);
    
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted experiences:', experiences);
        // Send to Django backend here
    };
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Professional Experiences</h3>
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
                                required
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
