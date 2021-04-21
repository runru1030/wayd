import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";


const Comment = ({ messObj, userObj }) => {

    const [comment, setComment] = useState("");
    const [dbComments, setDbComments] = useState(null);
    const [isComments, setIsComments] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection(`${messObj.id}`).add({
            text: comment,
            creator: {
                Id: userObj.uid,
                displayName: userObj.displayName,
                photoURL: userObj.photoURL,
                email: userObj.email,
            },
            createAt: Date.now(),
            createAtDetail: Date(),
        });
        const getCollection = await dbService.collection("User_Profile").where("displayName", "==", messObj.creatorName).get();
        getCollection.docs.map((doc) => {
            dbService.doc(`User_Profile/${doc.id}`).update({
                Alert: true,
            })
        })
        setComment("");

    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setComment(value);
    };

    useEffect(() => {
        dbService.collection(`${messObj.id}`).orderBy("createAt").onSnapshot((snapshot) => {
            const commentArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDbComments(commentArr);
        });
    }, [])

    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <Modal setIsOpenModal={setIsComments}>
            <FontAwesomeIcon id="icon" icon={faComment} id="commentIcon" />
            {isComments && <><div className="commentFac">
                {dbComments.map((comment) => <CommentForm commentObj={comment} userObj={comment.creator} messObj={messObj} />)}
                <form onSubmit={onSubmit} className="commentFacForm">
                    <TextareaAutosize id="TextArea" onChange={onChange} type="text" required />
                    <input id="commentSubmit" type="submit" value="&#xf054;" />
                </form>
            </div>
            </>}
        </Modal>

    </>
    );
}
export default Comment;

const CommentForm = ({ commentObj, userObj, messObj }) => {

    const history = useHistory();
    const onProfileClick = async () => {
        const user = authService.currentUser;
        if (user.displayName == userObj.displayName) history.push("/profile");
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
                    <img src={userObj.photoURL ? userObj.photoURL : "user.png"} />
                </div>
                <span>{userObj.displayName}</span>
            </div>
            <div id="text">{commentObj.text}</div>
            <div className="moreDiv">
                <span id="time">{commentObj.createAtDetail.split(" ").map(function (value, index) {
                    if (index == 1 || index == 2) return value + " ";
                })}
                </span>
                <span onClick={onDelClick} ><FontAwesomeIcon id="icon" icon={faTrashAlt} /></span>
            </div>
        </div>

    </>);
}
