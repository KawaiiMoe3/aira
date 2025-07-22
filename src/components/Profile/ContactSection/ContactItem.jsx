export default function ContactItem({ icon, text }) {
    return (
        <div className="flex items-center">
            <span className="w-5 h-5 mr-2">{icon}</span>
            <span className="text-sm">{text}</span>
        </div>
    );
}
  