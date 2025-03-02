"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/utils/fetchCrypto";
import { useState } from "react";

export default function Home() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
  });
  
  const [search, setSearch] = useState("");

  const filteredData = data
    ? Object.entries(data).filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Crypto Price Tracker</h1>

      <input
        type="text"
        placeholder="Search Cryptocurrency"
        className="border p-2 rounded w-full max-w-md"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => refetch()}
      >
        Refresh Prices
      </button>

      {isLoading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error fetching data</p>}

      <div className="mt-6 w-full max-w-md">
        {filteredData.map(([name, value]) => (
          <div key={name} className="bg-white shadow-md p-4 rounded mb-4">
            <h2 className="text-xl font-semibold">{name.toUpperCase()}</h2>
            <p className="text-lg">${value.usd}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
