import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import { useEffect, useState } from "react";
const Navigation = ({ userObj }) => {

    const location = useLocation();
    const [alert, setAlert] = useState(false);//to show all messages in db

     useEffect(() => {
 
        dbService.collection(`${userObj.displayName}`).onSnapshot((snapshot) => {
            const alertArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })); //get messages from db
            console.log(alertArr.length);//set messages to show all messages in db
            if(alertArr.length>0)setAlert(true);
            else setAlert(false)
        })
    }, []); 

    return (<>
        {location.pathname == "/" ?
            <nav>

                <Link to="/alert" id="bell">{alert&&<FontAwesomeIcon icon={faCircle} id="alerDot" />}<FontAwesomeIcon icon={faBell} /> </Link>
                <div className="profilePhoto">
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