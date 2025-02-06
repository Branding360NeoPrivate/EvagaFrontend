export function formatDate(isoDateString, format = "YYYY-MM-DD") {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const formats = {
        "YYYY-MM-DD": `${year}-${month}-${day}`,
        "DD/MM/YYYY": `${day}/${month}/${year}`,
        "MM/DD/YYYY": `${month}/${day}/${year}`,
        "DD Month YYYY": `${day} ${date.toLocaleString('default', { month: 'long' })} ${year}`,
    };

    return formats[format] || formats["YYYY-MM-DD"];
}