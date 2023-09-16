import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Machines = () => {
    const navigate = useNavigate();

    const [data, setData] = useState('');

    function addMachineCLick() {
        navigate("/owner/machines/addMachine");
    }

    function createOfferClick() {
        navigate("/owner/offer/create")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/owner/machines");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
                setData(null);
            }
        };
        fetchData();

    },[]);



    return (
        <>
            <table className="table">
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
                        <td>{machine.id + " "}</td>
                        <td>{machine.name + " "}</td>
                        <td>{machine.description + " "}</td>
                        <td>{machine.type + " "}</td>
                        <td>{machine.status + " "}</td>
                        <td>{machine.status==='FREE'? <button onClick={createOfferClick}>Wystaw na aukcję</button>: machine.status==='ON_AUCTION'?<button>Usuń z aukcji</button>
                            : <p style={{padding:0}}>U klienta do: 1.01.2100</p> }</td>
                        {/*<button onClick={handleClick}>Dodaj maszynę</button>*/}
                    </tr>
                ))}

                </tbody>

            </table>

            <button onClick={addMachineCLick}>Dodaj maszynę</button>
        </>

    );
};

export default Machines;