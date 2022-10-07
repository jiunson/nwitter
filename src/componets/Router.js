import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoginedIn, setIsLoginedIn] = useState(false);
    return (
        <Router>
            <Routes>
                {isLoginedIn ? (
                    <>
                        <Route path="/" element={<Home />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Auth />}></Route>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;