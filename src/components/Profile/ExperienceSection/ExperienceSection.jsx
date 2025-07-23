import React from 'react'
import ExperienceItem from './ExperienceItem'
import { useProfile } from '../../../contexts/ProfileContext'
import { formatDateRange } from '../../../utils/dateUtils';

export default function ExperienceSection() {

    const { experiences } = useProfile();

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Professional Experience
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>

            {experiences.length > 0 ? (
                experiences.map((experience, index) => (
                    <ExperienceItem
                        key={index}
                        company={experience.company}
                        role={experience.role}
                        duration={formatDateRange(experience.start_date, experience.end_date)}
                        contributions={experience.contributions}
                        skills={experience.skills}
                    />
                ))
            ) : (
                <p className="text-sm text-gray-500 italic">You haven't added any professional exprience yet.</p>
            )}
        </div>
    )
}
