import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // Check LogIn
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoginedIn(true);
        setUserObj(user);
      } else {
        setIsLoginedIn(false);
      }
      setInit(true);
      //console.log('isLoginedIn', isLoginedIn);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoginedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
    </>
  );
}
export default App;
