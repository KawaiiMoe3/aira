import React from 'react'

export default function LoadingFeedbackSkeleton() {
    return (
        <div>
            <div className="p-6 max-w-5xl mx-auto space-y-8 animate-pulse">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="w-32 h-12 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
                </div>

                {/* Title */}
                <div className="h-8 w-2/3 mx-auto bg-gray-300 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-1/3 mx-auto bg-gray-300 dark:bg-slate-700 rounded"></div>

                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 space-y-4">
                    <div className="h-6 w-1/3 bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 dark:bg-slate-700 rounded"></div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 space-y-4">
                    <div className="h-6 w-1/2 bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 dark:bg-slate-700 rounded"></div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 space-y-4">
                    <div className="h-6 w-2/3 bg-gray-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-24 w-full bg-gray-300 dark:bg-slate-700 rounded"></div>
                </div>
            </div>
        </div>
    )
}
