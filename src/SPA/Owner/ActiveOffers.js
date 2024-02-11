import React, { useEffect, useState } from 'react';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [responses, setResponses] = useState(null);

    // Fetch offers from the server when the component mounts
    useEffect(() => {
        fetchOffers();
    }, []);

    // Function to fetch offers from the server

    const token = localStorage.getItem('currentToken');
    const bearerToken = `Bearer ${token}`;

    const fetchOffers = async () => {

        try {
            const response = await fetch('/owner/offer/active',
           // const response = await fetch('http://localhost:8080/owner/offer/active',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearerToken,
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(localStorage.getItem("email")),
                } );
            if (!response.ok) {
                throw new Error('Failed to fetch offers');
            }
            const data = await response.json();
            console.log(data);
            setOffers(data); // Update the state with the fetched offers
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    // Function to handle click on an offer
    const handleOfferClick = (offerId) => {
        if (selectedOffer === offerId) {
            // If the clicked offer is already selected, deselect it

            setSelectedOffer(null);
        } else {
            // Otherwise, select the clicked offer
            fetch(`/owner/offer/${offerId}/responses`,
                // const response = await fetch('http://localhost:8080/owner/offer/active',
                {
                    method: 'GET' ,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearerToken,
                        'Access-Control-Allow-Origin': '*'
                    },
                    //body: JSON.stringify(localStorage.getItem("email")),
                } )
                .then((response) => response.json())
                .then((responses) => {
                    console.log(responses);
                    setResponses(responses)
            setSelectedOffer(offerId);
        });
        }
    };

    // return (
    //     <div>
    //         <h2>Offer List</h2>
    //         <ul>
    //             {offers.map((offer) => (
    //                 <li key={offer.id} onClick={() => handleOfferClick(offer.id)}>
    //                     <strong>Offer ID:</strong> {offer.id}<br />
    //                     <strong>Start Date:</strong> {offer.startAvailabilityDate}<br />
    //                     <strong>End Date:</strong> {offer.endAvailabilityDate}<br />
    //                     <strong>Price Per Day:</strong> {offer.pricePerDay}<br />
    //                     <strong>Delivery Price:</strong> {offer.deliveryPrice}<br />
    //                     <strong>Offer With Operator:</strong> {offer.offerWithOperator ? 'Yes' : 'No'}<br />
    //                     <strong>Status:</strong> {offer.status}<br />
    //                     {/* Render additional fields as needed */}
    //                     {selectedOffer === offer.id && (
    //                         <ul>
    //                             {responses.map((response) => (
    //                                 <li key={response.id}>
    //                                     <h3>{response.id}</h3>
    //                                     <h3>{response.price}</h3>
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     )}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
    return (
        <div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>Nr</th>
                    <th>Dostępność od:</th>
                    <th>Dostępność do:</th>
                    <th>Cena za dzień:</th>
                    <th>Cena za dostarczenie:</th>
                    <th>Maszyna z operatorem:</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {offers.map((offer, index) => (
                    <tr key={offer.id} onClick={() => handleOfferClick(offer.id)}>
                        <td>{index+1}</td>
                        <td>{new Date(offer.startAvailabilityDate).toLocaleDateString('pl-PL')}</td>
                        <td>{new Date(offer.endAvailabilityDate).toLocaleDateString('pl-PL')}</td>
                        <td>{offer.pricePerDay} zł</td>
                        <td>{offer.deliveryPrice} zł</td>
                        <td>{offer.offerWithOperator ? 'Yes' : 'No'}</td>
                        <td>{offer.status}</td>
                        <td>{selectedOffer === null ? <h2>Pokaż zapytania do mojej oferty</h2> : <h2>Ukryj zapytania</h2>}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOffer && (
                <div>
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Początek najmu:</th>
                            <th>Koniec najmu:</th>
                            <th>Firma:</th>
                            <th>Cena:</th>

                            {/* Add more columns as needed */}
                        </tr>
                        </thead>
                        <tbody>
                        {responses.map((response, index) => (
                            <tr key={response.id}>
                                <td>{index + 1}</td>
                                <td>{new Date(response.startRentDate).toLocaleDateString('pl-PL')}</td>
                                <td>{new Date(response.endRentDate).toLocaleDateString('pl-PL')}</td>
                                <td>{response.renter.companyName}</td>
                                <td>{response.price} zł</td>

                                {/* Render other response details */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

};

export default OfferList;
