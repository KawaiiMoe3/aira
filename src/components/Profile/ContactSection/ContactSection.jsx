import { FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { FaLink, FaGlobe } from "react-icons/fa6";
import { LuContact, LuGithub } from "react-icons/lu";
import { useProfile } from "../../../contexts/ProfileContext";
import ContactItem from "./ContactItem";

export default function ContactSection() {
    const { info } = useProfile();

    const contacts = [
        info?.location && { icon: <FaMapMarkerAlt className="text-blue-600" />, text: info.location },
        info?.linkedin && { icon: <FaLinkedin className="text-blue-600" />, text: info.linkedin },
        info?.portfolio && { icon: <FaGlobe className="text-blue-600" />, text: info.portfolio },
        info?.github && { icon: <LuGithub className="text-blue-600" />, text: info.github },
        info?.other_link && { icon: <FaLink className="text-blue-600" />, text: info.other_link },
    ].filter(Boolean);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <LuContact className="h-5 w-5 mr-2 text-blue-600" />
                Contact
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-4"></div>
            <div className="space-y-2">
            {contacts.length > 0 ? (
                <div className="space-y-2">
                    {contacts.map((item, index) => (
                        <ContactItem key={index} icon={item.icon} text={item.text} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">
                    Kindly add your contact information here.
                </p>
            )}
            </div>
        </div>
    );
}
