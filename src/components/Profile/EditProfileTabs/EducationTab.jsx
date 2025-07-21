import React, { useState } from 'react'

export default function EducationTab() {
    const [educations, setEducations] = useState([
        { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', cgpa: '' }
    ]);
    
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', educations);
        // Send to backend via Axios or Fetch
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Educations</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Field of Study</label>
                            <input
                                type="text"
                                name="field_of_study"
                                value={edu.field_of_study}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">CGPA</label>
                            <input
                                type="text"
                                name="cgpa"
                                value={edu.cgpa}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
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
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={edu.end_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                            />
                        </div>
                    </div>

                    {educations.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeEducation(index)}
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
                        onClick={addEducation}
                        className="btn-outline-darkmode"
                    >
                        Add Education
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
