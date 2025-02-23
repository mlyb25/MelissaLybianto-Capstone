import React, { useState } from "react";
import "./StockForm.css";

function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) return;
    
    onAddStock({ symbol, quantity, price });
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form className="stock-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Stock Symbol"
          required
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
      </div>
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default StockForm;
