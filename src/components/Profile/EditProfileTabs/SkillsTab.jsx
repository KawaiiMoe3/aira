import React, { useState } from 'react'

export default function SkillsTab() {

    const [skills, setSkills] = useState([{ name: '' }]);

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
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting skills:', skills); // Replace with axios/fetch
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4 dark:text-white">Skills</h2>

                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            name={`skill_${index}`}
                            placeholder="Skill name"
                            value={skill.name}
                            onChange={(e) => handleChange(index, e)}
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                        {skills.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-red-600 font-bold"
                            >
                            x
                        </button>
                        )}
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
                        Save Skills
                    </button>
                </div>
            </form>
        </div>
    )
}
