import Mess from 'components/Mess';
import Modal2 from 'components/Modal2';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

export default ({ userObj }) => {

    const [alerts, setAlerts] = useState([]);//to show all messages in db

    useEffect(() => {
        dbService.collection("Messages").where("toName", "==", userObj.displayName).orderBy("createAt").onSnapshot((snapshot) => {
            const alertArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })); //get messages from db
            setAlerts(alertArr);//set messages to show all messages in db
            console.log(alertArr);
        })

    }, []);

    return (
        <>
            <div class="Container">

                {alerts.map((alert) => (<>
                    <div class="alertForm">
                        <span id="alerts">{alert.mentionObj.fromName}{alert.mentionObj.text}</span>
                        <Modal2>
                            <Mess key={alert.id} messObj={alert} userObj={userObj} isOwner={alert.creatorId == userObj.uid} />
                        </Modal2>

                    </div>
                </>

                )).reverse()}
            </div>
        </>
    );
}