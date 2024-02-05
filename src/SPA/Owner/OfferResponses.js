import React, {useState} from 'react';
import {parseISO} from "date-fns";

const OfferResponses = (props) => {

    const [responses, setResponses] = useState([]);

    const token = localStorage.getItem('currentToken');
    const bearerToken = `Bearer ${token}`;

    fetch(`http://localhost:8080/owner/offer/${props.offerId}/responses`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken,
            'Access-Control-Allow-Origin':'*'
        },
        //body: JSON.stringify(data),
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((object) => {
            setResponses(object);
            console.log(object);
        })
        .catch((error) => {
            console.error("Błąd: " + error);
        });


    function sendRequest() {

    }

    return (
        <div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Początek najmu:</th>
                    <th>Koniec najmu:</th>
                    <th>Nazwa firmy</th>
                    <th>Cena</th>

                </tr>
                </thead>
                <tbody>
                {responses.map((response) => {

                     {
                        return (
                            <tr key={response.id}>
                                <td>{response.id}</td>
                                <td>{new Date(response.startRentDate).toLocaleDateString('pl-PL')}</td>
                                <td>{new Date(response.endRentDate).toLocaleDateString('pl-PL')}</td>
                                <td>{response.renter.companyName}</td>
                                <td >{response.price}</td>
                                <td>
                                    <button onClick={() => sendRequest()}>Wyślij zapytanie</button>
                                </td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OfferResponses;