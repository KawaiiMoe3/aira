import React from 'react'
import CertificationItem from './CertificationItem';

export default function Certifications() {
    const certifications = [
        "Agile Principles and Methodologies Course",
        "Front-End Engineer Career Path",
        "Learn CSS: Responsive Design Course"
    ];

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Certifications
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            
            {/* Certification items */}
            {certifications.map((cert, index) => (
                <CertificationItem key={index} title={cert} />
            ))}
        </div>
    )
}
