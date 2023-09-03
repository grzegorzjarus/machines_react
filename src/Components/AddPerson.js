import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPerson = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');

    const navigate = useNavigate();
    const companyName = "Skup ksiazek";
    const email = "skup@gmail.com";
    const password = "abcde";
    const phoneNumber = "123456789";
    const id = 100;
    const postData = {
        "companyName": companyName,
        "firstame": firstName,
        "surname": surname,
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber
    };

    const postData2 = {
        "companyName": "Netia",
        "firstName": "firstName",
        "surname": "surname",
        "email": "email",
        "password": "password",
        "phoneNumber": "phoneNumber"
    };

    const object = JSON.stringify(postData);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send data to backend API
        fetch('http://localhost:8080/client/restapi/addClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : object,

        })
            //.then((response) => response.json())
            // .then((data) => {
            //     // Handle success or error response from backend
            //     console.log(data);
            //
            // })
            .catch((error) => {
                // Handle error
               console.error(error);
               console.log(error);
                navigate('/');

            });

        navigate('/fetchFromLeaflets');
    };



    return (
        <div>
            <h1>Add Person</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    placeholder="Last Name"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export default AddPerson;