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
//import {List} from "antd";

const Content = () => {
    const startDate= '2023-05-30';
    const endDate= '2023-06-10';
    // console.log("Content date: " +date);
    return (
        <div style={{width:'100%', height:'100%'}}>
            <Routes>
                <Route path="/" element = {<Map startDate={startDate} endDate={endDate}/>}></Route>
                <Route path="/list" element = {<List startDate={startDate} endDate={endDate}/>}></Route>
                <Route path="/dashboard" element = {<Order/>}></Route>
                <Route path="/usersList" element = {<UserList/>}></Route>
                {/*<Route path="/usersList" element = {<div>Users List</div>}></Route>*/}
                {/*<Route path="/profile" element = {<div>Profile</div>}></Route>*/}
                <Route path="/profile" element = {<FetchFromLeaflets/>}></Route>
            </Routes>
        </div>
    );
};



export  default Content;