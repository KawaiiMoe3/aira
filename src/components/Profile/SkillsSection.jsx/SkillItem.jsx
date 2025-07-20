export default function SkillItem({ name }) {
    return (
        <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <span className="font-medium">{name}</span>
        </div>
    );
}
  