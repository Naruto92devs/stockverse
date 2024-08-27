import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol }) {
const container = useRef();

useEffect(() => {
const updateWidget = () => {
    const theme = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();

    // Clear existing widget before appending a new one to prevent duplication
    if (container.current) {
    container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "exchange",
        "theme": "${theme}",
        "style": "0",
        "locale": "en",
        "allow_symbol_change": false,
        "calendar": false,
        "withdateranges": true,
        "allow_symbol_change": false,
        "save_image": false,
        "details": true,
        "hotlist": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
    }`;
    container.current.appendChild(script);
};

// Initialize the widget
updateWidget();

// Set up MutationObserver to detect theme changes
const observer = new MutationObserver(() => {
    updateWidget();
});

// Observe changes to the body class (or any other element where you toggle the theme)
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
});

// Cleanup observer on unmount
return () => {
    observer.disconnect();
    if (container.current) {
    container.current.innerHTML = '';
    }
};
}, [symbol]);

return (
<section className="w-full h-[500px]">
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
    <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span className="blue-text">Track all markets on TradingView</span>
        </a>
    </div>
    </div>
</section>
);
}

export default memo(TradingViewWidget);
