import React, { useEffect, useState } from 'react';

import { authService, dbService } from "fbase";
import AppRouter from './Router';

function App() {
  const [init, setinit] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);//for using anywhere define here
  const [ProfileObj, setProfileObj] = useState([]);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        dbService.collection("User_Profile").where("email", "==", user.email).get().then((get) => {
          if (get.docs == "") {
            dbService.collection("User_Profile").add({
              displayName: user.displayName,
              name: "",
              email: user.email,
              password: "",
              instagramId: "",
              photoURL: user.photoURL,
              uid: user.uid
            });
          }
          else {
            get.docs.map(async (doc) => {
              if (doc.exists && doc.data().uid == "") {
                await dbService
                  .collection("User_Profile")
                  .doc(`${doc.id}`)
                  .update({
                    uid: user.uid
                  })
              }
            })
          }

        });
        getMyProfile();
        setIsLoggedin(true);
      }
      else setIsLoggedin(false);

      setinit(true);
    })

  }, []);
  const getMyProfile = async () => {
    const user = authService.currentUser;
    const arr = await dbService
      .collection("User_Profile")
      .where("email", "==", user.email)
      .get();
    arr.docs.map((doc) => {
      const get = { docId: doc.id, ...doc.data(), uid: user.uid };
      setProfileObj(get);
      window.localStorage.setItem("ProfileObj", JSON.stringify(get))
    });

  }

  return (
    <>
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" /></head>
      {init ? <AppRouter isLoggedin={isLoggedin} getMyProfile={getMyProfile} ProfileObj={ProfileObj} /> : <span>Loading..</span>}
      <footer className="centerContainer"><hr />&copy; WAYD {new Date().getFullYear()} by keeper</footer>
    </>
  );
}

export default App;
