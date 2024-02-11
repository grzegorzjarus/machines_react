import React, { useState, useEffect } from 'react';
import {parseISO} from "date-fns";
import './Table.css';
import {useNavigate} from "react-router-dom";


const OfferList = (props) => {
    const [offers, setOffers] = useState([]);

    const navigate = useNavigate();

    let start = null;
    let end = null;

    if (typeof props.endDate === 'string') {
        end = parseISO(props.endDate);
    }

    if (props.endDate instanceof Date) {
        end = props.endDate;
    }

    if (typeof props.startDate === 'string') {
        start = parseISO(props.startDate);
    }

    if (props.startDate instanceof Date) {
        start = props.startDate;

    }

    function isAfter(first, second){
        return first>=second;
    }

     function sendRequest(offer,start,end) {

        console.log(offer.id);
        console.log(start);
        console.log(end);
        console.log(localStorage.getItem("email"));


        const data = {
            "offerId": offer.id,
            "email": localStorage.getItem("email"),
            "start": start,
            "end": end,
            "price": calculatePrice(offer,start,end)
        };

        //localStorage.setItem("offerId", offerId);
        const token = localStorage.getItem('currentToken');
        const bearerToken = `Bearer ${token}`;



        fetch(`renter/offer/response`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearerToken,
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data),
            //mode: 'cors',
        })
            .then((response) => response.json())
            .then((object) => {
                console.log(object);
            })
            .catch((error) => {
                console.error("Błąd: " + error);
            });



        //  navigate("/owner/machines");
        console.log("Zapytanie o maszynę")
    }

    function calculateDaysDifference(startDate, endDate) {
        // Convert both dates to UTC to ensure the calculation is not affected by daylight saving time
        const utcStartDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const utcEndDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        // Calculate the time difference in milliseconds
        const timeDifference = utcEndDate - utcStartDate;

        // Convert the time difference to days
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    }

    function calculatePrice(offer,start,end){
        return offer.pricePerDay * calculateDaysDifference(start, end) + offer.deliveryPrice
    }


    function compareMachineType(props,item){
        if(props!=="") {
            if (props === "Podnośnik nożycowy" && item === "SCISSOR_LIFT")
                return true;
            if (props === "Podnośnik koszowy" && item === "BASKET_LIFT")
                return true;
            if (props === "Żuraw" && item === "CRANE")
                return true;
            if (props === "Młot pneumatyczny" && item === "PNEUMATIC_HAMMER")
                return true;
            if (props === "Koparka" && item === "EXCAVATOR")
                return true;

        }
        else return true;
    }

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const token = localStorage.getItem('currentToken');
                const bearerToken = `Bearer ${token}`;

                const response = await fetch(`/renter/offer`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: bearerToken,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOffers(data);
                } else {
                    console.error('Failed to fetch offers:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers();
    }, []);


    return (
        <div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Rodzaj maszyny:</th>
                    <th>Dostępność od: </th>
                    <th>Dostępność do:</th>
                    <th>Cena za dzień:</th>
                    <th>Koszt dostarczenia:</th>
                    <th>Nazwa firmy:</th>
                    <th style={{ color:"red"}}>Całkowity koszt wynajmu</th>
                </tr>
                </thead>
                <tbody>
                {offers.map((offer) => {
                    let itemStartDate = null;
                    let itemEndDate = null;

                    if (typeof offer.startAvailabilityDate === 'string') {
                        itemStartDate = parseISO(offer.startAvailabilityDate);
                    }

                    if (offer.startAvailabilityDate instanceof Date) {
                        itemStartDate = offer.startAvailabilityDate;
                    }

                    if (typeof offer.endAvailabilityDate === 'string') {
                        itemEndDate = parseISO(offer.endAvailabilityDate);
                    }

                    if (offer.endAvailabilityDate instanceof Date) {
                        itemEndDate = offer.endAvailabilityDate;
                    }

                    if (
                        isAfter(start, itemStartDate) &&
                        isAfter(itemEndDate, end) &&
                        isAfter(end,start)&&
                        compareMachineType(props.machine, offer.machine.type)
                    ) {
                        return (
                            <tr key={offer.id}>
                                <td>{offer.id}</td>
                                <td>{offer.machine.type}</td>
                                {/*<td>{offer.startAvailabilityDate}</td>*/}
                                <td>{new Date(offer.startAvailabilityDate).toLocaleDateString('pl-PL')}</td>
                                <td>{new Date(offer.endAvailabilityDate).toLocaleDateString('pl-PL')}</td>
                                <td>{offer.pricePerDay} zł</td>
                                <td>{offer.deliveryPrice} zł</td>
                                <td>{offer.owner.companyName}</td>
                                {/*<td style={{color: "red"}}>{offer.pricePerDay * calculateDaysDifference(start, end) + offer.deliveryPrice}</td>*/}
                                <td style={{color: "red"}}>{calculatePrice(offer,start,end)} zł</td>
                                <td><button onClick={()=>sendRequest(offer,start,end)}>Wyślij zapytanie</button></td>
                            </tr>
                        );
                    } else {
                        return null;
                    }
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OfferList;

