import React, { useEffect, useState} from "react";
import "./StockList.css";

const API_KEY = "80a333e46ed54ff92d0568f2";

function StockList({stocks}){
const [currentPrices, setCurrentPrices] = useState({});

useEffect(()=> {
    const fetchCurrentPrices = async ()=> {
        const prices = {};
        for (const stock of stocks){
            const response = await fetch (
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`    
            );
            const data = await response.json ();
            prices [stock.symbol]= parseFloat (
                data["Global Quote"]["05,price"]
            );
        }
        setCurrentPrices(prices);
    };
    fetchCurrentPrices();
}, [stocks]);
const calculateProfitLoss = (purchasePrice, currentPrice, quantity)=>{
    return (currentPrice - purchasePrice)*quantity;
};
return (
    <div className = "stock-list">
        <h2>Stock List</h2>
        {stocks.length === 0 ? (
            <p> No stocks added yet.</p>
        ) : (
            <ul>
                {stocks.map ((stock,index) => (
                    <li key={index}>
                        <div>
                            <strong>{stock.symbol}</strong> - {stock.quantity} shares @ $
                            {stock.price.toFixed(2)} each
                        </div>
                        <div>
                            Current Price: $
                            {currentPrices[stock.symbol]
                            ? calculateProfitLoss(
                                stock.price,
                                currentPrices [stock.symbol],
                                stock.quantity
                            ).toFixed(2)
                            : "Calculating..."}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}

export default Stocklist;
