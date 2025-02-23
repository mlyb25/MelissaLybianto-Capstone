import React, { useState } from "react";
import StockForm from "./StockForm";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([]);

  const addStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  return (
    <div className="container">
      <h1>Finance Dashboard</h1>
      <StockForm onAddStock={addStock} />

      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.symbol} - {stock.quantity} shares @ ${stock.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
