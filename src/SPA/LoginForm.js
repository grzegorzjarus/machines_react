import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {Logout} from './Logout'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token,setToken] = useState("");


    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            console.log(JSON.stringify({email,password}))
           //const response = await fetch("http://localhost:8080/auth/authenticate", {
            const response = await fetch("/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Origin" : "*",
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
               navigate("/")
            }

            const data = await response.json();
            console.log("Token: " + data.token);
            localStorage.setItem("currentToken", data.token);
            console.log("Token from localStorage: " + localStorage.getItem("currentToken"));
            const user = data.user;
            console.log(user);
            localStorage.setItem("user", user);
            localStorage.setItem("role", user.role);
            localStorage.setItem("name", user.firstName);
            localStorage.setItem("email", user.email);
            console.log("Rola usera: " + user.role);
            console.log("User from localStorage after logging: " +localStorage.getItem("user"));
            navigate("/owner/machines");
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

                console.log("Błędny login lub hasło");
                navigate("/");

            console.error("Login error:", error.message);
        }
    };

    function handleLogout() {
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("currentToken");
        //window.location.href= "/";
        navigate("/");
    }

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
            <button onClick={handleLogout}>Wyloguj</button>
        </div>
    );
};

export default LoginForm;
