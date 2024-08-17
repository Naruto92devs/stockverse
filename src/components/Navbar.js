// src/components/Navbar.js
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
    <h1 className="text-lg font-bold">Stockverse</h1>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    </button>
    <ThemeSwitch/>
    </nav>
);
};

export default Navbar;
