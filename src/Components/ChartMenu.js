import "../ComponentStyling/ChartMenu.css";
function ChartMenu(currentTimeFrame, newTimeFrameFunction, newTickerFunction){
    return(
        <div className="chartMenuContainer">
            <input className="tickerInput" placeholder="------"></input>
            <div className="vertSeparator"></div>
            <button className="timeframeOption current">1m</button>
            <button className="timeframeOption">1H</button>
            <button className="timeframeOption">1D</button>
        </div>
    )
}

export default ChartMenu;