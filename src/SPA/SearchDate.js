import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const SearchDate = ({startDate, onStartChange, endDate, onEndChange, machine,onMachineTypeChange}) => {

   // const [selectValue, setSelectValue] = useState("");

    const navigate = useNavigate();
    function handleMapNavigate(){
        navigate("/");
    }
    function handleListNavigate(){
        navigate("/list");
    }


    return (
        <>
            <div>
                <label>Początek najmu: </label>
                <input type="date" value={startDate} onChange={onStartChange}/>
                <label> Koniec najmu: </label>
                <input type="date" value={endDate} onChange={onEndChange}/>
            </div>
            <div>
                <label>Rodzaj maszyny: </label>
                <select value={machine} onChange={onMachineTypeChange}>
                    <option value="">Wszystkie typy</option>
                    <option value="Podnośnik koszowy">Podnośnik koszowy</option>
                    <option value="Podnośnik nożycowy">Podnośnik nożycowy</option>
                    <option value="Żuraw">Żuraw</option>
                    <option value="Koparka">Koparka</option>
                    <option value="Młot pneumatyczny">Mnot pneumatyczny</option>
                </select>
            </div>
            {/*<button onClick={handleMapNavigate}>Mapka </button>*/}
            {/*<button onClick={handleListNavigate}>Lista </button>*/}
        </>
    );
};


export default SearchDate;