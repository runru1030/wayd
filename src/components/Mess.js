import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPlus, faHeart, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";
import Comment from "./Comment";

const Mess = ({ messObj, isOwner, ProfileObj }) => {
    const [editing, setEditing] = useState(false);
    const [newMess, setNewMess] = useState(messObj.text);
    const [attachment, setAttachment] = useState("");
    const [mention, setMention] = useState(messObj.toName);
    const [mentionObj, setMentionObj] = useState({
        text: "",//textfield's text
        fromName: null,
        toName: null,
        type: "mention",
        messId: messObj.id,
    });

    const [isHeart, setIsHeart] = useState(false);
    const [heart, setHeart] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const history = useHistory();
    useEffect(() => {
        dbService.doc(`Mess_More/${messObj.id}`).onSnapshot(async (doc) => {
            if (doc.exists) {
                setHeart(doc.data().heart);
                if (doc.data().heart_ID.includes(ProfileObj.uid)) setIsHeart(true);
                else setIsHeart(false);

            } else {
                setHeart(0);
            }
        });
    }, [])
    const onDelClick = async () => {
        const ok = window.confirm("내용을 정말 삭제하시겠습니까?");
        if (ok) {
            await dbService.collection("User_Alert").get().then((get) => {
                get.docs.map((doc) => {
                    dbService.collection("User_Alert").doc(doc.id).update({
                        alertObj: doc.data().alertObj.filter((alert) => alert.messId != messObj.id)
                    })
                })
            })
            dbService.collection(`${messObj.id}`).onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    console.log(doc)
                    dbService.collection(`${messObj.id}`).doc(doc.id).delete()
                })
            })
            if(messObj.attachmentURL)await storageService.refFromURL(messObj.attachmentURL).delete();
            await dbService.doc(`Messages/${messObj.id}`).delete();
            await dbService.doc(`Mess_More/${messObj.id}`).delete();

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
                .where("uid", "==", messObj.creatorId)
                .get();
            const profileArr = userProfile.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            history.push({
                pathname: "/userProfile",
                state: { ProfileObj: profileArr[0] }
            });
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev)
        setNewMess(messObj.text);
        setMention(messObj.toName);
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

        if (mention != ProfileObj.displayName) {
            if (mention && messObj.toName != mention) {
                await dbService.collection("User_Profile").where("displayName", "==", mention).get().then((doc) => {
                    doc.docs.map(async (get) => {
                        await dbService.collection("User_Alert").doc(`${get.data().uid}`).get().then((doc) => {
                            if (doc.exists) {
                                dbService.collection("User_Alert").doc(`${get.data().uid}`).update({
                                    Alert: true,
                                    alertObj: doc.data().alertObj.map((alert) => { if ((alert.messId == messObj.id) && (alert.type == "mention")) alert = mentionObj })
                                })
                            }
                            else {
                                dbService.collection("User_Alert").doc(`${get.data().uid}`).set({
                                    Alert: true,
                                    alertObj: [mentionObj]
                                })
                            }

                        })
                    })
                })

            }
            else if (!mention) {
                await dbService.collection("User_Profile").where("displayName", "==", mention).get().then((doc) => {
                    doc.docs.map(async (doc) => {
                        await dbService.collection("User_Alert").doc(`${doc.data().uid}`).get().then((doc) => {
                            if (doc.exists) {
                                dbService.collection("User_Alert").doc(`${doc.data().uid}`).update({
                                    alertObj: doc.data().alertObj.filter((alert) => (alert.messId != messObj.id) || (alert.type != "mention"))
                                })
                            }
                        })
                    })
                })
            }
        }
        await dbService.doc(`Messages/${messObj.id}`).update({
            text: newMess,
            toName: mention,
            attachmentURL,
        });

        setEditing(false);
        onClearAttachment();
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewMess(value);
        if (value.search("@") != -1) {
            const ment = value.split(" ").filter(it => it.includes("@")).toString();
            setMention(ment.substring(ment.search("@") + 1, ment.length));
            setMentionObj({
                text: `${ProfileObj.displayName}님이 언급하셨습니다.`,
                fromName: ProfileObj.displayName,
                toName: ment.substring(ment.search("@") + 1, ment.length),
                type: "mention",
                messId: messObj.id,
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
            await dbService.doc(`Mess_More/${messObj.id}`).get().then(async (doc) => {
                await dbService.doc(`Mess_More/${messObj.id}`).update({
                    heart: doc.data().heart - 1,
                    heart_ID: doc.data().heart_ID.filter(it => it != ProfileObj.uid)
                })
            });
        }
        else {
            await dbService.doc(`Mess_More/${messObj.id}`).get().then(async (doc) => {
                if (doc.exists) {
                    await dbService.collection("Mess_More").doc(`${messObj.id}`).set({
                        heart: doc.data().heart + 1,
                        heart_ID: [...doc.data().heart_ID, ProfileObj.uid]
                    })
                } else {
                    await dbService.collection("Mess_More").doc(`${messObj.id}`).set({
                        heart: 1,
                        heart_ID: [ProfileObj.uid]
                    })
                }
            });
        }
    }

    const onMentionClick = () => {
        setNewMess(newMess + "@");
    }
    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
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
                        <Modal setIsOpenModal={setIsOpenModal}>
                            {!isOpenModal ? <FontAwesomeIcon id="modalLabel" icon={faEllipsisV} /> :

                                <div className="modalChildren">
                                    <button onClick={toggleEditing}>수정</button>
                                    <button id="delBtn" onClick={onDelClick}>삭제</button>
                                </div>
                            }
                        </Modal>
                    </>)}
            </div>

            {editing ?
                <>
                    <form onSubmit={onSubmit} className="editForm">

                        {mention && <div className="mention"><span>To : <FontAwesomeIcon icon={faAt} id="at" /> {mention}</span></div>}

                        {!messObj.attachmentURL && <div className="noneAttachClass">
                            <span onClick={onMentionClick} id="addMention"><FontAwesomeIcon icon={faAt} id="at" /></span>
                            <label for="attach-file2" className="file_label file_label3"><FontAwesomeIcon icon={faPlus} /></label></div>}

                        <TextareaAutosize id="TextArea" onChange={onChange} value={newMess} type="text" required />
                        <input id="attach-file2" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                        {messObj.attachmentURL && <div className="attachClass">
                            <span onClick={onMentionClick} id="addMention"><FontAwesomeIcon icon={faAt} id="at" /></span>
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
                        return (<h4>{line.split(`@${mention}`)}<br /></h4>);
                    })}
                    </div>
                    {messObj.attachmentURL && <img src={messObj.attachmentURL} className="attachment2" />}
                    <div className="heart">
                        {isHeart ? <FontAwesomeIcon id="icon" icon={faHeart} color="#a84848" onClick={onHeartClick} /> : <FontAwesomeIcon id="icon" icon={faHeart} onClick={onHeartClick} />}
                        <span>{heart}</span>
                    </div>
                    <Comment messObj={messObj} ProfileObj={ProfileObj} />
                </>
            }
        </div></>
    );
}
export default Mess;
