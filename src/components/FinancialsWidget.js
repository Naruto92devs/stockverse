import React, { useEffect, useRef, memo } from 'react';

function FinancialsWidget({ symbol = "NASDAQ:CVKD" }) {
  const containerRef = useRef();

  useEffect(() => {
    // Clean up existing widget
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      isTransparent: false,
      largeChartUrl: "",
      displayMode: "regular",
      width: "100%",
      height: "500",
      colorTheme: "light",
      symbol,
      locale: "en"
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <section className="w-full my-6">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="text-blue-600">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(FinancialsWidget);
