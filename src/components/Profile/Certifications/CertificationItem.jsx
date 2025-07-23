import React from 'react'

export default function CertificationItem({ title, issuer, issued_date }) {
    return (
        <div className="mb-4 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r">
            <h3 className="text-lg font-semibold text-gray-800">
                {title}
            </h3>
            <p className='text-sm text-slate-800'>{issuer}</p>
            <p className='text-sm text-gray-500'>Issued {issued_date}</p>
        </div>
    )
}
