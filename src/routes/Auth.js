import React, { useState } from "react";
import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button name="google" onClick={onSoicalClick} className="authBtn">
                    Continue with Google  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="github" onClick={onSoicalClick} className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;