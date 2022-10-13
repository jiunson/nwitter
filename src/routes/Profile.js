import React from "react";
import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";

const Profile = () => {
    let natigate = useNavigate();
    const onLogOutClick = () => {
        // 로그아웃 
        signOut(authService).then(() => {
            natigate("/");          // 페이지 이동
        }).catch((err) => {
            console.error(err);
        });
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;