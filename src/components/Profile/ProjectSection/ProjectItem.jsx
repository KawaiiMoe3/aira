import React from 'react'
import { FaLink, FaGithub } from "react-icons/fa6";

export default function ProjectItem({ title, description, technologies, live_link, github_link }) {
    return (
        <div>
            <div className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">
                    {description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    <strong>Tech Stack:</strong> {technologies}
                </p>
                {live_link && (
                <p className='mt-1'>
                    <a href={live_link} target='_blank' className='flex items-center gap-1'>
                        <FaLink />
                        <span className='text-sm text-gray-700'>
                            {live_link}
                        </span>
                    </a>
                </p>
                )}
                {github_link && (
                <p className='mt-1'>
                    <a href={github_link} target='_blank' className='flex items-center gap-1'>
                        <FaGithub />
                        <span className='text-sm text-gray-700'>
                            {github_link}
                        </span>
                    </a>
                </p>
                )}
            </div>
        </div>
    )
}
