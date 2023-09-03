import React from 'react';
import podnosnik from "./podnosnik.jpg"

const MarkerPopup = (props) => {
    function sendRequest() {
        return null;
    }

    return (
        <div>
            <h1>{props.item.machineType}</h1>
            <h2>Wrocław</h2>
            <h3>Dostępność od: {props.item.startDate}</h3>
            <h3>Dostępność do: {props.item.endDate}</h3>
            <h3>Ocena: 9.31</h3>
            <h3 style={{ color:"red"}}>Szacunkowy koszt* : 1200 zł</h3>
            <img style={{ width: "100%", height: "100%" }} src={podnosnik}/>
            <button onClick={sendRequest}>Wyślij zapytanie</button>
        </div>
    );
};

export default MarkerPopup;