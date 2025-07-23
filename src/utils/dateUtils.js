// Format date for start_date and end_date to: Month YYYY - Month YYYY/Present
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

// Format single date to: Month YYYY
export function formatDateToMonthYear(date) {
    if (!date || isNaN(new Date(date).getTime())) return '';

    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
}
