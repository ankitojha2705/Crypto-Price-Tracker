import axios from "axios";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot&vs_currencies=usd";

export const fetchCryptoPrices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
