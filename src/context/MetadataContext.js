"use client";
import { createContext, useContext, useState } from "react";

const MetadataContext = createContext();

export function MetadataProvider({ children }) {
  const [metadata, setMetadata] = useState({
    title: "Stockverse",
    description: "Discover real-time stock data, expert financial analysis, and market insights on Stockverse.",
  });

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  return useContext(MetadataContext);
}