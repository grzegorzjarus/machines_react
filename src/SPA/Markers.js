import React, {useState} from 'react';
import {defaultIcon} from "../icons/defaultIcon";
import {Marker, Popup} from "react-leaflet";

import {  parseISO } from 'date-fns';
import Header from "./Header";
import MarkerPopup from "./MarkerPopup";

const Markers = (props) => {
    // const [price, setPrice] = useState(0);



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

    // const handlePrice = () => {
    //     setPrice((prevPrice) => prevPrice + 100);
    // };

    function isAfter(date1,date2){
        return date1>=date2;
    }

    function compareMachineType(props,item){
        if(props!=="")
            return props===item;
        else return true;
    }

    return (
        <div>

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

               if (isAfter(start,itemStartDate) && isAfter(itemEndDate,end) && compareMachineType(props.machine,item.machineType)) {

                    return (

                        <Marker position={item.position} icon={defaultIcon} key={item.id}>
                            <Popup>
                                <MarkerPopup item = {item}/>
                            </Popup>
                        </Marker>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default Markers;

