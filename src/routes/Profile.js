import Mess from "components/Mess";
import { authService, dbService, storageService } from "fbase";
import REACT, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";;

export default ({refreshUser, userObj, ProfileObj})=>{
    const [Profile, setProfile]=useState(ProfileObj);
    const [attachment, setAttachment]=useState("");
    const [messages, setmessages]=useState([]);
    const [editing, setEditing]=useState(false);
    const [isOwner, setIsOwner]=useState(false);
    const instaLink=`https://www.instagram.com/${ProfileObj.instagramId}`;
    const history=useHistory();
  
    const ownerCheck=()=>{
        const user = authService.currentUser;
        if(user.uid==userObj.uid)setIsOwner(true);
        else setIsOwner(false);
    }
    const onLogOutClick=()=> {
        authService.signOut();
        history.push("/");
    }
    const onEditClick=()=> {
        setEditing(true);
    }
    const onCancleClick=()=> {
        setEditing(false);
    }
    useEffect(()=>{
        getMyMesses();
        ownerCheck();
    }, []);
    const getMyMesses = async () => {
        const messes = await dbService
          .collection("Messages")
          .where("creatorEmail", "==", ProfileObj.email)
          .orderBy("createAt")
          .get();
        console.log(messes)
        const messesArr=messes.docs.map((doc)=>({
            id :doc.id,
            ...doc.data()
        }));
        
        setmessages(messesArr);
        console.log(messesArr);
    }


    const onChange =(event)=>{
        const {target :{ name, value}}=event;
        
       setProfile(Profile=>({...Profile, [name]:value}));
        
    }
    
    const onSubmit= async(event)=>{
        event.preventDefault();
        let attachmentURL="";
        console.log(attachment);
        if(attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        else{
            attachmentURL=Profile.photoURL;
        }
        await dbService.doc(`User_Profile/${Profile.id}`).update({
            displayName: Profile.displayName,
            name: Profile.name,
            instagramId : Profile.instagramId,
        }); 
       
        await userObj.updateProfile({
            displayName:Profile.displayName,
            photoURL:attachmentURL,
        });
        refreshUser();
        setEditing(false);
    }
    const onFileChange=(event)=>{
        const {target: {files}}= event;
        const theFile =files[0];
        const reader = new FileReader();
        reader.onloadend=(finishedEvent)=>{
            const {currentTarget:{result}}=finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    
    };
    return(
        <>
        <div class="Container">

            {editing?            
            <form class="editProfileForm" onSubmit={onSubmit}>
                <div class="photoChange">
                    <div class="profilePhoto">
                        <img src={attachment? attachment: (userObj.photoURL? userObj.photoURL:"user.png")}/>    
                    </div>
                    <label for="changefile" class="file_label2">프로필 사진 바꾸기</label>
                    <input id="changefile"type="file" accept="image/*" onChange={onFileChange}style={{display:'none'}} />
                </div>
                <div class="editWrapper">
                    <div class="editBox">
                        <span>사용자 이름</span>
                        <input name="displayName" type="text" placeholder={ProfileObj.displayName} onChange={onChange}/>
                    </div>
                    <div class="editBox">
                        <span>이름</span>
                        <input name="name" type="text" placeholder={ProfileObj.name} onChange={onChange}/>
                    </div>
                    <div class="editBox">
                        <span>Instagram 아이디</span>
                        <input name="instagramId" type="text" placeholder={ProfileObj.instagramId}  onChange={onChange}/>
                    </div>
                </div>
                <div class="btns">
                    <button onClick={onCancleClick}>취소</button>
                    <input type="submit" value="완료"/>
                </div>
  
            </form>
            :
            <>
                <div class="showProfile">
                    <div class="profilePhoto">
                        <img src={userObj.photoURL? userObj.photoURL:"user.png"}/>
                    </div>
                    <ul>
                        <li>{ProfileObj.name}</li>
                        <li id="instagramId"><p>Instagram <FontAwesomeIcon icon={faInstagram}/></p> <a href={instaLink} target="_blank" >{ProfileObj.instagramId}</a></li>
                    </ul>
                    {isOwner&&<button onClick={onEditClick}>프로필 수정</button>}
                </div>
                <span>{ProfileObj.displayName}의 작성글</span>
                <div>
                    {messages.map((mess) => (
                        <Mess key={mess.id} messObj={mess} useState={userObj} isOwner={mess.creatorId==userObj.uid}/>
                    )).reverse()}
                </div>
                {isOwner&&<button id="logoutBtn"onClick={onLogOutClick}>로그아웃</button>}
            </>}

            

        </div>

    </>
    );
};