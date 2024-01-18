import React from "react";
import './App.css';
import Header from "./SPA/Header";
import Footer from "./SPA/Footer";
import Content from "./SPA/Content";

import RenterMenu from "./SPA/Renter/RenterMenu";
import LoginForm from "./SPA/LoginForm";
import OwnerMenu from "./SPA/Owner/OwnerMenu";

function App() {

    let isRenter = true;

    let role = null;

     role = localStorage.getItem("role");
    console.log(role);
    console.log(role==="RENTER");
    //
    // return (
    //     <div style = {{display: 'flex', flexDirection:"column", flex:1, height:"100vh"}}>
    //         {/*<Header/>*/}
    //         <LoginForm />
    //         <div style = {{display: 'flex', flexDirection:"row", flex:1}}>
    //             {isRenter? <RenterMenu /> : <OwnerMenu/>}
    //
    //             <Content/>
    //         </div>
    //         {/*<LoginForm/>*/}
    //         <Footer/>
    //     </div>
    //
    //
    // );


    return (
        <div style = {{display: 'flex', flexDirection:"column", flex:1, height:"100vh"}}>
            <Header/>
            {/*<LoginForm />*/}
            {/*<Content/>*/}
            <div style = {{display: 'flex', flexDirection:"row", flex:1}}>
                {role==="RENTER"? <RenterMenu /> : role==="OWNER"?<OwnerMenu/>: null}

                <Content/>
            </div>
            {/*<LoginForm/>*/}

            <Footer/>
        </div>


    );

}

export default App;
