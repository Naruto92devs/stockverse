import React, { useEffect, useRef, memo } from 'react';

function SimpleChartWidget({ symbol = "NASDAQ:CVKD" }) {
  const containerRef = useRef();

  useEffect(() => {
    // Clear previous widget
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[`${symbol}|1D`]],
      chartOnly: false,
      width: '100%',
      height: '500',
      locale: 'en',
      colorTheme: 'light',
      autosize: false,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      maLineColor: "#2962FF",
      maLineWidth: 1,
      maLength: 9,
      lineWidth: 2,
      lineType: 0,
      dateRanges: [
        "1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"
      ]
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

export default memo(SimpleChartWidget);