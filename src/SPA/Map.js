import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import Markers from "./Markers";
import SearchDate from "./SearchDate";
import ListContent from "./ListContent";
import OfferList from "./Renter/OfferList";


const Map = (props) => {

  

    const position1 = [51.505, -0.09];
    const position2 = [51.515, -0.25];
    const position3 = [51.525, -0.29];
    const position4 = [51.575, -0.11];
    const position5 = [51.535, -0.19];
    const position6 = [51.540, -0.39];
    const position7 = [51.579, -0.17];
    const position8 = [51.328, -0.14];
    const position9 = [51.420, -0.19];
    const position10 = [51.535, -0.49];


    // const data = [];
    // data.push(position);
    // data.push(position2);
    // data.push(position3);
    // data.push(position4);
    // data.push(position5);

    const item1 = {position: position1, isTrue: true, startDate: '2023-05-17', endDate: '2023-05-18' , machineType: "Podnośnik koszowy"};
    const item2 = {position: position2, isTrue: false, startDate: "2023-05-02", endDate: '2023-05-28', machineType: "Żuraw"};
    const item3 = {position: position3, isTrue: true, startDate: "2023-05-01", endDate: '2023-05-31', machineType: "Młot pneumatyczny"};
    const item4 = {position: position4, isTrue: true, startDate: "2023-05-30", endDate: '2023-06-20', machineType: "Podnośnik koszowy"};
    const item5 = {position: position5, isTrue: true, startDate: "2023-05-27", endDate: '2023-06-15', machineType: "Podnośnik nożycowy"};
    const item6 = {position: position6, isTrue: true, startDate: '2023-05-07', endDate: '2023-05-18' , machineType: "Koparka"};
    const item7 = {position: position7, isTrue: false, startDate: "2023-05-10", endDate: '2023-05-31', machineType: "Żuraw"};
    const item8 = {position: position8, isTrue: true, startDate: "2023-05-05", endDate: '2023-05-31', machineType: "Młot pneumatyczny"};
    const item9 = {position: position9, isTrue: true, startDate: "2023-05-30", endDate: '2023-06-20', machineType: "Podnośnik koszowy"};
    const item10 = {position: position10, isTrue: true, startDate: "2023-05-27", endDate: '2023-06-15', machineType: "Podnośnik nożycowy"};

    const data2 = [];
    data2.push(item1);
    data2.push(item2);
    data2.push(item3);
    data2.push(item4);
    data2.push(item5);
    data2.push(item6);
    data2.push(item7);
    data2.push(item8);
    data2.push(item9);
    data2.push(item10);


    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [machineType, setMachineType] = useState("");
    const [isMap, setIsMap] = useState(true);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }

    const handleMachineTypeChange = (event) => {
        setMachineType(event.target.value);
    };
    const handleIsMapButton = () =>{
        setIsMap(true);
    }
    const handleIsListButton = () =>{
        setIsMap(false);
    }


    let content =
                <MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Markers data={data2} startDate={startDate} endDate={endDate} machine={machineType}/>
                </MapContainer>
     //if(!isMap) content = <ListContent data={data} startDate={startDate} endDate={endDate} machine={machineType}/>
    // if(!isMap) content = <OfferList data={getOffers()} startDate={startDate} endDate={endDate} machine={machineType}/>
    if(!isMap) content = <OfferList startDate={startDate} endDate={endDate} machine={machineType}/>

    return (

        <div>
            <SearchDate startDate={startDate} onStartChange={handleStartDateChange} endDate={endDate} onEndChange={handleEndDateChange}
                        machine={machineType} onMachineTypeChange={handleMachineTypeChange} />
            <button onClick={handleIsMapButton}>Mapka</button>
            <button onClick={handleIsListButton}>Lista</button>
            {content}
        </div>
    )
};

export default Map;
