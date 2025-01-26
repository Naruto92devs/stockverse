import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LOGO_API_TOKEN = 'pk_GpgWOqB2R1qdEWrvsnD45w';
const LOGO_API_BASE = 'https://img.logo.dev';

const Logo = ({ symbol, size, alt = 'Company Logo', className = '' }) => {
    const [imgSrc, setImgSrc] = useState('');
    
    // Construct the full logo URL
    const getLogoUrl = (symbol) =>
        `${LOGO_API_BASE}/ticker/${symbol}?token=${LOGO_API_TOKEN}&retina=true`;

    // Create a fallback URL based on the first letter of the symbol
    const getFallbackUrl = (symbol) =>
        `/images/Brands/${symbol[0].toUpperCase()}.jpeg`;

    useEffect(() => {
        // Update the logo URL whenever the symbol changes
        setImgSrc(getLogoUrl(symbol));
    }, [symbol]);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={size}
            height={size}
            className={className} // Apply the passed className
            onError={() => {
                // If the logo URL fails, switch to the fallback URL
                setImgSrc(getFallbackUrl(symbol));
            }}
        />
    );
};

export default Logo;