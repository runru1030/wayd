import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAt } from "@fortawesome/free-solid-svg-icons";
const MessForm = ({ ProfileObj }) => {
    const [mess, setmess] = useState("");//textfield's text
    const [attachment, setAttachment] = useState("");
    const [mention, setMention] = useState("");
    const [mentionObj, setMentionObj] = useState({
        text: "",//textfield's text
        fromName: null,
        toName: null,
        type: "mention",
        messId: ""
    });

    const onSubmit = async (event) => {
        if (mess === "") return;

        event.preventDefault();
        let attachmentURL = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${ProfileObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const messObj = {
            text: mess,//textfield's text
            createAt: Date.now(),
            createAtDetail: Date(),
            creatorId: ProfileObj.uid,
            creatorEmail: ProfileObj.email,
            creatorName: ProfileObj.displayName,
            creatorPhoto: ProfileObj.photoURL,
            toName: mentionObj.toName,
            attachmentURL,
        }
        await dbService.collection("Messages").add(messObj).then(async (doc) => {
            const messID = doc.id
            if (mention && mention != ProfileObj.displayName) {
                await dbService.collection("User_Profile").where("displayName", "==", mention).get().then((get) => {
                    get.docs.map(async (userDoc) => {
                        await dbService.collection("User_Alert").doc(`${userDoc.data().uid}`).get().then((doc) => {
                            if (doc.exists) {
                                dbService.collection("User_Alert").doc(`${userDoc.data().uid}`).update({
                                    Alert: true,
                                    alertObj: [...doc.data().alertObj, { ...mentionObj, messId: messID }],
                                })
                            }
                            else {
                                dbService.collection("User_Alert").doc(`${userDoc.data().uid}`).set({
                                    Alert: true,
                                    alertObj: [{ ...mentionObj, messId: messID }],
                                });
                            }
                        })
                    })
                })

            }
        });
        setmess("");
        setAttachment("");
        setMention("");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setmess(value);

        if (value.search("@") != -1) {
            const ment = value.split(" ").filter(it => it.includes("@")).toString();
            setMention(ment.substring(ment.search("@") + 1, ment.length));
            setMentionObj({
                text: `${ProfileObj.displayName}님이 언급하셨습니다.`,
                fromName: ProfileObj.displayName,
                toName: ment.substring(ment.search("@") + 1, ment.length),
                type: "mention",

            })
        }
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
    const onClearAttachment = () => setAttachment("")
    const onMentionClick = () => {
        setmess(mess + "@");
    }

    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <form onSubmit={onSubmit} className="messForm">
            <div>
                {mention && <div className="mention"><span>To : <FontAwesomeIcon icon={faAt} id="at" /> {mention}</span></div>}
                <span onClick={onMentionClick} id="addMention"><FontAwesomeIcon icon={faAt} id="at" /></span>
                <label for="attach-file" className="file_label">
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <TextareaAutosize id="TextArea" value={mess} onChange={onChange} type="text" placeholder="What are you doing?" />
                <input id="messSubmit" type="submit" value="&#xf054;" />
            </div>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
            {attachment && <div className="attachment">
                <span id="attachmentDel" onClick={onClearAttachment}>사진 취소</span>
                <img src={attachment} width="100%" />
            </div>}
        </form>
    </>
    );
}
export default MessForm;