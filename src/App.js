import './App.css';
import Chart from './Components/Chart';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import Portfolio from './Components/Portfolio';
import Account from './Components/Account';
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/trading-platform" element={<div className="mainContent"><SideBar/><Chart/></div>}/>
          <Route path="/chart" element={<div className="mainContent"><SideBar/><Chart/></div>}/>
          <Route path="/account" element={<div className="mainContent"><Account/></div>}/>
          <Route path="/portfolio" element={<div className="mainContent"><Portfolio/></div>}/>
        </Routes>        
      </div>    
    </BrowserRouter>

  );
}

export default App;


