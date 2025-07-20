export default function ProjectSection() {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v2.5M3 7v10a2 2 0 002 2h6.5M19.4 15a1.6 1.6 0 01-2.8 0 1.6 1.6 0 012.8 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 18a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Project
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
    
            <div className="space-y-4">
                {/* Project items */}
                <div className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r">
                    <h3 className="text-lg font-semibold text-gray-800">AI Resume Analyzer</h3>
                    <p className="text-sm text-gray-600">
                        A web app built with React and Django that analyzes resumes using machine learning to provide feedback and suggest improvements.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        <strong>Tech Stack:</strong> React, Django, TailwindCSS, MySQL
                    </p>
                </div>
            </div>
        </div>
    );
}
  