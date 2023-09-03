import React, { useState } from 'react';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleEmailChange = (event) => {
        const { value } = event.target;

        setEmail(value);

        // Email validation rules
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(value.length<10){
            setEmailError("email is too short");
            setSubmitDisabled(true);
        }
        else{
            if (!emailRegex.test(value)) {
                setEmailError('Please enter a valid email address');
                setSubmitDisabled(true);
            } else {
                setEmailError('');
                setSubmitDisabled(false)
            }
           // setEmailError('');
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Do something with the validated email value
        console.log(email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input style={{color: submitDisabled ? "red" : "white"}}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <button type="submit" disabled={submitDisabled}>Submit</button>
            {emailError && <p>{emailError}</p>}
        </form>
    );
};

export default EmailForm;
