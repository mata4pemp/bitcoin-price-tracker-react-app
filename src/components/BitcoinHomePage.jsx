import { useState, useEffect } from "react";
import { getBitcoinData } from "../../services/coingecko";

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

  //useffect allows fetching data from api, side effects tasks outside of rendering of screen
  useEffect(() => {
    const fetchBTCData = async () => {
      //getbitcoindata is a function created from coingeck.js file to pull btc data from api
      const data = await getBitcoinData();

      //update state with the actual BTC data, data.bitcoin is the actual JS object from API
      setBitcoin(data.bitcoin);
    };

    //call the function
    fetchBTCData();
    //useffect only runs one when page loads
  }, []);

  return (
    <>
      {/* Pulling the JSON properties from coingecko data, optional chaining similar to prop drilling, drill down the JSON object */}
      {/* {pulling from endpoint 1:https://docs.coingecko.com/v3.0.1/reference/coins-id-history} */}
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
