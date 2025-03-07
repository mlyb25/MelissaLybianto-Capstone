import React, { useEffect, useState} from "react";
import "./StockList.css";

const API_KEY = "9J0QM416ENEKRJN2";

function StockList({ stocks }) {
    const [currentPrices, setCurrentPrices] = useState({});
    const [error, setError] = useState(null);

    const fetchCurrentPrice = async (stock) => {
        try {
            if (!stock.symbol) {
                console.error("Missing stock symbol:", stock);
                return null;
            }

            const response = await fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${API_KEY}`
            );

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const timeSeries = data["Time Series (Daily)"];
            if (!timeSeries) {
                console.error("Invalid API response:", data);
                return null;
            }

            const latestDate = Object.keys(timeSeries)[0]; // Get latest available date
            const latestPrice = parseFloat(timeSeries[latestDate]["4. close"]);

            return { symbol: stock.symbol, price: latestPrice };
        } catch (err) {
            console.error("Error fetching stock price for", stock.symbol, err);
            return null;
        }
    };

    useEffect(() => {
        const fetchCurrentPrices = async () => {
            const prices = {};
            for (let i = 0; i < stocks.length; i++) {
                const stockData = await fetchCurrentPrice(stocks[i]);
                if (stockData) {
                    prices[stockData.symbol] = stockData.price;
                }
                await new Promise((resolve) => setTimeout(resolve, 12000)); // Delay to avoid rate limits
            }
            setCurrentPrices(prices);
        };

        if (stocks.length > 0) {
            fetchCurrentPrices();
        }
    }, [stocks]);

    const calculateProfitLoss = (purchasePrice, currentPrice, quantity) => {
        return (currentPrice - purchasePrice) * quantity;
    };

    return (
        <div className="stock-list">
            <h2>Stock List</h2>
            {error && <p className="error">{error}</p>}
            {stocks.length === 0 ? (
                <p>No stocks added yet.</p>
            ) : (
                <ul>
                    {stocks.map((stock, index) => {
                        const currentPrice = currentPrices[stock.symbol] || 0;
                        const profitLoss = calculateProfitLoss(stock.price || 0, currentPrice, stock.quantity || 0);
                        return (
                            <li key={index} className="stock-item">
                                <div><strong>Symbol: {stock.symbol || "Unknown"}</strong></div>
                                <div>Quantity: {stock.quantity || 0}</div>
                                <div>Purchase Price: ${Number(stock.price || 0).toFixed(2)}</div>
                                <div>Current Price: ${currentPrice ? currentPrice.toFixed(2) : "Loading..."}</div>
                                <div className={profitLoss >= 0 ? "profit" : "loss"}>
                                    Profit/Loss: {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

  
export default StockList;
