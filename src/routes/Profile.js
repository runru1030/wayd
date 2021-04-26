import Mess from "components/Mess";
import { authService, dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";;

export default ({ getMyProfile }) => {
    const [Profile, setProfile] = useState(() => JSON.parse(window.localStorage.getItem("ProfileObj")) || 0);
    const ProfileOrigin = JSON.parse(window.localStorage.getItem("ProfileObj")) || 0;
    const [attachment, setAttachment] = useState("");
    const [messages, setmessages] = useState([]);
    const [editing, setEditing] = useState(false);
    const [checkError, setCheckError] = useState("");
    const [dpNameCheck, setDpNameCheck] = useState(true);
    const [error, setError] = useState("");

    const instaLink = `https://www.instagram.com/${ProfileOrigin.instagramId}`;

    const history = useHistory();

    useEffect(() => {
        getMyMesses();
    }, []);

    const getMyMesses = () => {
        dbService
            .collection("Messages")
            .where("creatorId", "==", Profile.uid)
            .orderBy("createAt")
            .onSnapshot((snapshot) => {
                const mymessArr = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })); //get messages from db
                setmessages(mymessArr);
            })
    }

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        window.localStorage.removeItem("ProfileObj");
    }
    const onEditClick = () => {
        setEditing(true);
    }
    const onCancleClick = () => {
        setEditing(false);
    }

    const onChange = async (event) => {
        const { target: { name, value } } = event;

        setProfile(Profile => ({ ...Profile, [name]: value }));

        if (name == "displayName") {
            const IDcheck = await dbService
                .collection("User_Profile")
                .where("displayName", "==", value)
                .get();
            if ((IDcheck.docs.length == 0 && Profile.displayName.length > 0) || value == ProfileOrigin.displayName) {
                setCheckError("사용가능");
                setDpNameCheck(true);
            }
            else {
                if (value.length != 0) setCheckError("이미 다른 사용자가 사용 중 입니다.");
                else setCheckError("");
                setDpNameCheck(false);
            }
        }

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        const user = authService.currentUser;
        setError("");
        try {
            if (!dpNameCheck) throw new Error('Display Name을 확인해주세요.');
            if (attachment !== "") {
                const attachmentRef = storageService.ref().child(`${Profile.uid}/${uuidv4()}`);
                const response = await attachmentRef.putString(attachment, "data_url");
                attachmentURL = await response.ref.getDownloadURL();
            }
            else attachmentURL = Profile.photoURL;
            await dbService.doc(`User_Profile/${Profile.docId}`).update({
                displayName: Profile.displayName,
                name: Profile.name,
                instagramId: Profile.instagramId,
                photoURL: attachmentURL,
            });
            await user.updateProfile({
                displayName: Profile.displayName,
                photoURL: attachmentURL,
            });
            setEditing(false);
        } catch (error) {
            setError(error.message);
        }
        getMyProfile().then(() =>
            setProfile(JSON.parse(window.localStorage.getItem("ProfileObj")))
        );


    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);

    };
    return (
        <>
            <div className="Container">
                {editing ?
                    <form className="editProfileForm" onSubmit={onSubmit}>
                        <div className="centerContainer photoChange">
                            <div className="profilePhoto">
                                <img src={attachment ? attachment : (ProfileOrigin.photoURL ? ProfileOrigin.photoURL : "user.png")} />
                            </div>
                            <label for="changefile" className="file_label2">프로필 사진 바꾸기</label>
                            <input id="changefile" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                        </div>
                        <div className="centerContainer editWrapper">
                            
                        <span id="checkMess">{checkError}</span>
                            <div className="editBox">
                                <span>사용자 이름</span>
                                <input name="displayName" type="text" placeholder={ProfileOrigin.displayName} onChange={onChange} />
                            </div>

                            <div className="editBox">
                                <span>이름</span>
                                <input name="name" type="text" placeholder={ProfileOrigin.name} onChange={onChange} />
                            </div>
                            <div className="editBox">
                                <span>Instagram 아이디</span>
                                <input name="instagramId" type="text" placeholder={ProfileOrigin.instagramId} onChange={onChange} />
                            </div>
                        </div>
                        <span id="error">{error}</span>
                        <div className="centerContainer btns">
                            <button onClick={onCancleClick}>취소</button>
                            <input type="submit" value="완료" />
                        </div>

                    </form>
                    :
                    <>
                        <div className="showProfile">
                            <div className="profilePhoto">
                                <img src={ProfileOrigin.photoURL ? ProfileOrigin.photoURL : "user.png"} />
                            </div>
                            <ul>
                                <li>{ProfileOrigin.name}</li>
                                <li id="instagramId"><p>Instagram <FontAwesomeIcon icon={faInstagram} /></p> <a href={instaLink} target="_blank" >{ProfileOrigin.instagramId}</a></li>
                            </ul>
                            <button onClick={onEditClick}>프로필 수정</button>
                        </div>

                        <button id="logoutBtn" onClick={onLogOutClick}>로그아웃</button>
                        <span>{ProfileOrigin.displayName}의 작성글</span>
                        <div>
                            {messages.map((mess) => (
                                <Mess key={mess.id} messObj={mess} ProfileObj={ProfileOrigin} isOwner={mess.creatorId == ProfileOrigin.uid} />
                            )).reverse()}
                        </div>

                    </>}
            </div>

        </>
    );
};