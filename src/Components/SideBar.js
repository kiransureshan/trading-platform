import "../ComponentStyling/SideBar.css";
import SideWatchlist from "./SideWatchlist";

function SideBar(){
const watchlists = [
    {
        "name":"Watchlist 1",
        "tickers":[
            {
            "ticker": "AAPL",
            "last" : "125.93",
            "dailyChangePercent": "0.61"
            },
            {
                "ticker": "MSFT",
                "last" : "567,11",
                "dailyChangePercent": "2.14"
            },
            {
                "ticker": "SKKR",
                "last" : "5.32",
                "dailyChangePercent": "155.50"
            },
                {
                "ticker": "NFLX",
                "last" : "1001.50",
                "dailyChangePercent": "-0.11"
            },
                {
                "ticker": "TSLA",
                "last" : "3789.22",
                "dailyChangePercent": "-0.01"
            }
        ]
    },
    {
        "name":"Watchlist 2",
        "tickers":[
            {
            "ticker": "AAPL",
            "last" : "125.93",
            "dailyChangePercent": "0.61"
            },
            {
                "ticker": "MSFT",
                "last" : "567,11",
                "dailyChangePercent": "2.14"
            },
            {
                "ticker": "SKKR",
                "last" : "5.32",
                "dailyChangePercent": "155.50"
            },
                {
                "ticker": "NFLX",
                "last" : "1001.50",
                "dailyChangePercent": "-0.11"
            },
                {
                "ticker": "TSLA",
                "last" : "3789.22",
                "dailyChangePercent": "-0.01"
            }
        ]
    }
]
return(
    <div className="col-lg-2 col-md-3 col-12 p-0 sideBarContainer">
        {watchlists.map((obj, i) => {return <SideWatchlist 
        name={obj.name} 
        tickers = {obj.tickers} 
        key={i}
        id = {i}
        />
        })}
    </div>
)
}

export default SideBar;