import { useState, useEffect } from "react";
import { getBitcoinData } from "../../services/coingecko";

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
      <h1>Bitcoin Price: ${bitcoin?.market_data?.current_price?.usd} </h1>
      <h1>Market Cap (USD): ${bitcoin?.market_data?.market_cap?.usd}</h1>
      {/* {pulling from endpoint 1:https://docs.coingecko.com/reference/simple-price} */}
      <h1>Price 24H Change: ${bitcoin?.usd_24h_change?.toFixed(2)}%</h1>
    </>
  );
}

export default BitcoinHomePage;
