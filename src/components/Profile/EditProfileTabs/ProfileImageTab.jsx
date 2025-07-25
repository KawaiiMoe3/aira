import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/ViteApiBaseUrl';
import guest from '../../../assets/guest.png'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useProfile } from '../../../contexts/ProfileContext';

export default function ProfileImageTab() {

    const { setProfileImage } = useProfile();

    const fileInputRef = useRef();
    const [image, setImage] = useState(null); // File object
    const [previewUrl, setPreviewUrl] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSize = 1 * 1024 * 1024; // 1MB

    // Fetch current image on mount
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}edit-profile/profile-image/`, {
                    withCredentials: true
                });
                setCurrentImageUrl(res.data.profile_image); // preload from DB
                setPreviewUrl(res.data.profile_image);       // set as preview
            } catch (err) {
                console.error('Failed to fetch profile image:', err);
            }
        };
        fetchProfileImage();
    }, []);
    
    // Preview new file before upload
    useEffect(() => {
        if (!image) return;

        const preview = URL.createObjectURL(image);
        setPreviewUrl(preview);

        return () => URL.revokeObjectURL(preview);
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        if (file.size > maxSize) {
            setErrorMessage('Image must be less than 1MB.');
            return;
        }
    
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage('Only PNG, JPG, JPEG, and GIF formats are allowed.');
            return;
        }
    
        setErrorMessage('');
        setSuccessMessage('');
        setImage(file);
    }; 

    const handleUpload = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setLoading(true);

        if (!image) {
            setErrorMessage('Please select an image to upload.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('profile_image', image);

        try {
            // Get CSRF token
            const csrfRes = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
            const csrfToken = csrfRes.data.csrfToken;

            const response = await axios.post(
                `${API_BASE_URL}edit-profile/profile-image/`,
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,
                }
            );

            const newImageUrl = response.data.profile_image;
            setSuccessMessage(response.data.message || 'Profile picture updated!');
            setImage(null); // Clear file input
            setCurrentImageUrl(newImageUrl);
            setPreviewUrl(newImageUrl); // Show updated image
            setProfileImage(newImageUrl); // update global context
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Upload error:', error);
            setErrorMessage('Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setPreviewUrl(null); // Keep `currentImageUrl` if don't want to clear it
        setErrorMessage('');
        setSuccessMessage('');
    };

    const openFilePicker = () => fileInputRef.current.click();

    return (
        <div>
            <div className="max-w-md mx-auto p-4 bg-white dark:bg-slate-900 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">Profile Image</h2>
                <p className='mb-2 dark:text-white'>
                    An image helps people recognize you and lets you know when you're signed in to your account.
                </p>

                <form onSubmit={handleUpload}>
                    <div className="flex flex-col items-center space-y-4 p-6 rounded-xl">
                        {/* Image Circle */}
                        <div
                            onClick={openFilePicker}
                            className="w-36 h-36 rounded-full overflow-hidden border-4 border-violet-500 bg-violet-900 cursor-pointer"
                        >
                            <img
                                src={previewUrl || guest}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* File Input (hidden) */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="profile_image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={openFilePicker}
                                className="flex items-center btn-outline-darkmode"
                            >
                                <FaRegEdit className='w-5 h-5 mr-1' />
                                Change
                            </button>
                            <button
                                onClick={handleRemove}
                                className="flex items-center btn-outline-darkmode"
                            >
                                <FaRegTrashAlt className='w-5 h-5 mr-1' />
                                Remove
                            </button>
                        </div>

                        {/* Upload Confirm Button */}
                        {image && (
                            <button
                                type="submit"
                                className="mt-4 px-6 py-2 btn-primary-w-full"
                            >
                                {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                </div>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        )}
                    </div>
                </form>
                {/* Toast */}
                {successMessage && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm w-[300px] text-center">
                            {successMessage}
                        </div>
                    </div>
                )}
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
                )}
            </div>
        </div>
    )
}
