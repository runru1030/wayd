import Mess from "components/Mess";
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";;

export default ({ProfileObj }) => {
    const [Profile, setProfile] = useState([]);
    const [messages, setmessages] = useState([]);
    const [instaLink, setinstaLink] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if(window.performance.navigation.type==1){
            history.push("/")
        }
        else{
            const getProfile = location.state.ProfileObj;
            setProfile(getProfile);
            setinstaLink(`https://www.instagram.com/${getProfile.instagramId}`)
            getMesses(getProfile);
        }
      

    }, []);
    const getMesses = async (Profile) => {
        const messes = await dbService
            .collection("Messages")
            .where("creatorId", "==", Profile.uid)
            .orderBy("createAt")
            .get();
        const messesArr = messes.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setmessages(messesArr);
    }
    return (
        <>
            <div className="Container">
                
            <span id="userProfileName">{Profile.displayName}</span>
                <div className="showProfile">
                    <div className="profilePhoto">
                        <img src={Profile.photoURL ? Profile.photoURL : "user.png"} />
                    </div>
                    <ul>
                        <li>{Profile.name}</li>
                        <li id="instagramId"><p>Instagram <FontAwesomeIcon icon={faInstagram} /></p> <a href={instaLink} target="_blank" >{Profile.instagramId}</a></li>
                    </ul>
                </div>
                <span>{Profile.displayName}의 작성글</span>
                <div>
                    {messages.map((mess) => (
                        <Mess key={mess.id} messObj={mess} ProfileObj={ProfileObj} isOwner={false} />
                    )).reverse()}
                </div>

            </div>

        </>
    );
};