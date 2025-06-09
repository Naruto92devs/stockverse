import React, { useEffect, useRef, memo } from 'react';

function SymbolInfoWidget({ symbol = "NASDAQ:CVKD" }) {
  const containerRef = useRef();

  useEffect(() => {
    // Cleanup any existing widget content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      locale: 'en',
      colorTheme: 'light',
      isTransparent: false,
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <section className="w-full my-4">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </section>
  );
}

export default memo(SymbolInfoWidget);
