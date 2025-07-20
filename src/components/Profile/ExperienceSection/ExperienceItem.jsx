import React from 'react';

export default function ExperienceItem({ company, role, duration, contributions = [], skills }) {
    return (
        <div className="mb-6 relative pl-6 border-l-2 border-blue-200">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold text-gray-800">{company} | {role}</h3>
            <p className="text-blue-600 font-medium text-sm mb-2">{duration}</p>

            {contributions.length > 0 && (
                <>
                    <p className="font-medium text-sm text-gray-700 mt-2">Key Contributions:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {contributions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </>
            )}

            {skills && (
                <>
                    <p className="font-medium text-sm text-gray-700 mt-2">Key Skills:</p>
                    <p className="text-sm text-gray-600">{skills}</p>
                </>
            )}
        </div>
    );
}
