import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import {v4 as uuidv4} from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
const MessForm=({userObj})=>{
    const [mess, setmess]=useState("");//textfield's text
    const [attachment, setAttachment]=useState("");

    const onSubmit = async (event)=>{
        if (mess === "") {
            return;
          }
        event.preventDefault();
        let attachmentURL="";
        if(attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const messObj ={
            text: mess,//textfield's text
            createAt:Date.now(),
            createAtDetail:Date(),
            creatorId: userObj.uid,
            creatorEmail: userObj.email,
            creatorName: userObj.displayName,
            creatorPhoto: userObj.photoURL,
            attachmentURL,
        }
        await dbService.collection("Messages").add(messObj);//add this doc to collection named "messages" 
        setmess(""); 
        setAttachment("");
    }
    
    
    const onChange =(event)=>{
        const {target :{value}}=event;
        setmess(value);
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
    const onClearAttachment=()=> setAttachment("")

    return( <>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/></head>

        <form onSubmit={onSubmit} class="messForm">
            <div>
                <label for="attach-file" className="file_label">
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <TextareaAutosize id="messText"value={mess} onChange={onChange} type="text" placeholder="What are you doing?"/>
                <input id="messSubmit" type="submit" value="&#xf054;"/>
                
            </div>

            <input id="attach-file"type="file" accept="image/*" onChange={onFileChange} style={{display:'none'}} />
            
            { attachment &&<div class="attachment">
                
                <span id="attachmentDel" onClick={onClearAttachment}>사진 취소</span>
                <img src={attachment} width="100%"/>
            </div>}
        </form>
        </>
    ); 
}
export default MessForm;