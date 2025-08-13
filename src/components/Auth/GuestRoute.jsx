import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function GuestRoute({ children }) {
    const { user } = useAuth();

    // If logged in, redirect to home
    if (user) {
        return <Navigate to="/" replace />;
    }

    // If not logged in, show the page
    return children;
}
