import { useState } from 'react';
import '../ComponentStyling/QuickTrader.css'

function QuickerTrader(){

    const [tradeSide, setTradeSide] = useState("buy");

    function hideBody(){
        var body = document.getElementById("quickTraderBody");
        var button = document.getElementById("quickTraderCollapse");
        body.style.display === "none" ? body.style.display = "flex" : body.style.display = "none";
        button.style.transform === "rotate(180deg)" ? button.style.transform = "" : button.style.transform = "rotate(180deg)";
    }

    function toggleTradeSide(side){
        setTradeSide(side);
        var targetButton;
        var nonTargetButton;
        if (side === "buy"){
            targetButton = document.getElementById("buyButton");
            nonTargetButton = document.getElementById("sellButton");
        } else {
            targetButton = document.getElementById("sellButton");
            nonTargetButton = document.getElementById("buyButton");
        }

        targetButton.classList.add("active");
        nonTargetButton.classList.remove("active");
    }

    return(
        <div className='quickTraderContainer'>
            <div className='quickTraderContHeader'>
                <h6 className='quickTraderTitle m-0'>Quick Trader</h6>
                <button onClick={hideBody} id ={"quickTraderCollapse"} className='quickTraderCollapse'>
                    <i className="bi bi-chevron-down"/>
                </button>
            </div>
            <div id="quickTraderBody" className='quickTraderBody' style={{display:"none"}}>
                <div className='buttonCont'>
                    <button className='buy button active' id = "buyButton" onClick = {(e) => {toggleTradeSide("buy")}}>BUY</button>
                    <button className='sell button' id = "sellButton" onClick = {() => {toggleTradeSide("sell")}}>SELL</button>
                </div>
                <input type="number" min="1" max="5" className="tradeInput" id="tradeSize" placeholder='Units'></input>
                <button className="executeTrade">EXECUTE</button>
            </div>
        </div>
    )
}

export default QuickerTrader;