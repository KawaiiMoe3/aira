import LanguageItem from './LanguageItem';

export default function LanguagesSection() {
    const languages = [
        { language: "English", level: "Fluent" },
        { language: "Malay", level: "Native" },
        { language: "Chinese", level: "Conversational" },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h6m-6 8l-4-4H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H8l-1 1v3z"
                />
            </svg>
                Languages
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>

            <div className="space-y-3">
                {languages.map((item, index) => (
                    <LanguageItem key={index} language={item.language} level={item.level} />
                ))}
            </div>
        </div>
    );
}
