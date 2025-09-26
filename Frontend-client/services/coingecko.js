// [For Each Coin] USD + Market Cap + USD 24h Change = Endpoint 1=  https://pro-api.coingecko.com/api/v3/simple/price
// https://docs.coingecko.com/reference/simple-price

// i need to change this to localhost: 30000/

// function to get data for a coin using the proxy server
export const getCoinData = async (coinId = "Bitcoin") => {
  try {
    const res = await fetch(`http://localhost:3001/api/coins/${coinId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw error;
  }
};

// function to search for coins using proxy server
export const searchCoins = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/coins/api/search/coins?query=${query}`
    );
    return await res.json();
  } catch (error) {
    console.error("Error searching coins:", error);
    throw error;
  }
};

//function to pull coin name for form validation through proxy
export const searchCoinsFormValidation = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/search/validate-coins`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching coins:", error);
    throw error;
  }
};

//function to add coin coin to watchlist through proxy
export const addCoinToWatchlist = async (coinData) => {
  try {
    const res = await fetch("http://localhost:3001/api/watchlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coinData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// IGNORE: PREVIOUS code to get BTC data from coingecko API
// export async function getBitcoinData() {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24h_change=true`
//     );
//     if (!res.ok) {
//       throw new Error("Failed to fetch coingecko data");
//     }

//     const data = await res.json();
//     console.log("API response", data); //RMB comment this out for presentation

//     return data; //return bitcoin data from coingecko as a jS object
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
