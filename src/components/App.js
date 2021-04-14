import React, { useEffect, useState } from 'react';

import { authService, dbService } from "fbase";
import AppRouter from './Router';

function App() {
  const [init, setinit] = useState(false);
  const [userObj, setUserObj] = useState(null);//for using anywhere define here
  const [ProfileObj, setProfileObj] = useState(null);
  const [authObj, setAuthObj] = useState({
    displayName: "",
    name: "",
    email: "",
    password: "",
    instagramId: "",
  });
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const myProfile = await dbService
          .collection("User_Profile")
          .where("email", "==", user.email)
          .get();

        if (myProfile.docs.length == 0) {

          setAuthObj({
            displayName: user.displayName,
            name: "",
            email: user.email,
            password: "",
            instagramId: "",
          });
          console.log(authObj);
          addMyProfile(authObj);
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        getMyProfile({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setinit(true);
    })

  }, []);

  const refreshUser = async () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    const myProfile = await dbService
      .collection("User_Profile")
      .where("email", "==", user.email)
      .get();
    const profileArr = myProfile.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setProfileObj(profileArr[0]);
  }
  
  const getMyProfile = async (user) => {
    const myProfile = await dbService
      .collection("User_Profile")
      .where("email", "==", user.email)
      .get();
    const profileArr = myProfile.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setProfileObj(profileArr[0]);
  }
  const addMyProfile = async (authObj) => {
    await dbService.collection("User_Profile").add(authObj);
  }
  return (
    <>
      {init ? <AppRouter isLoggedin={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} ProfileObj={ProfileObj} /> : "wait..."}
      <footer><hr/>&copy; WAYD {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
