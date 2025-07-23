import React from 'react'
import { useProfile } from '../../../contexts/ProfileContext'

export default function SummarySection() {

    const { info } = useProfile();

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Summary
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <p className={info?.summary ? "text-gray-600" : "text-sm text-gray-500 italic"}>
                {info?.summary || "Let people know about you."}
            </p>
        </div>
    )
}
