// utils/formatNumber.js
const formatNumber = (num) => {
    if (num >= 1.0e12) {
        return (num / 1.0e12).toFixed(1) + 'T';
    } else if (num >= 1.0e9) {
        return (num / 1.0e9).toFixed(1) + 'B';
    } else if (num >= 1.0e6) {
        return (num / 1.0e6).toFixed(1) + 'M';
    } else if (num >= 1.0e3) {
        return (num / 1.0e3).toFixed(1) + 'K';
    } else {
        return num;
    }
};

export default formatNumber;