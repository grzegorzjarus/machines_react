import React from 'react';
import LoginForm from "./LoginForm";
import RenterMenu from "./Renter/RenterMenu";
import OwnerMenu from "./Owner/OwnerMenu";
import Content from "./Content";
import Footer from "./Footer";

const MainView = () => {

    let role = localStorage.getItem("role");
    console.log(role);
    console.log(role==="RENTER");


    return (
        <div style = {{display: 'flex', flexDirection:"column", flex:1, height:"100vh"}}>
            {/*<Header/>*/}
            {/*<LoginForm />*/}
            <div style = {{display: 'flex', flexDirection:"row", flex:1}}>
                {role==="RENTER"? <RenterMenu /> : <OwnerMenu/>}

                <Content/>
            </div>
            <Footer/>
        </div>


    );

};

export default MainView;