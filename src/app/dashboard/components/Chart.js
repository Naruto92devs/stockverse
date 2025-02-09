import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const StockCandlestickChart = ({ symbol, timeframe }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const end_date = new Date();
        let start_date = new Date();
        let range = 'day'

        if (timeframe === '1D') {
          start_date.setDate(end_date.getDate() - 1);
          range = 'minute'; // Use minute-level data for 1D
        } else if (timeframe === '5D') {
          start_date.setDate(end_date.getDate() - 5);
          range = 'hour'; // Use hourly data for 5D
        } else if (timeframe === '6M') {
          start_date.setMonth(end_date.getMonth() - 6);
          range = 'week'; // Use daily data for 6M
        } else if (timeframe === '1Y') {
          start_date.setFullYear(end_date.getFullYear() - 1);
          range = 'week'; // Use daily data for 1Y
        } else if (timeframe === '5Y') {
          start_date.setFullYear(end_date.getFullYear() - 5);
          range = 'month'; // Use weekly data for 5Y
        } else {
          start_date = new Date('1985-01-01');
          range = 'year'; // Use monthly data for ALL
        }

        const start_date_str = start_date.toISOString().split('T')[0];
        const end_date_str = end_date.toISOString().split('T')[0];

        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/${range}/${start_date_str}/${end_date_str}?sort=asc&limit=5000&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;
        
        const response = await axios.get(apiUrl);
        const data = response.data.results;

        if (data) {
          const formattedData = [['Date', 'Low', 'Open', 'Close', 'High']];
          data.forEach(d => {
            formattedData.push([
              new Date(d.t).toLocaleDateString(),
              d.l, // Low
              d.o, // Open
              d.c, // Close
              d.h, // High
            ]);
          });
          setChartData(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [symbol, timeframe]);

  return (
    <div className='w-full'>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Chart
          width={'80%'}
          // width={`max(100%, ${chartData.length * 20}px)`} // Dynamically set the width based on the number of candles
          height={'300px'}
          chartType="CandlestickChart"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            selectionMode: 'multiple',
            title: `Stock Prices for ${symbol}`,
            legend: 'none',
            tooltip: { isHtml: true, trigger: 'both' }, // Show tooltip on hover & focus
            crosshair: {
              trigger: 'both', // Shows tooltip when aligned along Y-axis
              orientation: 'vertical', // Ensures vertical hover effect
              color: '#aaa', // Crosshair color
              opacity: 0.5, // Slight transparency
            },
            bar: { groupWidth: '90%' }, // Remove space between bars.
            candlestick: {
              fallingColor: { strokeWidth: 0, fill: '#24AD19' }, // Green
              risingColor: { strokeWidth: 0, fill: '#FF0004' }, // Red
            },
            // explorer: {
            //   actions: ['scrollToZoom', 'rightClickToReset'], // Enable zooming
            //   axis: 'vertical', // Allow zooming on x-axis
            //   keepInBounds: true, // Prevent scrolling out of bounds
            //   maxZoomIn: 0.2, // Prevent excessive zooming in
            //   maxZoomOut: 1, // Prevent excessive zooming out
            // },
            hAxis: {
              format: 'MM dd', // Show abbreviated month and day
              slantedText: false,
            },
            backgroundColor: {
              fill: 'transparent', // Makes the background transparent
            },
            chartArea: {
              left: 50, // Remove padding on the left
              top: 10, // Remove padding on the top
              right: 0, // Add some padding on the right
              bottom: 10, // Remove padding on the bottom
              width: '100%', // Take full width
              height: '100%', // Take full height
            },
          }}
        />
      )}
    </div>
  );
};

export default function Home({ ticker }) {
  const [timeframe, setTimeframe] = useState('1D');

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>Stock Chart for {ticker}</h1>
      <div className='flex gap-4'>
        {['1D', '5D', '6M', '1Y', '5Y', 'ALL'].map(tf => (
          <button className='text-base font-sansMedium px-4 py-1 bg-primaryMain rounded-lg text-white' key={tf} onClick={() => setTimeframe(tf)}>{tf}</button>
        ))}
      </div>
      <StockCandlestickChart symbol={ticker} timeframe={timeframe} />
    </div>
  );
}