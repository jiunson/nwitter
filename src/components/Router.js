import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoginedIn, userObj }) => {
    return (
        <Router>
            {isLoginedIn && <Navigation userObj={userObj} />}
            <div style={{
                width: "100%",
                margin: "0 autho",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
            }}>
            <Routes>
                {isLoginedIn ? ( // 로그인 상태
                    <>
                        <Route path="/" element={<Home userObj={userObj} />}></Route>
                        <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}></Route>
                        <Route path="*" element={<Navigate replcae to="/" />}></Route>
                    </>
                ) : (       // 로그아웃 상태
                    <>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="*" element={<Navigate replcae to="/" />}></Route>
                    </>
                )}
            </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;