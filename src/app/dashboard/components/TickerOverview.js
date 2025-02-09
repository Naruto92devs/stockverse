import { useTickerDetails } from "@/context/TickerDetailsContext";
import Image from "next/image";

const TickerInfo = () => {
    const { tickerDetails, loading, error } = useTickerDetails();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <div className="w-full">
            <h2>{tickerDetails?.name} ({tickerDetails?.ticker})</h2>
            <p>Price: ${tickerDetails?.closePrice}</p>
            <p>Volume: {tickerDetails?.volume}</p>
            <p>Change: {tickerDetails?.todaysChange} ({tickerDetails?.todaysChangePerc}%)</p>
            <p>Market Cap: ${tickerDetails?.market_cap.toLocaleString()}</p>
            <p>Type: {tickerDetails?.type}</p>
            <p>{tickerDetails?.description}</p>
            {/* <Image src={tickerDetails?.icon_url?apiKey=process.env.POLYGON_API_KEY} alt="Company Logo" width="50" /> */}
        </div>
    );
};

export default TickerInfo;