import { createContext, useContext, useState, useEffect } from 'react';

const SymbolContext = createContext();

export const SymbolProvider = ({ children }) => {
    const [symbol, setSymbol] = useState(null);

    return (
        <SymbolContext.Provider value={{ symbol, setSymbol }}>
            {children}
        </SymbolContext.Provider>
    );
};

export const useSymbol = () => useContext(SymbolContext);