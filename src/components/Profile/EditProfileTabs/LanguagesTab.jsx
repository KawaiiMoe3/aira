import React, { useState } from 'react'

export default function LanguagesTab() {

    const [languages, setLanguages] = useState([
        { name: '', proficiency: '' },
    ]);
    
    const handleChange = (index, field, value) => {
        const updated = [...languages];
        updated[index][field] = value;
        setLanguages(updated);
    };
    
    const handleAdd = () => {
        setLanguages([...languages, { name: '', proficiency: '' }]);
    };
    
    const handleRemove = (index) => {
        const updated = languages.filter((_, i) => i !== index);
        setLanguages(updated);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted languages: ", languages);
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold mb-4 dark:text-white">Add your languages</h2>
                {languages.map((lang, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    name={`language_name_${index}`}
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                    required
                />
                <select
                    name={`language_proficiency_${index}`}
                    value={lang.proficiency}
                    onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                    className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                    required
                >
                    <option value="">Select Proficiency</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Basic">Basic</option>
                </select>
                {languages.length > 1 && (
                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="text-red-500 hover:underline"
                    >
                        Remove
                    </button>
                )}
                </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="btn-outline-darkmode"
                    >
                        Add Another Language
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Save Languages
                    </button>
                </div>
            </form>
        </div>
    )
}
