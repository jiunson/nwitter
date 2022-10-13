import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
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
    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" onChange={onChange} required />
                <input name="password" type="password" placeholder="Password" onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log in" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;