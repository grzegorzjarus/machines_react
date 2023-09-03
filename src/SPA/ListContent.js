import React, {useState} from 'react';
import podnosnik from "./podnosnik.jpg";
import MarkerPopup from "./MarkerPopup";
import {Popup} from "react-leaflet";
import {useNavigate} from "react-router-dom";
import {parseISO} from "date-fns";

const ListContent = (props) => {

    const navigate = useNavigate();

    function isAfter(date1,date2){
        return date1>=date2;
    }

    function compareMachineType(props,item){
        if(props!=="")
            return props===item;
        else return true;
    }

    function sendRequest(item) {
        // return (<Popup>
        //     <MarkerPopup item={item}/>
        // </Popup>);
        navigate("usersList");
    }

    console.log(props.data);

    let start = null;
    let end = null;
    if (typeof props.endDate === 'string') {
        // Try parsing the string to a Date object using date-fns parseISO
        end = parseISO(props.endDate);
    }

    // Check if item.date is already a Date object
    if (props.endDate instanceof Date) {
        end = props.endDate;
    }

    if (typeof props.startDate === 'string') {
        // Try parsing the string to a Date object using date-fns parseISO

        start = parseISO(props.startDate);
    }

    // Check if item.date is already a Date object
    if (props.startDate instanceof Date) {
        start = props.startDate;
    }





    return (
        <>
        {/*<div>*/}
        {/*    {props.data.map((item) => {*/}
        {/*       // if (isAfter(props.startDate,item.startDate) && isAfter(item.endDate,props.endDate) && compareMachineType(props.machine,item.machineType)) {*/}
        {/*       // if (true) {*/}
        {/*        if ( compareMachineType(props.machine,item.machineType)) {*/}
        {/*        return (*/}
        {/*            <div>*/}
        {/*                <h1>{item.machineType}</h1>*/}
        {/*                <h1>{item.startDate}</h1>*/}
        {/*                <h1>{item.endDate}</h1>*/}
        {/*            </div>);*/}
        {/*    }})}*/}
        {/*</div>*/}


            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Rodzaj maszyny</th>
                        <th>Miasto</th>
                        <th>Dostępność od</th>
                        <th>Dostępność do</th>
                        <th>Ocena</th>
                        <th style={{ color:"red"}}>Szacunkowy koszt*</th>
                    </tr>
                    </thead>
                    <tbody>
                {props.data.map((item) => {
                    let itemStartDate = null;
                    let itemEndDate = null;

                    // Check if item.date is a string
                    if (typeof item.startDate === 'string') {
                        // Try parsing the string to a Date object using date-fns parseISO
                        itemStartDate = parseISO(item.startDate);

                    }

                    // Check if item.date is already a Date object
                    if (item.startDate instanceof Date) {
                        itemStartDate = item.startDate;

                    }

                    if (typeof item.endDate === 'string') {
                        // Try parsing the string to a Date object using date-fns parseISO
                        itemEndDate = parseISO(item.endDate);
                    }

                    // Check if item.date is already a Date object
                    if (item.endDate instanceof Date) {
                        itemEndDate = item.endDate;
                    }
                    // if (isAfter(props.startDate,item.startDate) && isAfter(item.endDate,props.endDate) && compareMachineType(props.machine,item.machineType)) {
                    // if (true) {
                    if ( isAfter(start,itemStartDate) && isAfter(itemEndDate,end) && compareMachineType(props.machine,item.machineType)) {
                        return (
                            <tr>
                                <td>{item.machineType}</td>
                                <td>Wrocław</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>7.18</td>
                                <td>1200 zł</td>
                                {/*<img style={{ width: "10%", height: "10%" }} src={podnosnik}/>*/}
                                <button onClick={sendRequest}>Wyślij zapytanie</button>
                            </tr>);
                    }})}
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default ListContent;