// utils/formatNumber.js
const formatNumber = (num) => {
    const absNum = Math.abs(num); // Get absolute value to handle negative numbers
    let formatted;

    if (absNum >= 1.0e12) {
        formatted = (absNum / 1.0e12).toFixed(1) + 'T';
    } else if (absNum >= 1.0e9) {
        formatted = (absNum / 1.0e9).toFixed(1) + 'B';
    } else if (absNum >= 1.0e6) {
        formatted = (absNum / 1.0e6).toFixed(1) + 'M';
    } else if (absNum >= 1.0e3) {
        formatted = (absNum / 1.0e3).toFixed(1) + 'K';
    } else {
        formatted = absNum.toString();
    }

    // Apply original sign back
    return num < 0 ? '-' + formatted : formatted;
};

export default formatNumber;