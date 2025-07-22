import { useProfile } from "../../../contexts/ProfileContext";
import EducationItem from "./EducationItem";
import { formatDateRange } from "../../../utils/dateUtils";

export default function EducationSection() {

    const { educations } = useProfile();

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <div className="space-y-4">
            {educations.length > 0 ? (
                educations.map((edu, index) => (
                    <EducationItem 
                        key={index} 
                        date={formatDateRange(edu.start_date, edu.end_date)}
                        institution={edu.institution}
                        degree={edu.degree}
                        field_of_study={edu.field_of_study}
                        cgpa={edu.cgpa}
                    />
                ))
            ) : (
                <p className="text-sm text-gray-500 italic">No education added yet.</p>
            )}
            </div>
        </div>
    );
}
