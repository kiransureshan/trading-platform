import "../ComponentStyling/Header.css";
import {ReactComponent as LogoSVG} from '../Media/logo.svg';

function Header(){
    return(
        <div className="headerContainer">
            <div className="quickActionsContainer cornerContainer">
                <div className="actionWrapper">
                <LogoSVG/>
                </div>  
                <div className="actionWrapper active">
                    <div className="quickAction" >Chart</div>
                </div>
                <div className="actionWrapper">
                    <div className="quickAction">Portfolio</div>
                </div>
                <div className="actionWrapper">
                    <div className="quickAction">Watchlists</div>
                </div>
            </div>
            <div className="searchBarContainer middleContainer">
                <input autoComplete="off" placeholder="Search Ticker" className="searchBar"></input>
                <button className="searchButton">Go</button>
            </div>
            <div className="cornerContainer"></div>
        </div>
    )
}
export default Header;