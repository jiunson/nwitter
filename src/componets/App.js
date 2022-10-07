import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  return (
    <>
      <AppRouter isLoginedIn={isLoginedIn} />
      <footer>&copy; {new Date().getFullYear} Nwitter</footer>
    </>
  );
}
export default App;
