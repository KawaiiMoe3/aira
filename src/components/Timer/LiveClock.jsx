import React, { useEffect, useState } from 'react'

export default function LiveClock() {

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
            const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        updateClock(); // initial call
        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer); // cleanup
    }, []);

    return (<span>{currentTime}</span>)
}
