'use client'

import { FiSun, FiMoon } from "react-icons/fi"
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
<Image className=" w-[42px] h-[42px]"
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
<div onClick={handleClick} className={`transform transition-transform duration-400 ${isRotated ? 'rotate-45' : ''}`}>
    {resolvedTheme === 'dark' ? (
    <FiSun
        className="cursor-pointer w-[42px] h-[42px] rounded-full p-2 hover:bg-primaryText/10"
        onClick={() => setTheme('white')}
    />
    ) : (
    <FiMoon
        className="cursor-pointer w-[42px] h-[42px] rounded-full p-2 hover:bg-primaryText/10"
        onClick={() => setTheme('dark')}
    />
    )}
</div>
)
}
