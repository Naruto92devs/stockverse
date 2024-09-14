'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AweberForm = () => {
  const router = useRouter();

  useEffect(() => {
    const scriptId = 'aweber-wjs-utlz97g6k';

    // Function to add the script
    const addScript = () => {
      // Remove existing script if any
      if (document.getElementById(scriptId)) {
        document.getElementById(scriptId).remove();
      }

      // Create a script element
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//forms.aweber.com/form/47/954193347.js';
      script.async = true;

      // Append the script to the document body
      document.body.appendChild(script);
    };

    // Run addScript on component mount
    addScript();

    // Clean up function to remove the script when the component is unmounted or on route change
    return () => {
      if (document.getElementById(scriptId)) {
        document.getElementById(scriptId).remove();
      }
    };
  }, [router.asPath]); // Effect runs on route changes

  return <div className="AW-Form-954193347"></div>;
};

export default AweberForm;