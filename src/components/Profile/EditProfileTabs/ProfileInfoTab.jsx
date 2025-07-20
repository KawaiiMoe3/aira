import React from 'react'

export default function ProfileInfoTab() {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Profile Info</h3>
            </div>

            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your full name'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone</label>
                    <input
                        type="number"
                        name="phone"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your phone number'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Position</label>
                    <input
                        type="text"
                        name="position"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your position'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your location (e.g. Kuala Lumpur, Malaysia)'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Linkedin</label>
                    <input
                        type="url"
                        name="linkedin"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your Linkedin link'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Github</label>
                    <input
                        type="ul"
                        name="github"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your github link'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Portfolio</label>
                    <input
                        type="url"
                        name="portfolio"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your portfolio'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Other Link</label>
                    <input
                        type="url"
                        name="other_link"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Your other link'
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 btn-primary"
                >
                    Save
                </button>
            </form>
        </div>
    )
}
