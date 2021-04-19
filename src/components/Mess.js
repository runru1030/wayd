import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";

const Mess = ({ messObj, isOwner, userObj }) => {
    const [editing, setEditing] = useState(false);
    const [newMess, setNewMess] = useState(messObj.text);
    const [attachment, setAttachment] = useState("");
    const [mention, setMention] = useState(messObj.mentionObj.toName);
    const [mentionObj, setMentionObj] = useState({
        text: "",//textfield's text
        fromName: null,
        toName: null,
    });
    const [isHeart, setIsHeart] = useState(false);
    const [heartObjId, setHeartObjId] = useState("");
    const history = useHistory();

    const onDelClick = async () => {
        const ok = window.confirm("내용을 정말 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`Messages/${messObj.id}`).delete();
            await storageService.refFromURL(messObj.attachmentURL).delete();
            console.log(messObj.attachmentURL)
        }
    }
    const onDelPhotoClick = async () => {
        const ok = window.confirm("사진을 정말 삭제하시겠습니까?");
        if (ok) {
            await storageService.refFromURL(messObj.attachmentURL).delete();
            let attachmentURL = "";
            await dbService.doc(`Messages/${messObj.id}`).update({
                attachmentURL,
            });
        }
    }
    const onProfileClick = async () => {
        const user = authService.currentUser;
        if (user.uid == messObj.creatorId) history.push("/profile");
        else {
            const userProfile = await dbService
                .collection("User_Profile")
                .where("email", "==", messObj.creatorEmail)
                .get();
            const profileArr = userProfile.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            history.push({
                pathname: "/userProfile",
                state: { ProfileObj: profileArr[0], messObj: { messObj } }
            });
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev)
        setNewMess(messObj.text);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${messObj.creatorId}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        else {
            attachmentURL = messObj.attachmentURL;
        }
        if(mention&&messObj.mentionObj.toName!=mention){
            await dbService.collection(`${mention}`).add({
                alert: 1,
            })
        }
        await dbService.doc(`Messages/${messObj.id}`).update({
            text: newMess,
            toName: mentionObj.toName,
            mentionObj: mentionObj,
            attachmentURL,
        });
        
        setEditing(false);
        onClearAttachment();
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewMess(value);
        var idx = value.search("@");
        if (idx != -1) {
            const ment = value.split(" ").filter(it => it.includes("@")).toString();
            setMention(ment.substring(1, ment.length));
            setMentionObj({
                text: "님이 언급하셨습니다.",//textfield's text
                fromName: userObj.displayName,
                toName: ment.substring(1, ment.length),
            })
        }
    };
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

    const onClearAttachment = () => setAttachment("")
    const onHeartClick = async () => {
        if (isHeart) {
            dbService.doc(`${messObj.id}/${heartObjId.id}`).delete();
            await dbService.doc(`Messages/${messObj.id}`).update({
                heart: messObj.heart - 1
            });
        }
        else {
            const heartObj = {
                userId: userObj.displayName,
            }
            await dbService.collection(`${messObj.id}`).add(heartObj);//add this doc to collection named "messages" 
            await dbService.doc(`Messages/${messObj.id}`).update({
                heart: messObj.heart + 1
            });
        }

    }
    useEffect(() => {
        dbService.collection(`${messObj.id}`).where("userId", "==", userObj.displayName).onSnapshot((snapshot) => {
            const alertArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })); //get messages f/set messages to show all messages in db
            if (alertArr.length == 0) setIsHeart(false);
            else setIsHeart(true);
            if (alertArr.length == 1) setHeartObjId(alertArr[0]);
        }) //get messages from db
    }, [])
    const onMentionClick=()=>{
        setNewMess(newMess+"@");
    }
    return (
        <div className="messContainer">
            <div className="messProfile">
                <div className="profilePhoto" onClick={onProfileClick}>
                    <img src={messObj.creatorPhoto ? messObj.creatorPhoto : "user.png"} />
                </div>
                <span>{messObj.creatorName}</span>
            </div>

            <div className="moreDiv">
                <span id="time">{messObj.createAtDetail.split(" ").map(function (value, index) {
                    if (index == 1 || index == 2 || index == 4) return value + " ";
                })}
                </span>
                {isOwner && !editing && (
                    <>
                        <Modal>
                            <div className="modalChildren">
                                <button onClick={toggleEditing}>수정</button>
                                <button id="delBtn" onClick={onDelClick}>삭제</button>
                            </div>
                        </Modal>

                    </>)}
            </div>

            {editing ?
                <>
                    <form onSubmit={onSubmit} className="editForm">
                    <span onClick={onMentionClick} id="addMention"><FontAwesomeIcon icon={faAt} id="at" /></span>
                    {mention && <div className="mention"><span>To : <FontAwesomeIcon icon={faAt} id="at" /> {mention}</span></div>}
                    
                        {!messObj.attachmentURL && <label for="attach-file2" className="file_label file_label3"><FontAwesomeIcon icon={faPlus} /></label>}
                        
                        <TextareaAutosize id="messText" onChange={onChange} value={newMess} type="text" required />
                        <input id="attach-file2" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                        {messObj.attachmentURL && <div>
                            <span id="attachmentDel" onClick={onDelPhotoClick}>사진 삭제</span>
                            <img src={messObj.attachmentURL} width="100%" />
                        </div>}
                        {attachment && <div>
                            <span id="attachmentDel" onClick={onClearAttachment}>사진 취소</span>
                            <img src={attachment} width="100%" />
                        </div>}
                        <div className="btns">
                            <button id="delBtn" onClick={onDelClick}>삭제</button>
                            <button onClick={toggleEditing}>취소</button>
                            <input type="submit" value="완료"></input>
                        </div>
                    </form>

                </>
                :
                <>
                    {mention && <div className="mention"><span>To : <FontAwesomeIcon icon={faAt} id="at" /> {mention}</span></div>}
                   
                    <div className="messContent">{messObj.text.split("\n").map((line) => {
                        return (
                            <h4>
                                {line.split(" ").filter(it => !it.includes("@"))}
                                <br />
                            </h4>
                        );
                    })}
                    </div>
                    {messObj.attachmentURL && <img src={messObj.attachmentURL} className="attachment2" />}
                    <div className="heart">
                        {isHeart ? <FontAwesomeIcon id="icon" icon={faHeart} color="#a84848" onClick={onHeartClick} /> : <FontAwesomeIcon id="icon" icon={faHeart} onClick={onHeartClick} />}
                        <span>{messObj.heart}</span>
                    </div>
                </>
            }
        </div>
    );
}
export default Mess;
