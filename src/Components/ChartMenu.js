import "../ComponentStyling/ChartMenu.css";
function ChartMenu(currentTimeFrame, newTimeFrameFunction, newTickerFunction){
    return(
        <div className="chartMenuContainer">
            <input className="tickerInput" placeholder="----"/>
            <div className="vertSeparator"></div>
            <button className="timeframeOption">1m</button>
            <button className="timeframeOption">5m</button>
            <button className="timeframeOption">15m</button>
            <button className="timeframeOption">1H</button>
            <button className="timeframeOption">4H</button>
            <button className="timeframeOption current">1D</button>
            <button className="timeframeOption">1W</button>
            <button className="timeframeOption">1M</button>            
        </div>
    )
}

export default ChartMenu;