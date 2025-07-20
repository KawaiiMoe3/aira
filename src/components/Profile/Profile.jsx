import React, { useRef } from 'react'
import Navbar from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../../contexts/AuthContext';

import Header from './Header/Header';
import SummarySection from './SummarySection/SummarySection';
import ExperienceSection from './ExperienceSection/ExperienceSection';
import Certifications from './Certifications/Certifications';
import ContactSection from './ContactSection/ContactSection';
import EducationSection from './EducationSection/EducationSection';
import SkillsSection from './SkillsSection.jsx/SkillsSection';

import { FaRegEdit } from 'react-icons/fa';
import { TbCloudDownload } from "react-icons/tb";
import LanguagesSection from './LanguagesSection/LanguagesSection';
import ProjectSection from './ProjectSection/ProjectSection';
import { Link } from 'react-router-dom';


export default function Profile() {

    const { user } = useAuth();
    if (!user) return null; // Do not render until user exists

    // Print only specific area (Profile)
    const printRef = useRef(null);   
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `${user.full_name || user.username}'s Profile`,
        onAfterPrint: () => console.log('Profile Downloaded.'),
    });
    
    return (
        <>
            <Helmet>
                <title>Manage your profile</title>
            </Helmet>
            <Navbar />
            <div className="bg-slate-100 dark:bg-slate-900">
                <div className="pt-20 container">
                    <div className="mx-auto max-w-5xl px-4 pb-4 mt-8">
                        <div className='mb-4'>
                            <div className='flex gap-2'>
                                <Link to="/profile/edit-profile">
                                    <button className='btn-outline-darkmode flex items-center gap-1'>
                                        <FaRegEdit className="w-5 h-5" />
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    className='btn-primary flex items-center gap-1'
                                    onClick={handlePrint}
                                >
                                    <TbCloudDownload className="w-5 h-5" />
                                    Download
                                </button>
                            </div>
                        </div>

                        {/* Profile */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" ref={printRef}>
                            {/* Header Section */}
                            <Header user={user} />
                            
                            {/* Main Content */}
                            <div className="p-6 md:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                
                                    {/* Left Column */}
                                    <div className="col-span-2">
                                        {/* Summary */}
                                        <SummarySection />
                                        
                                        {/* Professional Experience */}
                                        <ExperienceSection />

                                        {/* Projects */}
                                        <ProjectSection />
                                            
                                        {/* Certifications */}
                                        <Certifications />
                                    </div>
                                    
                                    {/* Right Column */}
                                    <div>
                                        {/* Contact */}
                                        <ContactSection />

                                        {/* Languages */}
                                        <LanguagesSection />

                                        {/* Education */}
                                        <EducationSection />

                                        {/* Skills */}
                                        <SkillsSection />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="bg-gradient-to-r from-violet-950 to-violet-900 animate-gradient p-4 text-center text-sm text-gray-500 border-t border-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
