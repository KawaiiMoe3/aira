import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { FaRegEdit } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../utils/ViteApiBaseUrl';

export default function GeneralTab() {

    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Update form data when user is loaded (after refresh)
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    // Loading spinner
    if (user === null) {
        return <div className="mx-auto w-12 h-12 rounded-full animate-spin
        border-2 border-solid border-gray-500 border-t-transparent"></div>;
    }

    // Edit or Cancel
    const toggleEdit = () => {
        if (isEditing) {
            // Reset form
            setFormData({
                username: user?.username || '',
                email: user?.email || '',
            });
            // Clear error messages
            setErrors({});
        }
        setIsEditing(prev => !prev);
    };
    
    const handleSave = async (e) => {
        e.preventDefault();
    
        try {
            // Get CSRF token
            await axios.get(`${API_BASE_URL}csrf/`);
            // Get it from cookies
            const csrfToken = Cookies.get('csrftoken');

            // Submit the update
            const response = await axios.patch(
                `${API_BASE_URL}user/update/`,
                {
                    username: formData.username,
                    email: formData.email
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
    
            // console.log('User info updated:', response.data);
            setIsEditing(false);
            setErrors({});
            setSuccessMessage(response.data.message);
            setTimeout(() => setSuccessMessage(''), 3000);

            // Update formData again with response
            setFormData({
                username: response.data.username,
                email: response.data.email
            });
            // Update Global User After Profile Edit
            setUser({
                ...user,
                username: response.data.username,
                email: response.data.email,
            });
        
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                console.error('Unexpected error:', err);
                setErrors({ general: ['Something went wrong.'] });
            }
        }
    };

    return (
        <>
            <div>
                {/* Toast */}
                {successMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm w-[300px] text-center">
                        {successMessage}
                    </div>
                </div>
                )}
                <div className='flex items-center justify-between'>
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">General Information</h3>
                    <button 
                        className='btn-outline-darkmode flex items-center gap-2'
                        onClick={toggleEdit}
                    >
                        <FaRegEdit className="w-5 h-5" />
                        {isEditing ? 'Cancel' : ('Edit')}
                    </button>
                </div>
                {/* Alert */}
                {errors.detail && (
                <div
                    className="w-full flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 mb-2 rounded"
                    role="alert"
                >
                    <span className="block sm:inline pl-2 text-sm">{errors.detail}</span>
                    <button onClick={() => setErrors({ ...errors, detail: null })}>
                        <svg
                            className="fill-current h-6 w-6"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
                )}

                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            disabled={!isEditing}
                            className={`mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 ${
                                isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                            }`}
                        />
                        {errors.username && (
                            <p className="text-red-500 mb-4 text-sm">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className={`mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 ${
                                isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 mb-4 text-sm">{errors.email}</p>
                        )}
                    </div>
                    {isEditing && (
                    <button
                            type="submit"
                            className="mt-4 btn-primary"
                        >
                            Save Changes
                    </button>
                    )}
                </form>
            </div>
        </>
    )
}
