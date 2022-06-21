import "../ComponentStyling/ChartMenu.css";
function ChartMenu(){
    return(
        <div className="chartMenuContainer">
            <input className="tickerInput" placeholder="----"/>
            <div className="vertSeparator"></div>
            <button className="timeframeOption">1m<div></div></button>
            <button className="timeframeOption">5m<div></div></button>
            <button className="timeframeOption">15m<div></div></button>
            <button className="timeframeOption">1H<div></div></button>
            <button className="timeframeOption">4H<div></div></button>
            <button className="timeframeOption current">1D<div></div></button>
            <button className="timeframeOption">1W<div></div></button>
            <button className="timeframeOption">1M<div></div></button>            
        </div>
    )
}

export default ChartMenu;