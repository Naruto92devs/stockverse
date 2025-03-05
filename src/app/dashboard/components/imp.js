"use client"; // Required for Next.js App Router

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const seriesesData = {
  "1D": [
    { time: 1642427876, open: 10, high: 10.63, low: 9.49, close: 9.55 },
    { time: 1642514276, open: 9.55, high: 10.3, low: 9.42, close: 9.94 },
    { time: 1642600676, open: 9.94, high: 10.17, low: 9.92, close: 9.78 },
  ],
  "1W": [
    { time: 1642687076, open: 9.78, high: 10.59, low: 9.18, close: 9.51 },
    { time: 1642773476, open: 9.51, high: 10.46, low: 9.1, close: 10.17 },
    { time: 1642859876, open: 10.17, high: 10.96, low: 10.16, close: 10.47 },
  ],
  "1M": [
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  ],
};

const CandlestickChart = () => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [candlestickSeries, setCandlestickSeries] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState("1D");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const newChart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { textColor: "black", background: { type: "solid", color: "white" } },
    });

    const newCandlestickSeries = newChart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    

    newCandlestickSeries.setData(seriesesData[selectedInterval]);

    setChart(newChart);
    setCandlestickSeries(newCandlestickSeries);

    const handleResize = () => {
      newChart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      newChart.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setChartInterval = (interval) => {
    if (candlestickSeries) {
      candlestickSeries.setData(seriesesData[interval]);
    }
    setSelectedInterval(interval);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {Object.keys(seriesesData).map((interval) => (
          <button
            key={interval}
            onClick={() => setChartInterval(interval)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              background: selectedInterval === interval ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {interval}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default CandlestickChart;