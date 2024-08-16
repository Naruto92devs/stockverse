// src/components/Navbar.js
const Navbar = ({ toggleTheme, currentTheme }) => {
return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
    <h1 className="text-lg font-bold">My App</h1>
    <button
        onClick={toggleTheme}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
    </button>
    </nav>
);
};

export default Navbar;
