"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/utils/fetchCrypto";
import { useEffect, useState } from "react";
import PriceChart from "@/app/PriceChart";
import "../styles/globals.css";

export default function Home() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
  });

  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin"); // Default selected crypto
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Fixes hydration issue
  if (isLoading) return <p>Loading live prices...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="container">
      <h1 className="title">Crypto Price Tracker</h1>

      {/* Crypto List with Prices */}
      <div className="crypto-list">
        {Object.entries(data).map(([crypto, price]) => (
          <button
            key={crypto}
            className={`crypto-btn ${selectedCrypto === crypto ? "active" : ""}`}
            onClick={() => setSelectedCrypto(crypto)}
          >
            {crypto.toUpperCase()} - ${price.usd.toFixed(2)}
          </button>
        ))}
      </div>

      {/* Refresh Button */}
      <button className="refresh-btn" onClick={() => refetch()}>
        Refresh Live Prices
      </button>

      {/* Display Historical Price Chart */}
      <PriceChart cryptoId={selectedCrypto} />
    </div>
  );
}
