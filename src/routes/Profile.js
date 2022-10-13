import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
    let natigate = useNavigate();
    const onLogOutClick = () => {
        // 로그아웃 
        signOut(authService).then(() => {
            natigate("/");          // 페이지 이동
        }).catch((err) => {
            console.error(err);
        });
    };
    const getMyNweets = async() => {
        console.log('uid', userObj.uid);
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt","desc"));
        const nweets = await getDocs(q);
        console.log(nweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;