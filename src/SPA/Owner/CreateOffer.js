import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const CreateOffer = () => {

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pricePerDay, setPricePerDay] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState('');
    const [operator, setOperator] = useState('false');

    useEffect(() => {

        if (localStorage.getItem("currentToken") === null) {
            navigate("/");
        }
        //setTimeout()
    });

    function  handleSendClick() {
  //  const  handleSendClick = async () => {

        //setOperator(operator.localeCompare( "on") ? "true" : "false");
        //e.preventDefault()



        // const data = {
        //     "startAvailabilityDate": startDate,
        //     "endAvailabilityDate": endDate,
        //     "pricePerDay": pricePerDay,
        //     "deliveryPrice": deliveryPrice,
        //     "offerWithOperator": operator
        // }

        // const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        // const formattedStartDate = startDate.toLocaleDateString('en-GB');
        // const formattedEndDate = endDate.toLocaleDateString('en-GB');

        const data = {
            offer: {
                "startAvailabilityDate": startDate,
                "endAvailabilityDate": endDate,
                "pricePerDay": pricePerDay,
                "deliveryPrice": deliveryPrice,
                "offerWithOperator": operator
            },
            email: {
                "email": localStorage.getItem("email")
            }
        };



        const object = JSON.stringify(data);



        console.log(object);
        console.log("Click from CreateOffer");

        let bearerToken = `Bearer ${localStorage.getItem("currentToken")}`;


            fetch(`/owner/offer/create/${localStorage.getItem("machineId")}`, {
                //   fetch(`http://localhost:8080/owner/offer/create/${localStorage.getItem("machineId")}`, {
                method: 'POST',
                // mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearerToken,
                    "Email": localStorage.getItem("email"),
                    // 'Access-Control-Allow-Origin':'*'
                },
                body: object,
            })
                .then((response) => response.json())
                .then((object) => {
                    // Handle the response data
                    console.log(object);
                })
                .catch((error) => {
                    // Handle any errors
                    // console.log("Błąd" +object);
                    console.error("Błąd: " + error);
                });

            console.log("After fetch ");

            navigate("/owner/machines");

       // window.location.href= '/owner/machines'; // because of better refresh

    }

    return (

            <div>
                <form onSubmit={handleSendClick}>
                <label>Dostępność od: </label>
                <input type="date"  onChange={ (event) =>setStartDate(event.target.value)}/>


                    <label> Dostępność do: </label>
                <input type="date"  onChange={ (event) =>setEndDate(event.target.value)}/>

                <br/>
                <label>Cena za dzień: </label>
                <input type="text" onChange={ (event) =>setPricePerDay(event.target.value)} />
                <br/>
                <label>Opłata za dostarczenie: </label>
                <input type="text"  onChange={ (event) =>setDeliveryPrice(event.target.value)}/>
                <br/>
                <label>Operator </label>
                <input type="checkbox"  onChange={ (event) =>setOperator(event.target.value.localeCompare( "on") ? "true" : "false")} />
                <br/>
                <button type="submit">Wyślij</button>
                </form>
            </div>

    );
};

export default CreateOffer;