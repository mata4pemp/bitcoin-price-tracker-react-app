import { useState, useEffect } from "react";
import { getCoinData } from "../../services/coingecko";

//make the displayed numbers prettier, with trillion/billion text
function formatLargeNumber(num) {
  if (num >= 1_000_000_000_000)
    return (num / 1_000_000_000_000).toFixed(3) + " Trillion"; //if number is more than Trill, divide by a trill
  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(3) + " Billion"; //divide by billion
  return num.toLocaleString(); // add commas in between
}

function BitcoinHomePage() {
  const [bitcoin, setBitcoin] = useState(null);

  //useffect allows fetching data from api
  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        //call API to get bitcoin data
        const data = await getCoinData("bitcoin");
        //update state with bitcoin data
        setBitcoin(data.bitcoin);
      } catch (error) {
        console.error("Error fetching BTC data", error);
      }
    };

    //call the function
    fetchBitcoinData();
    //useffect only runs one when page loads
  }, []);

  //no data comes in cause of rate limits at least we show something
  if (!bitcoin) return <p>Please be patient, loading data...</p>;

  return (
    <>
      {/* {pulling from endpoint 1:https://docs.coingecko.com/v3.0.1/reference/coins-id-history}, localestring adds commas */}
      <h1>Bitcoin Price (USD): ${bitcoin?.usd.toLocaleString()} </h1>
      <h1>Market Cap (USD): ${formatLargeNumber(bitcoin?.usd_market_cap)}</h1>
      {/* {pulling from endpoint 1:https://docs.coingecko.com/reference/simple-price} */}
      <h1>
        Price 24H Volume Traded: $
        {formatLargeNumber(bitcoin?.usd_24h_vol?.toFixed(2))}
      </h1>
    </>
  );
}

export default BitcoinHomePage;
