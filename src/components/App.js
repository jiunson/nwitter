import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  useEffect(() => {
    // Check LogIn
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoginedIn(true);
      } else {
        setIsLoginedIn(false);
      }
      setInit(true);
      //console.log('isLoginedIn', isLoginedIn);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoginedIn={isLoginedIn} /> : "Initializing..."}
    </>
  );
}
export default App;
