import React from 'react';
import {Route, Routes} from "react-router-dom";
import FetchFromLeaflets from "../Components/FetchFromLeaflets";
import Order from "./Order";
import Map from "./Map";

import 'leaflet/dist/leaflet.css';

import './content.css';
import Header from "./Header";
import List from "./List";
import UserList from "./UserList";
import Machines from "./Owner/Machines";
import AddMachine from "./Owner/AddMachine";
import PhotoForm from "./Owner/PhotoForm";
import CreateOffer from "./Owner/CreateOffer";
import Geocoding from "./Owner/Geocoding";
import MyMap from "./Owner/MyMap";
import LoginForm from "./LoginForm";
import MainView from "./MainView";
import Logout from "./Owner/Logout";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";
//import {List} from "antd";

const Content = () => {
    //const startDate= '2024-05-30';
    const startDate= new Date().getDate();
    const endDate= new Date().getDate();
    // console.log("Content date: " +date);
    return (
        <div style={{width:'100%', height:'100%'}}>
            <Routes>
                {/*<Route path="/" element = {<LoginForm/>}></Route>*/}
                <Route path="/" element = {<AuthForm/>}></Route>
                <Route path="/main" element = {<MainView/>}></Route>
                <Route path="/map" element = {<Map startDate={startDate} endDate={endDate}/>}></Route>
                <Route path="/list" element = {<List startDate={startDate} endDate={endDate}/>}></Route>
                {/*<Route path="//owner/addOffer" element = {<Geocoding/>}></Route>*/}
                <Route path="/owner/addOffer" element = {<MyMap/>}></Route>
                <Route path="/usersList" element = {<UserList/>}></Route>
                <Route path="/owner/machines" element = {<Machines/>}></Route>
                <Route path="/owner/machines/addMachine" element = {<AddMachine/>}></Route>
                <Route path="/signout" element = {<Logout/>}></Route>

                {/*<Route path={`/owner/offer/create/*`} element = {<CreateOffer/>}></Route>*/}
                {/*<Route path={`/owner/offer/create/${machineId}`} element = {<CreateOffer machineId={machineId}/>}></Route>*/}
                <Route path={`/owner/offer/create/*`} element = {<CreateOffer />}></Route>
                {/*<Route path="/owner/machines/addMachine" element = {<PhotoForm/>}></Route>*/}
                {/*<Route path="/usersList" element = {<div>Users List</div>}></Route>*/}
                {/*<Route path="/profile" element = {<div>Profile</div>}></Route>*/}
                <Route path="/profile" element = {<FetchFromLeaflets/>}></Route>
            </Routes>
        </div>
    );
};



export  default Content;