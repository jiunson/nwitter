import { async } from "@firebase/util";
import { authService } from "fbase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    // 이메일, 비밀번호로 로그인 또는 회원가입
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                // Create Account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // Login Account
                data = await signInWithEmailAndPassword(authService, email, password);
            }
        } catch(error) {
            //console.log(error);
            setError(error.message)
        }
    };
    // 토글 - 로그인,회원가입 
    const toggleAccount = () => setNewAccount((prev) => !prev);
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
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" onChange={onChange} required />
                <input name="password" type="password" placeholder="Password" onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log in" : "Create Account"}
            </span>
            <div>
                <button name="google" onClick={onSoicalClick}>Continue with Google</button>
                <button name="github" onClick={onSoicalClick}>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;