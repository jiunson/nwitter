import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoginedIn }) => {
    return (
        <Router>
            {isLoginedIn && <Navigation />}
            <Routes>
                {isLoginedIn ? ( // 로그인 상태
                    <>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="*" element={<Navigate replcae to="/" />}></Route>
                    </>
                ) : (       // 로그아웃 상태
                    <>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="*" element={<Navigate replcae to="/" />}></Route>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;