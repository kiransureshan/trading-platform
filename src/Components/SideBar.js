import "../ComponentStyling/SideBar.css";
import SideWatchlist from "./SideWatchlist";
import QuickTrader from "./QuickTrader";
import { useEffect, useRef, useState } from 'react';

function SideBar({stompClient,newStreamFunc}){
const [watchlists, setWatchlists] = useState([]);
const wlRef = useRef([]);
const initialRender = useRef(false);

const fetchWatchlists = () => {
    // validate stomp connection to send requests
    if (stompClient.connected === true && !initialRender.current){
        initialRender.current = true;
        stompClient.subscribe('/stream/watchlist/getAll', handleBulkWatchlists);
        stompClient.subscribe('/stream/watchlist/updatedWatchlist', handleWatchlistUpdate);
        stompClient.send("/app/watchlist/getAll", {});
    } else if (stompClient.connected === true && initialRender.current){
        return;
    } else {
        setTimeout(() => fetchWatchlists(),5000);
    }
}

const createNewWatchlist = () => {
    // get watchlist name from input and send to backend
    let input = document.getElementById("wlInput");
    stompClient.send("/app/watchlist/add", {}, input.value);
    input.value = "";
}

const addTickerToWatchlist = (ticker, id) => {
      const body = {
          ticker: ticker,
          wlId: id
      };
    stompClient.send("/app/watchlist/addTicker", {}, JSON.stringify(body));
}

const handleWatchlistUpdate = (payload) => {
    // watchlist object
    const message = JSON.parse(payload.body);
    //check and update the watchlists
    let curr = 0;
    let wls = wlRef.current;
    let length  = wls.length;
    while (curr < length){
        let wl = wls[curr];
        if (wl.id === message.id){
            setWatchlists((prevData) => (
                [
                    ...prevData.slice(0,curr),
                    message, 
                    ...prevData.slice(curr + 1,length)
                ]
            ));
            break;
        } else {
            curr++;
        }
    }

    // add to state if new watchlist
    if (curr === length){
        setWatchlists(prevData => [...prevData,message]);
    }
}
const handleBulkWatchlists = (payload) => {
    const message = JSON.parse(payload.body);
    setWatchlists(prevData => message);
}

useEffect(() => {
    fetchWatchlists();
},[])

useEffect(() => {
    wlRef.current = watchlists; 
    console.log(wlRef.current);
}, [watchlists])



return(
    <div className="col-lg-2 col-md-3 col-12 p-0 sideBarContainer">
        <div className ="createWLCont">
            <input className="wlInput" id="wlInput"></input>
            <button className="createWLBtn" onClick ={() => createNewWatchlist()}>+</button>
        </div>
        {watchlists.map((obj, i) => {return <SideWatchlist 
        name={obj.name} 
        tickers = {obj.tickers != null ? obj.tickers : []} 
        key={i}
        id = {i}
        newStreamFunc = {newStreamFunc}
        addTickerFunc = {addTickerToWatchlist}
        wlId = {obj.id}
        />
        })}
        <QuickTrader stompClient = {stompClient}/>
    </div>
)
}

export default SideBar;