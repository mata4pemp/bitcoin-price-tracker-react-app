const BASE_URL = "https://api.coingecko.com/api/v3/";

// [For Each Coin] USD + Market Cap + USD 24h Change = Endpoint 1=  https://pro-api.coingecko.com/api/v3/simple/price
// https://docs.coingecko.com/reference/simple-price

export async function getBitcoinData() {
  try {
    const res = await fetch(
      `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24h_change=true`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch coingecko data");
    }

    const data = await res.json();
    console.log("API response", data); //RMB comment this out for presentation

    return data; //return bitcoin data from coingecko as a jS object
  } catch (error) {
    console.error(error);
    throw error;
  }
}
