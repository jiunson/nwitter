import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoginedIn, setIsLoginedIn] = useState(authService.currentUser);
  console.log("authService", authService.currentUser);
  return (
    <>
      <AppRouter isLoginedIn={isLoginedIn} />
    </>
  );
}
export default App;
