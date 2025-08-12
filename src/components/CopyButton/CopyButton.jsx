import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function CopyButton({ textToCopy }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // revert after 2s
        });
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-sm 
                        text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                        dark:hover:bg-gray-700 transition"
        >
        {copied ? (
            <>
                <FiCheck className="text-white" />
                Copied
            </>
        ) : (
            <>
                <FiCopy />
                Copy
            </>
        )}
        </button>
    );
}
