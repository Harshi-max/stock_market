import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function StockMarketApp() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    if (!ticker) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/stock/${ticker}`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch stock data. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Stock Market Dashboard</h1>
      
      <div className="flex space-x-2 mb-4">
        <input
          className="p-2 text-black border border-gray-300 rounded"
          type="text"
          placeholder="Enter stock ticker (e.g., TSLA)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
        />
        <button
          className="p-2 bg-blue-600 text-white rounded"
          onClick={fetchStockData}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Stock Data"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold">Stock: {data.ticker}</h2>
          <p className="text-lg">Price: <span className="font-bold">${data.price}</span></p>
          <p className="mt-2">Recommendation: <span className="italic">{data.recommendation}</span></p>
        </div>
      )}

      {data && (
        <div className="mt-6 w-full max-w-lg">
          <LineChart width={500} height={300} data={data.history || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#00c6ff" strokeWidth={2} />
          </LineChart>
        </div>
      )}
    </div>
  );
}
