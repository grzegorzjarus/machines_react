import React from 'react';

const Logout = () => {
    function handleLogout() {
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("currentToken");
        window.location.href= "/";
        // navigate("/");
    }
    return (
        <div>

        </div>
    );
};

export default Logout;