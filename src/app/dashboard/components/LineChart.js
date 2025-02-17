"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode, LineStyle } from "lightweight-charts";
import Loading from "@/loaders&errors_UI/loading";

export default function LineChart({ loading, data, fullScreen, selectedInterval }) {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [lineSeries, setLineSeries] = useState(null);

  // Convert API response to required chart format
  const formatDataForChart = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((point) => ({
      time: Math.floor(point.t / 1000), // Convert ms to seconds
      value: point.c, // Using closing price for line chart
    }));
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const newChart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      grid: {
        vertLines: { color: "#e0e0e0", style: 3 },
        horzLines: { color: "#e0e0e0", style: 3 },
      },
    });

    const newLineSeries = newChart.addAreaSeries({
      lineColor: "#634FF7",
      lineWidth: 2,
      topColor: "rgba(99, 79, 247, 0.4)",
      bottomColor: "rgba(99, 79, 247, 0.1)",
    });

    newChart.applyOptions({
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { width: 8, color: "#C3BCDB44", style: LineStyle.Solid, labelBackgroundColor: "#9B7DFF" },
        horzLine: { color: "#9B7DFF", labelBackgroundColor: "#9B7DFF" },
      },
    });

    // newChart.timeScale().fitContent();
    setChart(newChart);
    setLineSeries(newLineSeries);

    // Resize observer to adjust chart size dynamically
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        newChart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
        // newChart.timeScale().fitContent();
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      newChart.remove();
    };
  }, [chartContainerRef, fullScreen, selectedInterval]);

  useEffect(() => {
    if (chart && lineSeries && data) {
      const formattedData = formatDataForChart(data);
      lineSeries.setData(formattedData);
      chart.timeScale().scrollToRealTime();
    }
  }, [data, selectedInterval, chart, lineSeries]);

  return (
    <div className="relative w-full min-h-[490px] flex-grow flex flex-col items-start overflow-hidden">
      <div ref={chartContainerRef} className="w-full flex-grow" />
      {loading && (
        <div className="absolute z-[5] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}