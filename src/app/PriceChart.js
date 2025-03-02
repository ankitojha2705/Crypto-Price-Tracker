"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalPrices } from "@/utils/fetchCrypto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function PriceChart({ cryptoId }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalPrices", cryptoId],
    queryFn: () => fetchHistoricalPrices(cryptoId),
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevents hydration mismatch
  if (isLoading) return <p className="loading-text">Loading chart...</p>;
  if (error) return <p className="error-text">Error fetching chart data</p>;

  // Extracting dates and prices from API data
  const labels = data.map((entry) => new Date(entry[0]).toLocaleDateString());
  const prices = data.map((entry) => entry[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${cryptoId.toUpperCase()} Price (USD)`,
        data: prices,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={chartData} />
    </div>
  );
}
