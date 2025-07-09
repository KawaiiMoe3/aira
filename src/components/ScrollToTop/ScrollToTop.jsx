import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * ---------------------
 * This component listens for route changes using `useLocation` and 
 * automatically scrolls the window to the top of the page on each navigation.
*/
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
