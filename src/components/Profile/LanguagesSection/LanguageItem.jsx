export default function LanguageItem({ language, proficiency }) {
    return (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <span className="font-medium">{language}</span>
            <span className="text-sm text-gray-600">{proficiency}</span>
        </div>
    );
}
  