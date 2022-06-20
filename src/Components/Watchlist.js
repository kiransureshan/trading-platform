import '../ComponentStyling/Watchlist.css'

function Watchlist({name,tickers}){
    return(
        <div className='watchlistContainer'>
            <h6 className='watchlistTitle'>{name}</h6>
            {tickers.map((obj) => {return <div className='watchlistRow'>
                <p className='tickerTitle'>{obj.ticker}</p>
            </div>
            })}
        </div>
    )
}

export default Watchlist