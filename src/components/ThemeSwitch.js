'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
const [mounted, setMounted] = useState(false)
const { setTheme, resolvedTheme } = useTheme()
const [isRotated, setIsRotated] = useState(false);

const handleClick = () => {
  setIsRotated(!isRotated); // Toggle the rotation state
};

useEffect(() => setMounted(true), [])

if (!mounted) return (
<Image className=" w-[42px] h-[42px] opacity-0"
    src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
    width={42}
    height={42}
    sizes="42x42"
    alt="Loading Light/Dark Toggle"
    priority={false}
    title="Loading Light/Dark Toggle"
/>
)

return (
<div onClick={handleClick} className={`z-50 transform transition-transform duration-400 max-lg:fixed max-lg:bottom-[12%] max-lg:right-5 ${isRotated ? 'rotate-45' : ''}`}>
    {resolvedTheme === 'dark' ? (
    <svg className="max-lg:bg-primaryColor max-lg:shadow-xl cursor-pointer w-[42px] h-[42px] rounded-full p-2 lg:hover:bg-primaryText/10"
    onClick={() => setTheme('white')}
    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" fill="white"/>
    <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" fill="white"/>
    </svg>
    ) : (
    <svg className="max-lg:bg-primaryColor max-lg:shadow-xl cursor-pointer w-[42px] h-[42px] rounded-full p-2 lg:hover:bg-primaryText/10"
    onClick={() => setTheme('dark')}
    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.53 15.93C21.37 15.66 20.92 15.24 19.8 15.44C19.18 15.55 18.55 15.6 17.92 15.57C15.59 15.47 13.48 14.4 12.01 12.75C10.71 11.3 9.90995 9.40999 9.89995 7.36999C9.89995 6.22999 10.12 5.12999 10.57 4.08999C11.01 3.07999 10.7 2.54999 10.48 2.32999C10.25 2.09999 9.70995 1.77999 8.64995 2.21999C4.55995 3.93999 2.02995 8.03999 2.32995 12.43C2.62995 16.56 5.52995 20.09 9.36995 21.42C10.29 21.74 11.26 21.93 12.26 21.97C12.42 21.98 12.58 21.99 12.74 21.99C16.09 21.99 19.23 20.41 21.21 17.72C21.88 16.79 21.7 16.2 21.53 15.93Z" fill="#292D32"/>
    </svg>
    )}
</div>
)
}
