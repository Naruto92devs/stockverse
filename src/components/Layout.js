'use client';

// src/components/Layout.js
import { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Ensure the path is correct
import "../app/globals.css"; // Import the global CSS

const Layout = ({ children }) => {
const [theme, setTheme] = useState(() => {
return localStorage.getItem("theme") || "light";
});

useEffect(() => {
document.body.classList.remove("light", "dark");
document.body.classList.add(theme);
localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
};

return (
<>
    <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
    <main>{children}</main>
</>
);
};

export default Layout;