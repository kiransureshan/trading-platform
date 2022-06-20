import './App.css';
import Chart from './Components/Chart.js';
import Header from './Components/Header';
import SideBar from './Components/SideBar';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="mainContent">
        <SideBar/>
        <Chart/>
      </div>
    </div>
  );
}

export default App;
