import React from 'react'
import { FiPhone } from "react-icons/fi";
import { useAuth } from '../../../contexts/AuthContext';
import { useProfile } from '../../../contexts/ProfileContext';

export default function UserInfo() {

    const { user } = useAuth();
    const { info } = useProfile();

    return (
        <div className="md:w-3/4 text-center md:text-left md:pl-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{info?.full_name || 'Your full name'}</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-4">{info?.position || 'Your position'}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{user?.email}</span>
                </div>
                
                <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1">
                    <FiPhone className='w-4 h-4 mr-2' />
                    <span className="text-sm">{info?.phone || 'Your phone number'}</span>
                </div>
            </div>
        </div>
    )
}
