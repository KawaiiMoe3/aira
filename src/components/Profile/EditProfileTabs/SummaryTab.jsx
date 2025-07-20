import React from 'react'

export default function SummaryTab() {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">About yourself</h3>
            </div>

            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Summary</label>
                    <textarea
                        name="bio"
                        rows="5"
                        className="mt-1 mb-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2"
                        placeholder='Let people know about you.'
                    ></textarea>
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
