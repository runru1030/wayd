import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";
import CommentForm from "./CommentForm";

const Comment = ({ messObj , ProfileObj}) => {

    const [comment, setComment] = useState("");
    const [dbComments, setDbComments] = useState([]);
    const [isComments, setIsComments] = useState(false);
    useEffect(() => {
        dbService.collection(`${messObj.id}`).orderBy("createAt").onSnapshot((snapshot) => {
            const commentArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDbComments(commentArr);
        });
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection(`${messObj.id}`).add({
            text: comment,
            creator: {
                Id: ProfileObj.uid,
                displayName: ProfileObj.displayName,
                photoURL: ProfileObj.photoURL,
                email: ProfileObj.email,
            },
            createAt: Date.now(),
            createAtDetail: Date(),
        });

        if(ProfileObj.uid!=messObj.creatorId){        
            await dbService.collection("User_Alert").doc(`${messObj.creatorId}`).get().then((doc)=>{
            if(doc.exists){
                dbService.collection("User_Alert").doc(`${messObj.creatorId}`).update({
                    
                        Alert: true,
                        alertObj : [...doc.data().alertObj, {
                            text: `${ProfileObj.displayName}님이 댓글을 달았습니다.`,
                            fromName: ProfileObj.displayName,
                            toName: messObj.creatorName,
                            type: "comment",
                            messId: messObj.id
                        } ],
                        
                
                })
            }
            else{
                dbService.collection("User_Alert").doc(`${messObj.creatorId}`).set({
                    Alert: true,
                    alertObj : [{
                        text:`${ProfileObj.displayName}님이 댓글을 달았습니다.`,
                        fromName: ProfileObj.displayName,
                        toName: messObj.creatorName,
                        type: "comment",
                        messId: messObj.id
                    } ],
            
            })
            }
        })}
        setComment("");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setComment(value);
    };

    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <Modal setIsOpenModal={setIsComments}>
            <FontAwesomeIcon id="icon" icon={faComment} id="commentIcon" />
            {isComments && <><div className="commentFac">
                {dbComments.map((comment) => <CommentForm commentObj={comment} ProfileObj={comment.creator} messObj={messObj} isOwner={comment.creator.Id==ProfileObj.uid}/>)}
                <form onSubmit={onSubmit} className="commentFacForm">
                    <TextareaAutosize id="TextArea" onChange={onChange} value={comment} type="text" required />
                    <input id="commentSubmit" type="submit" value="&#xf054;" />
                </form>
            </div>
            </>}
        </Modal>

    </>
    );
}
export default Comment;
