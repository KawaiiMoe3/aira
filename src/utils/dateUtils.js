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

// Format date = H:M DD-MM-YYYY (Day)
export function formatDate(dateString) {
    const rawDate = new Date(dateString);

    const hours = rawDate.getHours().toString().padStart(2, '0');
    const minutes = rawDate.getMinutes().toString().padStart(2, '0');
    const day = rawDate.getDate().toString().padStart(2, '0');
    const month = (rawDate.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const year = rawDate.getFullYear();

    const dayName = rawDate.toLocaleDateString('en-US', { weekday: 'long' });

    return `${hours}:${minutes} ${day}-${month}-${year} (${dayName})`;
}
