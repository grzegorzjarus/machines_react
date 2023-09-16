import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token,setToken] = useState("");


    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log(JSON.stringify({email,password}))
            const response = await fetch("http://localhost:8080/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password}),

            });
            // console.log(response.token);
            console.log(response);
            // window.location.href = "/usersList";

            //const token = response;
            // const decoded = jwt_decode(response);
            // console.log(decoded);

            if (!response.ok) {
                // Handle login errors
                throw new Error("Login failed.");
            }
            else{
               //navigate("/")
            }

            const data = await response.json();
            console.log("Token: " + data.token);
            localStorage.setItem("currentToken", data.token);
            console.log("Token from localStorage: " + localStorage.getItem("currentToken"));
            window.location.href= "/usersList";
          //  const token = data.token;

            // Store the JWT token in cookies or local storage securely
            // For example, using the "js-cookie" library
            // Cookies.set("jwt_token", token);

            // Or store it in local storage
            // localStorage.setItem("jwt_token", token);

            // You can then redirect to the authenticated section of your app
            // window.location.href = "/dashboard";
        } catch (error) {
            // Handle login errors
            console.error("Login error:", error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
