import '../ComponentStyling/Watchlist.css'


function Watchlist({name,tickers,id}){
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
            <table id={watchListId} className='watchlistTable'>
                <thead>
                    <tr className='watchlistHeader'>
                        <td>Ticker</td>
                        <td>Last</td>
                        <td>Daily %</td>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((obj,i) => {return <tr className='watchlistRow' key = {i}>
                        <td>{obj.ticker}</td>
                        <td>{obj.last}</td>
                        <td>{obj.dailyChangePercent}</td>
                    </tr>
                })}
                </tbody>
            </table>

        </div>
    )
}

export default Watchlist