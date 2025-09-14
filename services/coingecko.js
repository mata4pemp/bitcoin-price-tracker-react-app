const BASE_URL = "https://api.coingecko.com/api/v3/";

export async function getBitcoinData() {
  try {
    const res = await fetch(
      `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch coingecko data");
    }
    return res.json(); //return bitcoin data from coingecko as a jS object
  } catch (error) {
    console.error(error);
    throw error;
  }
}
