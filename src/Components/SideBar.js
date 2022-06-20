import "../ComponentStyling/SideBar.css";
import Watchlist from "./Watchlist";

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
    }
]

return(
<div className="col-md-2 p-0 sideBarContainer">
    {watchlists.map((obj, i) => {return<Watchlist 
    name={obj.name} 
    tickers = {obj.tickers} 
    key={i}
    />
    })}
</div>
)
}

export default SideBar;