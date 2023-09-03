import React from "react";
import './App.css';
import Header from "./SPA/Header";
import Footer from "./SPA/Footer";
import Content from "./SPA/Content";

import SideMenu from "./SPA/SideMenu";
import LoginForm from "./SPA/LoginForm";

function App() {

    return (
        <div style = {{display: 'flex', flexDirection:"column", flex:1, height:"100vh"}}>
            {/*<Header/>*/}
            <LoginForm />
            <div style = {{display: 'flex', flexDirection:"row", flex:1}}>
                <SideMenu/>
                <Content/>
            </div>
            {/*<LoginForm/>*/}
            <Footer/>
        </div>


    );

}

export default App;
