

import React, { useState } from 'react';

const RegisterForm = () => {
    const [role, setRole] = useState('OWNER'); // Default role is OWNER
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform registration logic with form data (role, name, surname, etc.)
        console.log({ role, name, surname, email, password, phoneNumber, address });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Role:
                    <select value={role} onChange={handleRoleChange}>
                        <option value="OWNER">OWNER</option>
                        <option value="RENTER">RENTER</option>
                    </select>
                </label>
                <br />

                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />

                <label>
                    Surname:
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </label>
                <br />

                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />

                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />

                <label>
                    Phone Number:
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <br />

                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
