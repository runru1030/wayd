import React, { useEffect, useState } from 'react';

import { authService, dbService } from "fbase";
import AppRouter from './Router';

function App() {
  const [init, setinit] = useState(false);
  const [userObj, setUserObj] = useState(null);//for using anywhere define here
  const [ProfileObj, setProfileObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        //for provider user
        const myProfile = await dbService
          .collection("User_Profile")
          .where("email", "==", user.email)
          .get();
        if (myProfile.docs.length == 0) {
          await dbService.collection("User_Profile").add({
            displayName: user.displayName,
            name: "",
            email: user.email,
            password: "",
            instagramId: "",
          });
        }

        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        getMyProfile(user.email);
      }
      else setUserObj(null);

      setinit(true);
    })

  }, []);


  const getMyProfile = async (email) => {
    const myProfile = await dbService
      .collection("User_Profile")
      .where("email", "==", email)
      .get();
    const profileArr = myProfile.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setProfileObj(profileArr[0]);
  }
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

  return (
    <>
      {init ? <AppRouter isLoggedin={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} ProfileObj={ProfileObj} /> : <span>Loading..</span>}
      <footer className="centerContainer"><hr />&copy; WAYD {new Date().getFullYear()} by keeper</footer>
    </>
  );
}

export default App;
