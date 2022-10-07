import React, { useState } from "react";

const Auth =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const { target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form>
                <input name="email" type="text" placeholder="Email" onChange={onChange} required />
                <input name="password" type="password" placeholder="Password" onChange={onChange} required />
                <input type="submit" value="LogIn" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;