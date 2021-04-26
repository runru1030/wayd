import { authService, dbService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const CommentForm = ({ commentObj, ProfileObj, messObj, isOwner }) => {

    const history = useHistory();
    const onProfileClick = async () => {
        const user = authService.currentUser;
        if (user.displayName == ProfileObj.displayName) history.push("/profile");
        else {
            const userProfile = await dbService
                .collection("User_Profile")
                .where("email", "==", commentObj.creator.email)
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
    const onDelClick = async () => {
        const ok = window.confirm("댓글을 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`${messObj.id}/${commentObj.id}`).delete();
        }
    }
    return (<>
        <div className="commentContainer">
            <div className=" messProfile comnentProfile">
                <div className="profilePhoto" onClick={onProfileClick}>
                    <img src={ProfileObj.photoURL ? ProfileObj.photoURL : "user.png"} />
                </div>
                <span>{ProfileObj.displayName}</span>
            </div>
            <div className="moreDiv">
                <span id="time">{commentObj.createAtDetail.split(" ").map(function (value, index) {
                    if (index == 1 || index == 2) return value + " ";
                })}
                </span>
                {isOwner&&<span onClick={onDelClick} ><FontAwesomeIcon id="icon" icon={faTrashAlt} /></span>}
            </div>
            
            <div id="text">{commentObj.text}</div>
        </div>

    </>);
}
export default CommentForm;
