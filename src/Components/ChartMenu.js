import "../ComponentStyling/ChartMenu.css";
function ChartMenu({newStreamFunc}){
    const updatePrimaryStream = (e) => {
        // check for enter
        if (e.keyCode !== 13){
            return;
        }
        
        let ticker = e.target.value;
        newStreamFunc(ticker);
    }

    return(
        <div className="chartMenuContainer">
            <input className="tickerInput" onKeyDown={updatePrimaryStream} placeholder="------"></input>
            <div className="vertSeparator"></div>
            <button className="timeframeOption current">1m</button>
            {/* <button className="timeframeOption">1H</button> */}
            {/* <button className="timeframeOption">1D</button> */}
        </div>
    )
}

export default ChartMenu;