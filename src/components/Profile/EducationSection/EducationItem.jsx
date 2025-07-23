export default function EducationItem({ date, institution, degree, field_of_study, cgpa }) {
    return (
        <div className="relative pl-6 border-l-2 border-blue-200">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-semibold text-blue-600">{date}</p>
                <h3 className="font-semibold">{institution}</h3>
                <p className="text-sm text-gray-900">{degree} - {field_of_study}</p>
                <p className="text-sm text-gray-600">CGPA: {cgpa}</p>
            </div>
        </div>
    );
}
  