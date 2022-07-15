import '../ComponentStyling/SideWatchlist.css'

function SideWatchlist({name,tickers,id}){
    const watchListId = `watchlist${id}`;

    function hideBody(){
        var body = document.getElementById(watchListId);
        var button = document.getElementById(watchListId+ "Button");
        body.style.display === "none" ? body.style.display = "table" : body.style.display = "none";
        button.style.transform === "rotate(180deg)" ? button.style.transform = "" : button.style.transform = "rotate(180deg)";
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
                        <td className='col-3'>Ticker</td>
                        <td className='col-3'>Last</td>
                        <td className='col-3'>Daily %</td>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((obj,i) => {return <tr className='watchlistRow' key = {i}>
                        <td className='col-3'>{obj.ticker}</td>
                        <td className='col-3'>{obj.last}</td>
                        <td className={(obj.dailyChangePercent >=0 ? "dailyChange positive" : "dailyChange negative")+"col-3"}>{obj.dailyChangePercent}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default SideWatchlist;