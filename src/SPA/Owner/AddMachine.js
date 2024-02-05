import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const AddMachine = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();


    function handleSubmit() {
        const email = localStorage.getItem("email");

        const machineAndEmail = {
            machine:{
            "type": type,
            "name": name,
            "description": description},

            email: {
                email
            }
        };

        const object = JSON.stringify(machineAndEmail);

        console.log(object);

        const token = localStorage.getItem("currentToken");
        const bearerToken = `Bearer ${token}`;

        fetch('http://localhost:8080/owner/machine/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearerToken,
            },
            body : object,

        })

            .catch((error) => {
                // Handle error
                console.error(error);
                console.log(error);


            });
        navigate('/owner/machines');
    }

    return (
        <div>
            <h1>Add Machine</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                /><br/>

                <textarea
                    type="textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Description"
                />
                <br/>
                <label>Rodzaj maszyny: </label>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="BASKET_LIFT">Podnośnik koszowy</option>
                    <option value="SCISSOR_LIFT">Podnośnik nożycowy</option>
                    <option value="CRANE">Żuraw</option>
                    <option value="EXCAVATOR">Koparka</option>
                    <option value="PNEUMATIC_HAMMER">Młot pneumatyczny</option>
                </select>
                <br/>
                <button type="submit">Dodaj maszynę</button>
            </form>
        </div>
    );
};

export default AddMachine;