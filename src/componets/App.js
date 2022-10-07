import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  return (
    <AppRouter isLoginedIn={isLoginedIn} />
  );
}
export default App;
