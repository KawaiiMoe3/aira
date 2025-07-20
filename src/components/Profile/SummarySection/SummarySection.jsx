import React from 'react'

export default function SummarySection() {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Summary
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <p className="text-gray-600">I'm a dedicated Frontend Developer with expertise in React, Remix, and TypeScript, focused on crafting scalable, high-performance web applications. I specialize in creating seamless user experiences through clean, efficient, and responsive UI design. With a strong foundation in modern web technologies, I enjoy solving complex problems and building interactive digital solutions. I'm always eager to learn, innovate, and contribute to projects that make an impact.</p>
        </div>
    )
}
