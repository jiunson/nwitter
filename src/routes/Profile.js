import React from "react";
import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    let natigate = useNavigate();
    const onLogOutClick = () => {
        signOut(authService);   // 로그아웃
        natigate("/");          // URL 변경
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;