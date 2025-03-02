import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Fetch live prices
export const fetchCryptoPrices = async () => {
  const response = await axios.get(
    `${BASE_URL}/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot&vs_currencies=usd`
  );
  return response.data;
};

// Fetch historical prices for a given cryptocurrency (7 days)
export const fetchHistoricalPrices = async (cryptoId) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=daily`
  );
  return response.data.prices; // Returns an array of timestamp-price pairs
};
