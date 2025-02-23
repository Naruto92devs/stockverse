'use client';
import React, { useState } from 'react';
import NewsLetterPopup from "@/components/NewsLetterPopup";

const NEOV = () => {

    const [newsletter, setNewsletter] = useState(true);
    return (
        <div className='w-full h-[100vh]'>
        <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter}/>
        <iframe
            src="https://neov.netlify.app/" // Replace with the URL you want to embed
            className='w-full h-full border-none'
            title="Embedded Website"
        />
        </div>
    );
};

export default NEOV;