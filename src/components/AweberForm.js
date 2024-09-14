'use client';
// components/AweberForm.js
import { useEffect } from 'react';

const AweberForm = () => {
  useEffect(() => {
    // Check if the script already exists to avoid adding it multiple times
    const scriptId = 'aweber-wjs-utlz97g6k';
    if (document.getElementById(scriptId)) return;

    // Create a script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '//forms.aweber.com/form/47/954193347.js';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      if (document.getElementById(scriptId)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div className="AW-Form-954193347"></div>;
};

export default AweberForm;