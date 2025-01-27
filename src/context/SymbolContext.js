import { createContext, useContext, useState, useEffect } from 'react';

const SymbolContext = createContext();

export const SymbolProvider = ({ children }) => {
    const [symbol, setSymbol] = useState('aapl'); // Default symbol

    return (
        <SymbolContext.Provider value={{ symbol, setSymbol }}>
            {children}
        </SymbolContext.Provider>
    );
};

export const useSymbol = () => useContext(SymbolContext);