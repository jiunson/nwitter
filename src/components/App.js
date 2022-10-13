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
        // setUserObj(user); 
        // 오브젝트 너무 커서 데이터 변화 감지 오류 발생.
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        //setUserObj(null);
        setIsLoginedIn(false);
      }
      setInit(true);
      //console.log('isLoginedIn', isLoginedIn);
    });
  }, []);
  // Profile 업데이트 시 호출하여 UI정보를 갱신한다.
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoginedIn={isLoginedIn} userObj={userObj} /> : "Initializing..."}
    </>
  );
}
export default App;
