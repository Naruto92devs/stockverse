import React, { useEffect, useRef, memo } from 'react';

function Chart({ symbol }) {
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
        "support_host": "https://www.tradingview.com",
        "timezone": "exchange",
        "theme": "${theme}",
        "style": "1",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": false,
        "save_image": false,
        "studies": [
        "ROC@tv-basicstudies",
        "StochasticRSI@tv-basicstudies",
        "MASimple@tv-basicstudies"
        ],
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650"
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
<section className="w-full h-[590px] max-md:h-[475px]">
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

export default memo(Chart);