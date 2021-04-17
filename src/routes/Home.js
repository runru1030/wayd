import Mess from "components/Mess";
import MessForm from "components/MessForm";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {

    const [messages, setmessages] = useState([]);//to show all messages in db

    useEffect(() => {
        dbService.collection("Messages").orderBy("createAt").onSnapshot((snapshot) => {
            const messArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })); //get messages from db
            setmessages(messArr);//set messages to show all messages in db
        })
    }, []);



    return (
        <div class="Container">
            <img id="logo" name="home" src="logo.png" width="150px" />
            <MessForm userObj={userObj} />
            <div class="messCotainer1">
                {messages.map((mess) => (
                    <Mess key={mess.id} messObj={mess} userObj={userObj} isOwner={mess.creatorId == userObj.uid} />
                )).reverse()}
            </div>
        </div>
    );
};
export default Home;