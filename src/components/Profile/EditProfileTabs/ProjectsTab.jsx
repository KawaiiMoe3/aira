import React, { useState } from 'react'

export default function ProjectsTab() {

    const [projects, setProjects] = useState([
        {
            title: '',
            description: '',
            technologies: '',
            live_link: '',
            github_link: '',
        },
    ]);
    
    const handleChange = (index, e) => {
        const updated = [...projects];
        updated[index][e.target.name] = e.target.value;
        setProjects(updated);
    };
    
    const addProject = () => {
        setProjects([
            ...projects,
            {
                title: '',
                description: '',
                technologies: '',
                live_link: '',
                github_link: '',
            },
        ]);
    };
    
    const removeProject = (index) => {
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted projects:', projects);
        // You can use Axios or fetch to send this data to the Django backend
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Projects</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
            {projects.map((project, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow dark:bg-gray-800">
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">Project {index + 1}</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={project.title}
                            onChange={(e) => handleChange(index, e)}
                            required
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Description</label>
                        <textarea
                            name="description"
                            value={project.description}
                            onChange={(e) => handleChange(index, e)}
                            rows="3"
                            required
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Technologies Used</label>
                        <input
                            type="text"
                            name="technologies"
                            value={project.technologies}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., React, Django, Tailwind"
                            required
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Live Link (Optional)</label>
                        <input
                            type="url"
                            name="live_link"
                            value={project.live_link}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="https://example.com"
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">GitHub Link (Optional)</label>
                        <input
                            type="url"
                            name="github_link"
                            value={project.github_link}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="https://github.com/username/project"
                            className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        />
                    </div>

                    {projects.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeProject(index)}
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
                    onClick={addProject}
                    className="btn-outline-darkmode"
                >
                    Add Project
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
