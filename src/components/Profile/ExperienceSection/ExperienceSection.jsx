import React from 'react'
import ExperienceItem from './ExperienceItem'

export default function ExperienceSection() {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Professional Experience
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            
            {/* Experience 1 */}
            <ExperienceItem
                company="Pakipreneurs"
                role="Frontend Developer"
                duration="January 2025 - Present"
            />

            {/* Experience 2 */}
            <ExperienceItem
                company="Urbanloop Tech"
                role="Frontend Developer"
                duration="November 2023 - December 2024"
                contributions={[
                    'Built and optimized web applications with React.js, Remix, and TypeScript to enhance performance',
                    'Designed and implemented responsive UI components using Tailwind CSS for cross-device compatibility',
                    'Collaborated with designers and backend developers to create intuitive user experiences',
                    'Focused on performance optimization, accessibility, and best coding practices'
                ]}
                skills="React.js | Remix | TypeScript | JavaScript | Tailwind CSS | API Integrations | UI/UX Development | Performance Optimization"
            />
        </div>
    )
}
