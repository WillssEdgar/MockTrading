import axios from "axios";
import { useEffect, useState } from "react";
import finnhub, { DefaultApi } from "finnhub";

interface StockCandle {
  c: number[]; // Closing prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Opening prices
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

export default function Home() {
  const [stockCandles, setStockCandles] = useState<StockCandle[] | null>(null);
  const [companyNews, setCompanyNews] = useState<CompanyNews[] | null>(null);

  useEffect(() => {
    const apiKey = "cor7t31r01qm70u0ic70cor7t31r01qm70u0ic7g"; // Replace with your API key

    // Fetch stock candles
    axios
      .get<StockCandle[]>("https://finnhub.io/api/v1/stock/candle", {
        params: {
          symbol: "AAPL",
          resolution: "D",
          from: 1590988249,
          to: 1591852249,
          token: apiKey,
        },
      })
      .then((response) => {
        setStockCandles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stock candles:", error);
      });

    // Fetch company news
  }, []);

  return (
    <div>
      <h2>Stock Candles</h2>
      {stockCandles && (
        <ul>
          {stockCandles.map((candle, index) => (
            <li key={index}>
              {`Timestamp: ${candle.t}, Open: ${candle.o}, High: ${candle.h}, Low: ${candle.l}, Close: ${candle.c}, Volume: ${candle.v}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
