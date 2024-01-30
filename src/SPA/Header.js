import LoginForm from "./LoginForm";
import React from "react";

const Header = () => {

    let user = localStorage.getItem("user");
    let userName = localStorage.getItem("email");

    function handleLogout() {
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("currentToken");
        window.location.href= "/";
        // navigate("/");
    }

    return (
        <div style={{
            height: "16vh",
            backgroundColor: "lightskyblue",
            color: "white",
            display: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
        }}>
            <h1 style={{textAlign: "center"}}>Machines {localStorage.getItem("role")}   </h1>

            <h2 style={{textAlign: "center"}}>Witaj {userName != null ? userName : "użytkowniku"}!</h2>
            {/*<h3>*/}
            {/*    {localStorage.getItem("currentToken") !== null ? (*/}
            {/*        <button onClick={handleLogout}>Wyloguj</button>*/}
            {/*    ) : null}*/}
            {/*</h3>*/}

            {/* Add any other header content here */}
        </div>
    );
};
export default Header;