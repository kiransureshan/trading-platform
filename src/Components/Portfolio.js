import "../ComponentStyling/Portfolio.css"
import {useState} from "react";

function Portfolio(){

    const [openProfit] = useState(617800);
    const [closedProfit] = useState(7800);
    // should be state
    const holdings = [
        {
            "ticker": "AAPL",
            "quantity": "-3000",
            "type": "Short",
            "averagePrice": "15.60",
            "lastPrice": "16.00",  
            "openProfit" : "1200",
            "closedProfit": "0.00"
        },
        {
            "ticker": "BNTC",
            "quantity": "0",
            "type": "Long",
            "averagePrice": "16.99",
            "lastPrice": "19.00",
            "openProfit" : "0",
            "closedProfit": "-900.00"
           
        },
        {
            "ticker": "SPY",
            "quantity": "250",
            "type": "Long",
            "averagePrice": "300.14",
            "lastPrice": "350.88",
            "openProfit" : "10569",
            "closedProfit": "100.00"
           
        },
        {
            "ticker": "GTLB",
            "quantity": "100",
            "type": "Long",
            "averagePrice": "9.10",
            "lastPrice": "9.40",
            "openProfit" : "-300",
            "closedProfit": "-800.00"            
        },
        {
            "ticker": "BABA",
            "quantity": "-150000",
            "type": "Short",
            "averagePrice": "200.60",
            "lastPrice": "195.77",
            "openProfit" : "600000",
            "closedProfit": "7561.00"            
        },
        {
            "ticker": "TWTR",
            "quantity": "0",
            "type": "Short",
            "averagePrice": "189.510",
            "lastPrice": "195.77",
            "openProfit" : "0",
            "closedProfit": "1500.89"            
        }
    ]

    return(
        <div className="porfolioContainer">
            <table className="portfolioTable">
                <thead>
                    <tr className="portfolioHeader">
                        <th><p>Symbol</p></th>
                        <th><p>Type</p></th>
                        <th><p>Quantity</p></th>
                        <th><p>Average Price</p></th>
                        <th><p>Last</p></th>
                        <th><p>Open Profit</p></th>
                        <th><p>Closed Profit</p></th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((obj,index) => {return <tr className="portfolioHoldingRow" key={index}>
                        <td>{obj.ticker}</td>
                        <td className="pill-cell"><div className={obj.type === "Long" ? "long-pill" : "short-pill"}>{obj.type}</div></td>
                        <td>{obj.quantity}</td> 
                        <td>{obj.averagePrice}</td>
                        <td>{obj.lastPrice}</td>
                        <td className={obj.openProfit >= 0 ? "positive" : "negative"}>$ {obj.openProfit}</td>
                        <td>$ {obj.closedProfit}</td>
                    </tr>})}
                    <tr className="portfolioHoldingRow profitRow">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td className={openProfit >= 0 ? "positive" : "negative"}>$ {openProfit}</td>
                        <td>$ {closedProfit}</td>
                    </tr>
                    <tr className="portfolioHoldingRow accountRow">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Account Value</td>
                        <td></td>
                        <td>$ 5700887</td>
                    </tr>
                </tbody>
            </table>




        </div>

    )
}

export default Portfolio;