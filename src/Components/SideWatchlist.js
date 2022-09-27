import '../ComponentStyling/SideWatchlist.css'

function SideWatchlist({name,tickers,id,newStreamFunc, addTickerFunc, wlId}){
    const watchListId = `watchlist${id}`;
    
    function hideBody(){
        var body = document.getElementById(watchListId);
        var button = document.getElementById(watchListId+ "Button");
        body.style.display === "none" ? body.style.display = "table" : body.style.display = "none";
        button.style.transform === "rotate(180deg)" ? button.style.transform = "" : button.style.transform = "rotate(180deg)";
    }

    const handleNewTicker = (e) => {
        // check for enter
        if (e.keyCode !== 13){
            return;
        }
        
        addTickerFunc(e.target.value,wlId);

        // clear text from input box
        e.target.value = "";
    }

    return(
        <div className='watchlistContainer'>
            <div className='watchlistContHeader'>
                <h6 className='watchlistTitle m-0'>{name}</h6>
                <button onClick={hideBody} id ={watchListId+"Button"} className='watchlistCollapse'>
                    <i className="bi bi-chevron-down"/>
                </button>
            </div>
            <table id={watchListId} style={{display:"none"}} className='watchlistTable' >
                <thead>
                    <tr className='watchlistHeader'>
                        <td className='col-12 text-center'>Ticker</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickers.map((obj,i) => {return <tr className='watchlistRow row' key = {i}>
                        <td className='col-12 text-center' onClick={() => {newStreamFunc(obj.ticker)}}>{obj.ticker}</td>
                    </tr>
                })}
                <tr className='watchlistRow row'>
                    <td className='col-12 text-center'>
                        <input onKeyDown={handleNewTicker} placeholder="Add Ticker" className="newTickerInput"></input>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SideWatchlist;