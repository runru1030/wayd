import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
const Navigation = ({ userObj }) => {
    const location = useLocation();
    return (<>
        {location.pathname == "/" ?
            <nav>
                <Link to="/alert" id="bell"><FontAwesomeIcon icon={faBell} /> </Link>
                <div class="profilePhoto">
                    <Link to="/profile"><img src={userObj.photoURL ? userObj.photoURL : "user.png"} /></Link>
                </div>
            </nav>

            :
            <nav>
                <Link to="/" id="back"><FontAwesomeIcon icon={faArrowLeft} /> </Link>
                <span id="name">{location.pathname == "/alert" ? "알림" : userObj.displayName}</span>
            </nav>
        }
    </>
    );

};
export default Navigation;