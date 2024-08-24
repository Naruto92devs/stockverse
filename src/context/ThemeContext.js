// src/context/ThemeContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [svgColor, setSvgColor] = useState('white');
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setSvgColor(resolvedTheme === 'dark' ? 'white' : 'black');
    }, [resolvedTheme]);

    return (
        <ThemeContext.Provider value={{ svgColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);