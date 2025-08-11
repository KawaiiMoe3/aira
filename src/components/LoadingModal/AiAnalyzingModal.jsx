import React, { useEffect, useState } from "react";

export default function AiAnalyzingModal({ isOpen }) {
    const tips = [
        "Scanning keywords for ATS optimization...",
        "Polishing your work experience section...",
        "Checking grammar and formatting...",
        "Highlighting leadership achievements...",
        "Improving readability and flow...",
        "Aligning with top recruiter preferences...",
        "Boosting your skills section...",
    ];
    
    const [currentTip, setCurrentTip] = useState(tips[0]);
    
    useEffect(() => {
        if (!isOpen) return;
    
        const interval = setInterval(() => {
            setCurrentTip((prev) => {
            const currentIndex = tips.indexOf(prev);
            const nextIndex = (currentIndex + 1) % tips.length;
            return tips[nextIndex];
        });
    }, 5000); // Change tip every 5s
    
        return () => clearInterval(interval);
    }, [isOpen]);
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Glass effect modal */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-80 text-center shadow-xl border border-white/20 animate-fadeIn">
                
                {/* AI Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center animate-pulse">
                        <span className="text-white text-2xl font-bold">🤖</span>
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-white text-xl font-semibold mb-2">
                    AI is analyzing your resume...
                </h2>
                <p className="text-white/70 text-sm mb-6">
                    {currentTip}
                </p>

                {/* Loading Dots */}
                <div className="flex space-x-2 justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
            </div>
        </div>
    );
}
