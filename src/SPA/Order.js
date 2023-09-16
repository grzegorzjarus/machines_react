import React, { useState } from "react";

const Order = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [textInput, setTextInput] = useState("");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Start date:", startDate);
        console.log("End date:", endDate);
        console.log("Select value:", selectValue);
        console.log("Text input:", textInput);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Początek najmu: </label>
                <input type="date" value={startDate} onChange={handleStartDateChange} />
            </div>
            <div>
                <label>Koniec najmu: </label>
                <input type="date" value={endDate} onChange={handleEndDateChange} />
            </div>
            <div>
                <label>Rodzaj maszyny: </label>
                <select value={selectValue} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Podnośnik koszowy">Podnośnik koszowy</option>
                    <option value="Podnośnik nożycowy">Podnośnik nożycowy</option>
                    <option value="Żuraw">Żuraw</option>
                    <option value="Koparka">Koparka</option>
                    <option value="Młot pneumatyczny">Młot pneumatyczny</option>
                </select>
            </div>
            <div>
                <label>Miejsce dostarczenia: </label>
                <input type="text" value={textInput} onChange={handleTextChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Order;
