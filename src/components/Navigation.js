import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome , faChevronLeft} from "@fortawesome/free-solid-svg-icons";
const Navigation =({userObj})=> {
    const location = useLocation();
    return(<>
        {location.pathname=="/"?        
        <nav>   
                <div class="profilePhoto">
                    <Link to="/profile"><img src={userObj.photoURL? userObj.photoURL:"user.png"}/></Link>
                </div>
        </nav>
        
        :
        <nav>
            <span>{userObj.displayName}</span>
            <Link to="/"><FontAwesomeIcon icon={faHome}/> </Link>
        </nav>
        }
    </>
    );
    
};
export default Navigation;