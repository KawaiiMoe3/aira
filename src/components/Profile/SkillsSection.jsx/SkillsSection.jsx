import { useProfile } from '../../../contexts/ProfileContext';
import SkillItem from './SkillItem';

export default function SkillsSection() {

    const { skills } = useProfile();

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Skills
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>

            <div className="space-y-3">
            {skills.length > 0 ? (
                skills.map((skill, index) => (
                    <SkillItem key={index} skill={skill.name} />
                ))
            ) : (
                <p className="text-sm text-gray-500 italic">You haven't added any skills yet.</p>
            )}
            </div>
        </div>
    );
}
