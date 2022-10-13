import { async } from "@firebase/util";
import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth =  () => {
    // 소셜 로그인 
    const onSoicalClick = async (event) => {
        const { 
            target: { name }
        } = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
    };
    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSoicalClick}>Continue with Google</button>
                <button name="github" onClick={onSoicalClick}>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;