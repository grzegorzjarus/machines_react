import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CreateOffer from "./CreateOffer";
import '../Renter/Table.css';

const Machines = () => {
    const navigate = useNavigate();

    const [data, setData] = useState('');


    if( localStorage.getItem("currentToken")===null){
        navigate("/");
    }

    function addMachineCLick() {
        navigate("/owner/machines/addMachine");
    }



    const deleteOfferClick = async (machineId) => {
        const token = localStorage.getItem("currentToken");
        const bearerToken = `Bearer ${token}`;

        const body = { "machineId": machineId };

        try {
            await fetch(`/owner/offer/delete/${machineId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearerToken,
                },
                body: JSON.stringify(body),
            });

            fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error("Błąd: ", error);
        }
    };


    function createOfferClick(machineId) {
        console.log("Machine id: " +machineId);
        localStorage.setItem("machineId", machineId);// I don't know it is good, but it is work
        console.log("Machine id from localStorage: " + localStorage.getItem("machineId"));
        console.log("Click from Machines");


        navigate(`/owner/offer/create/${machineId}`);
    }


    const fetchData = async () => {
        const token = localStorage.getItem("currentToken");
        const bearerToken = `Bearer ${token}`;
        const email = JSON.stringify(localStorage.getItem("email"));
        console.log("EMail from fetch: " + email);

        try {
            const response = await fetch("/owner/machines", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearerToken,
                },

               body: email,
               // body: JSON.stringify(email),
                //body: {"email": localStorage.getItem("email")},
            });

            const data = await response.json();
            setData(data);
            console.log("Email from fetch: " +email);
            console.log("Data from fetch " + data);
        } catch (error) {
            console.error(error);
            setData(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Typ</th>
                    <th>Status</th>

                </tr>
                </thead>
                <tbody>

                {data && data.map(machine => (
                    <tr key={machine.id}>
                        <td>{machine.id}</td>
                        <td>{machine.name}</td>
                        <td>{machine.description}</td>
                        <td>{machine.type}</td>
                        <td>{machine.status}</td>
                        <td>{machine.status === 'FREE' ?
                            <button onClick={() => createOfferClick(machine.id)}>Wystaw na aukcję</button>
                            : machine.status === 'ON_AUCTION' ?
                                <button onClick={() => deleteOfferClick(machine.id)}>Usuń
                                    z aukcji</button>
                                : <p style={{padding: 0}}>U klienta do: 1.01.2100</p>}</td>
                    </tr>
                ))}


                </tbody>

            </table>

            <button onClick={addMachineCLick}>Dodaj maszynę</button>
        </>

    );
};

export default Machines;