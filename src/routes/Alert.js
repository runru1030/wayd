import Mess from 'components/Mess';
import Modal2 from 'components/Modal2';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default ({ userObj }) => {

    const [alerts, setAlerts] = useState([]);//to show all messages in db
    const location = useLocation();


    useEffect(async () => {
        dbService.collection("Messages").where("toName", "==", userObj.displayName).orderBy("createAt").onSnapshot((snapshot) => {
            const alertArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAlerts(alertArr);
        })

        const userProfile = await dbService
            .collection("User_Profile")
            .where("displayName", "==", userObj.displayName)
            .get();
        userProfile.docs.map((doc) => {
            dbService.doc(`User_Profile/${doc.id}`).update({
                Alert: false,
            })
        })


    }, []);

    return (
        <>
            <div className="Container">

                {alerts.map((alert) => (<>
                    <div className="alertForm">
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