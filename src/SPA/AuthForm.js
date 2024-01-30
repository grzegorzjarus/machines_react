import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const AuthForm = () => {
    const [loginMode, setLoginMode] = useState(true); // Default mode is login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('OWNER'); // Default role is OWNER

    const navigate = useNavigate();

    const handleModeChange = () => {
        setLoginMode(!loginMode);
        // Reset additional fields when switching between login and register
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setRole('OWNER');
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform authentication or registration logic based on form data
        if (loginMode) {
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
                    //localStorage.setItem("name", user.firstName);
                    localStorage.setItem("email", user.email);
                    console.log("Rola usera: " + user.role);
                    console.log("User from localStorage after logging: " +localStorage.getItem("user"));

                    if(localStorage.getItem("role")==="OWNER")
                    navigate("/owner/machines");
                    else navigate("/map");

                } catch (error) {
                    // Handle login errors

                    console.log("Błędny login lub hasło");
                    navigate("/");

                    console.error("Login error:", error.message);
                }
            }

         else {
            try {
                console.log(JSON.stringify({email,password,firstName,lastName,phoneNumber,companyName,role}));
                //const response = await fetch("http://localhost:8080/auth/authenticate", {
                const response = await fetch("/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //"Access-Control-Allow-Origin" : "*",
                    },
                    body: JSON.stringify({email,password,firstName,lastName,phoneNumber,companyName,role}),

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
               // localStorage.setItem("name", user.firstName);
                localStorage.setItem("email", user.email);
                console.log("Rola usera: " + user.role);
                console.log("User from localStorage after logging: " +localStorage.getItem("user"));
                navigate("/owner/machines");

            } catch (error) {
                // Handle login errors

                console.log("Błędny login lub hasło");
                navigate("/");

                console.error("Login error:", error.message);
            }
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />

                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />

                {!loginMode && (
                    <>
                        <label>
                            Name:
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </label>
                        <br/>

                        <label>
                            Surname:
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                        <br/>

                        <label>
                            Company Name:
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                        </label>
                        <br/>

                        <label>
                            Phone Number:
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </label>
                        <br/>

                        <label>
                            Role:
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="OWNER">OWNER</option>
                                <option value="RENTER">RENTER</option>
                            </select>
                        </label>
                        <br/>
                    </>
                )}

                <button type="submit">{loginMode ? 'Login' : 'Register'}</button>
            </form>

            <div>
                <label>
                    I want to:{' '}
                    <input type="checkbox" checked={loginMode} onChange={handleModeChange} />
                    {loginMode ? ' Register' : ' Log in'}
                </label>
            </div>
        </div>
    );
};

export default AuthForm;
