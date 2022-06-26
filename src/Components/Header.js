import "../ComponentStyling/Header.css";
import {ReactComponent as LogoSVG} from '../Media/logo.svg';
import {NavLink} from "react-router-dom";

function Header(){
    return(
        <div className="headerContainer">
            <div className="quickActionsContainer">
                <LogoSVG/>
                <NavLink className={({isActive}) => isActive ? "quickAction active" : "quickAction"}  to="/chart">Chart</NavLink>
                <NavLink className={({isActive}) => isActive ? "quickAction active" : "quickAction"} to="/portfolio">Portfolio</NavLink>
            </div>
        </div>
    )
}
export default Header;