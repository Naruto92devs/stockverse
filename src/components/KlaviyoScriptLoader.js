// src/components/KlaviyoScriptLoader.js
'use client'; // This makes the component a Client Component

import React, { useEffect } from 'react';
import Script from 'next/script';

const KlaviyoScriptLoader = () => {
  useEffect(() => {
    // This runs after the component is mounted
    const disableKlaviyoPopup = () => {
      if (window._learnq) {
        // Replace 'YOUR_POPUP_FORM_ID' with your actual Klaviyo popup form ID
        window._learnq.push(['disableForms', { ids: ['YOUR_POPUP_FORM_ID'] }]);
      }
    };

    // Wait for the Klaviyo script to load and then disable the popup
    disableKlaviyoPopup();
  }, []);

  return (
    <>
      {/* Klaviyo Script */}
      <Script
        async
        type="text/javascript"
        src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=SNDh4K"
        strategy="afterInteractive"
        onLoad={() => {
          if (window._learnq) {
            // Run the disable function once the script is loaded
            window._learnq.push(['disableForms', { ids: ['YOUR_POPUP_FORM_ID'] }]);
          }
        }}
      />
    </>
  );
};

export default KlaviyoScriptLoader;