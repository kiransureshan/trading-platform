import './App.css';
import Chart from './Components/Chart';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import Portfolio from './Components/Portfolio';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

function App() {
    // const socket = new SockJS("https://heroku-trading-backend.herokuapp.com/trading-platform-stream");
    const socket = new SockJS("http://localhost:8090//trading-platform-stream");

    let stompClient = Stomp.over(socket);

    const onConnected = () => {
        console.log("Connected to Kiran's Socket!!");
    };

    const onError = (error) => {
        console.log("There was an error connecting to the websocket!!");
    }

    stompClient.connect({}, onConnected, onError);

    const updatePrimaryStream = (ticker) => {
      // validate stomp connection to send requests
      if (stompClient.connected !== true){
          return;
      }
      
      const body = {
          ticker: ticker.toUpperCase(),
          tf: 'd1'
      }

      stompClient.send("/app/candleData/barHistory", {},JSON.stringify(body));
      stompClient.send("/app/candleData/changePrimaryStream", {}, JSON.stringify(body));

      let chartEl = document.getElementById("mainChart");
      chartEl.ticker = ticker;
    }


  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/trading-platform" element={<div className="mainContent"><SideBar stompClient={stompClient} newStreamFunc = {updatePrimaryStream}/><Chart stompClient={stompClient} newStreamFunc = {updatePrimaryStream}/></div>}/>
          <Route path="/chart" element={<div className="mainContent"><SideBar stompClient={stompClient} newStreamFunc = {updatePrimaryStream}/><Chart stompClient={stompClient} newStreamFunc = {updatePrimaryStream}/></div>}/>
          <Route path="/portfolio" element={<div className="mainContent"><Portfolio/></div>}/>
        </Routes>        
      </div>    
    </BrowserRouter>

  );
}

export default App;


