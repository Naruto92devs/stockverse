import React, { useEffect, useRef, memo } from 'react';

function Technical_Analysis({ symbol }) {
const container = useRef();

useEffect(() => {
const updateWidget = () => {
    const theme = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();

    // Clear existing widget before appending a new one to prevent duplication
    if (container.current) {
    container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
        "interval": "1D",
        "width": "100%",
        "isTransparent": false,
        "height": "100%",
        "symbol": "${symbol}",
        "showIntervalTabs": true,
        "displayMode": "multiple",
        "locale": "en",
        "colorTheme": "${theme}",
        "largeChartUrl": "https://stockverse.com/stocks/${symbol}"
    }`;
    container.current.appendChild(script);
};

// Initialize the widget
updateWidget();

// Set up MutationObserver to detect theme changes
const observer = new MutationObserver(() => {
    updateWidget();
});

// Observe changes to the body className (or any other element where you toggle the theme)
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
<section className="w-full h-[500px] max-2xl:h-[900px] max-lg:h-[1150px]">
    <div className="tradingview-widget-container " ref={container} style={{ height: "100%", width: "100%" }}>
    <div className="tradingview-widget-container__widget " style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    <div className="tradingview-widget-copyright opacity-0">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span className="blue-text">Track all markets on TradingView</span>
        </a>
    </div>
    </div>
</section>
);
}

export default memo(Technical_Analysis);
