import { dbService, storageService } from "fbase";
import REACT, { useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

const Mess = ({ messObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newMess, setNewMess] = useState(messObj.text);
    const [attachment, setAttachment] = useState("");
    const [ProfileObj, setProfileObj] = useState(null);
    const history=useHistory();
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
    const onProfileClick =async()=>{
        
            const userProfile = await dbService
              .collection("User_Profile")
              .where("email", "==", messObj.creatorEmail)
              .get();
            const profileArr = userProfile.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
            setProfileObj(profileArr[0]);
        history.push({pathname:"/profile", 
        state:{ ProfileObj:{ProfileObj} ,isOwner:{isOwner}}}
            
        );
    }

    const toggleEditing = () => setEditing((prev) => !prev)

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
        await dbService.doc(`Messages/${messObj.id}`).update({
            text: newMess,
            attachmentURL,
        });
        setEditing(false);
        onClearAttachment();
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewMess(value);
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

    return (
        <div class="messContainer">
            <div class="messProfile">
                <div class="profilePhoto" onClick={onProfileClick}>
                    <img src={messObj.creatorPhoto ? messObj.creatorPhoto : "user.png"} />
                </div>
                <span>{messObj.creatorName}</span>
            </div>

            <div class="moreDiv">
                <span>{messObj.createAtDetail.split(" ").map(function (value, index) {
                    if (index == 1 || index == 2 || index == 4) return value + " ";
                })}
                </span>
                {isOwner && !editing && (
                    <>
                        <details>
                            <summary><FontAwesomeIcon icon={faEllipsisV} /></summary>
                            <ul>
                                <li><button id="delBtn" onClick={onDelClick}>삭제</button></li>
                                <li><button onClick={toggleEditing}>수정</button></li>
                            </ul>
                        </details>
                    </>)}
            </div>

            {editing ?
                <>
                    <form onSubmit={onSubmit} class="editForm">
                        {!messObj.attachmentURL && <label for="attach-file2" className="file_label3"><FontAwesomeIcon icon={faPlus} /></label>}
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
                        <div class="btns">
                            <button id="delBtn" onClick={onDelClick}>삭제</button>
                            <button onClick={toggleEditing}>취소</button>
                            <input type="submit" value="완료"></input>
                        </div>
                    </form>

                </>
                :
                <>
                    <div class="messContent">{messObj.text.split("\n").map((line) => {
                        return (
                            <h4>
                                {line}
                                <br />
                            </h4>
                        );
                    })}
                    </div>
                    {messObj.attachmentURL && <img src={messObj.attachmentURL} width="100%" />}

                </>
            }
        </div>
    );
}
export default Mess;
