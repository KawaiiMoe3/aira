import React, { useState } from 'react'

export default function CertificationsTab() {

    const [certifications, setCertifications] = useState([
        { title: '', issuer: '', date: '' },
    ]);
    
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Certifications:', certifications);
        // Submit to backend using fetch or Axios here
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Certifications</h3>
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Date</label>
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

                <div className="flex justify-between">
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
