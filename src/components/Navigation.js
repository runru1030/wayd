import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import {  useState } from "react";
const Navigation = ({ ProfileObj }) => {
    const location = useLocation();
    const [alert, setAlert] = useState(false);//to show all messages in db

    dbService.collection("User_Alert").doc(`${ProfileObj.uid}`).onSnapshot((snapshot) => {
        if (snapshot.exists) {
            const bool=snapshot.data().Alert;
            setAlert(bool);
        }
    })
    return (<>
        {location.pathname == "/" ?
            <nav>
                <Link to="/alert" id="bell">{alert && <FontAwesomeIcon icon={faCircle} id="alertDot" />}<FontAwesomeIcon icon={faBell} /> </Link>
                <div className="profilePhoto">
                    <Link to="/profile"><img src={ProfileObj.photoURL ? ProfileObj.photoURL : "user.png"} /></Link>
                </div>
            </nav>
            :
            <nav>
                <Link to="/" id="back"><FontAwesomeIcon icon={faArrowLeft} /> </Link>
                <span id="name">{location.pathname == "/alert" ? "알림" : ProfileObj.displayName}</span>
            </nav>
        }
        {location.pathname == "/userProfile"&&
            <nav>
                <Link to="/" id="back"><FontAwesomeIcon icon={faArrowLeft} /> </Link>
                
            </nav>}
    </>
    );

};
export default Navigation;