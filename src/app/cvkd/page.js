import React from 'react';

const CVKD = () => {
  return (
    <div className='w-full h-[100vh]'>
      <iframe
        src="https://cvkd.netlify.app/" // Replace with the URL you want to embed
        className='w-full h-full border-none'
        title="Embedded Website"
      />
    </div>
  );
};

export default CVKD;