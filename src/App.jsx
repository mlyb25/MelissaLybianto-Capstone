import React, { useState } from "react";
import StockForm from "./StockForm";
import StockList from "./StockList";
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
      <StockList stocks={stocks}/>
    </div>
  );
}

export default App;
