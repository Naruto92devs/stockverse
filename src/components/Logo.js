import React, { useState } from 'react';
import Image from 'next/image';

const LOGO_API_TOKEN = 'pk_GpgWOqB2R1qdEWrvsnD45w';
const LOGO_API_BASE = 'https://img.logo.dev';

const Logo = ({ siteUrl, symbol, size = 200, alt = 'Company Logo', className = '' }) => {
    // Clean up the siteUrl by removing https://, www., or https://www.
    const cleanedDomain = siteUrl
        ? siteUrl.replace(/^(https?:\/\/)?(www\.)?/, '') // Remove the prefixes
        : '';

    // Construct the full logo URL
    const logoUrl = `${LOGO_API_BASE}/${cleanedDomain}?token=${LOGO_API_TOKEN}`;

    // Create a fallback URL based on the first letter of the symbol
    const fallbackUrl = `/images/Brands/${symbol[0].toUpperCase()}.jpeg`;

    // State to manage the image source
    const [imgSrc, setImgSrc] = useState(logoUrl);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={size}
            height={size}
            className={className} // Apply the passed className
            onError={() => {
                // If the logo URL fails, switch to the fallback URL
                setImgSrc(fallbackUrl);
            }}
        />
    );
};

export default Logo;