const BASE_URL = "";

export async function getBitcoinData() {
  try {
    const res = await fetch(`${BASE_URL}/coins/bitcoin`);
    if (!res.ok) {
      throw new Error("Failed to fetch coingecko data");
    }
    return res.json(); //return bitcoin data from coingecko as a jS object
  } catch (error) {
    console.error(error);
    throw error;
  }
}
