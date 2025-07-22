// Format date: Month YYYY
export function formatDateRange(startDate, endDate) {
    const options = { year: 'numeric', month: 'long' };

    const start = new Date(startDate).toLocaleDateString('en-US', options);
    
    /**
     * !isNaN(new Date(endDate).getTime()) ensures endDate is valid before formatting.
     * Falls back to 'Present' for null, undefined, empty string, or invalid dates.
     */
    let end = 'Present';
    if (endDate && !isNaN(new Date(endDate).getTime())) {
        end = new Date(endDate).toLocaleDateString('en-US', options);
    }

    return `${start} - ${end}`;
}

