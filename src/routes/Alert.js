import Mess from 'components/Mess';
import Modal2 from 'components/Modal2';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
export default () => {
    const Profile = JSON.parse(window.localStorage.getItem("ProfileObj")) || 0;
    const [messObj, setMessObj] = useState([]);
    useEffect(() => {
        dbService.collection("User_Alert").doc(`${Profile.uid}`).get().then(async (doc) => {
            if (doc.exists) {
                dbService.collection("User_Alert").doc(`${Profile.uid}`).update({
                    Alert: false,
                })
                await doc.data().alertObj.map(async (it) => {
                    await dbService.collection("Messages").doc(`${it.messId}`).get().then(
                        (doc) => {
                            const id = doc.id;
                            setMessObj((messObj) => [...messObj, { alertObj: it, messObj: { ...doc.data(), id: id } }])
                        }
                    )
                })
            }

        });
    }, []);

    console.log(messObj)
    return (
        <>
            <div className="Container">
                {messObj.map((it) =>
                (<>
                    <div className="centerContainer alertForm">
                        <span id="alerts">{it.alertObj.text}</span>
                        <Modal2>
                            <Mess key={it.messObj.id} messObj={it.messObj} ProfileObj={Profile} isOwner={it.messObj.creatorId == Profile.uid} />
                        </Modal2>
                    </div>
                </>)
                ).reverse()}
            </div>
        </>
    );
}