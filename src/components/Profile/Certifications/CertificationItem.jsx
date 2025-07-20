import React from 'react'

export default function CertificationItem({ title }) {
    return (
        <div className="mb-4 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r">
            <h3 className="text-lg font-semibold text-gray-800">
                {title}
            </h3>
        </div>
    )
}
