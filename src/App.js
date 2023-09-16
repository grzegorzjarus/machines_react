import React from "react";
import './App.css';
import Header from "./SPA/Header";
import Footer from "./SPA/Footer";
import Content from "./SPA/Content";

import RenterMenu from "./SPA/RenterMenu";
import LoginForm from "./SPA/LoginForm";
import OwnerMenu from "./SPA/OwnerMenu";

function App() {

    let isRenter = false;

    return (
        <div style = {{display: 'flex', flexDirection:"column", flex:1, height:"100vh"}}>
            {/*<Header/>*/}
            <LoginForm />
            <div style = {{display: 'flex', flexDirection:"row", flex:1}}>
                {isRenter? <RenterMenu /> : <OwnerMenu/>}

                <Content/>
            </div>
            {/*<LoginForm/>*/}
            <Footer/>
        </div>


    );

}

export default App;
