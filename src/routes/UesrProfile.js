import Mess from "components/Mess";
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";;

export default () => {
    const [Profile, setProfile] = useState([]);
    const [messages, setmessages] = useState([]);
    const [instaLink, setinstaLink] = useState("");
    const [photo, setPhoto] = useState("");

    const location = useLocation();

    useEffect(() => {
        const getProfile = location.state.ProfileObj.ProfileObj;
        const photoURL = location.state.messObj.messObj.creatorPhoto;

        setPhoto(photoURL);
        setProfile(getProfile);
        setinstaLink(`https://www.instagram.com/${getProfile.instagramId}`)
        getMesses(getProfile);

    }, []);
    const getMesses = async (Profile) => {

        const messes = await dbService
            .collection("Messages")
            .where("creatorEmail", "==", Profile.email)
            .orderBy("createAt")
            .get();
        console.log(messes)
        const messesArr = messes.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setmessages(messesArr);
        console.log(messesArr);
    }
    return (
        <>
            <div className="Container">
                <div className="showProfile">
                    <div className="profilePhoto">
                        <img src={photo ? photo : "user.png"} />
                    </div>
                    <ul>
                        <li>{Profile.name}</li>
                        <li id="instagramId"><p>Instagram <FontAwesomeIcon icon={faInstagram} /></p> <a href={instaLink} target="_blank" >{Profile.instagramId}</a></li>
                    </ul>
                </div>
                <span>{Profile.displayName}의 작성글</span>
                <div>
                    {messages.map((mess) => (
                        <Mess key={mess.id} messObj={mess} isOwner="false" />
                    )).reverse()}
                </div>

            </div>

        </>
    );
};