import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

export default function GoToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
  return (
    <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-[#8741eb] to-[#5b4be7] text-white shadow-md transition-opacity ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } hover:brightness-110`}
        aria-label="Go to top"
    >
        <FaArrowUp />
    </button>
  )
}
