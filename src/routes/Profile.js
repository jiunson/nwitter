import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ refreshUser, userObj }) => {
    let natigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        // 로그아웃 
        signOut(authService).then(() => {
            natigate("/");          // 페이지 이동
        }).catch((err) => {
            console.error(err);
        });
    };
    const getMyNweets = async () => {
        console.log('uid', userObj.uid);
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt","desc"));
        const nweets = await getDocs(q);
        console.log(nweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onChange = (event) => {
        const { target: { value }} = event;
        setNewDisplayName(value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            console.log(authService.currentUser);
            // Update Profile
            updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            }).then(() => {
                console.log("Profile updated!");
                refreshUser();
            }).catch((err) => {
                console.error(err);
            });
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" autoFocus placeholder="Display name" onChange={onChange} value={newDisplayName} className="formInput" />
                <input type="submit" value="Update Profile" className="formBtn"
                style={{
                    marginTop: 10,
                }} />
            </form>
            <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
        </div>
    );
};
export default Profile;