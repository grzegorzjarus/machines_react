import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";


let style = {color:"red", textAlignLast:"center", padding:20};
let style2 = {color:"orange", textAlignLast:"center", padding:20};



const Header = () => {
    const navigate = useNavigate();

    const [style, setStyle] = useState({
        color: 'red',
        textAlignLast: 'center',
        padding: 20,
    });

    const clickHandler = () => {
        setStyle({
            color: 'orange',
            textAlignLast: 'center',
            padding: 20,
        });

        navigate('/');
    };

    const mouseOverHandler = () => {
        setStyle({
            color: 'blue',
            textAlignLast: 'center',
            padding: 20,
        });
    };

    const mouseLeaveHandler = () => {
        setStyle({
            color: 'red',
            textAlignLast: 'center',
            padding: 20,
        });
    };

    return (
        <div>
            {/*<h1 style={{color:"red", textAlignLast:"center", padding:20}}>Header </h1>*/}
            {/*<h1 style={style}>Header </h1>*/}
            <h1  style={style} onClick={clickHandler} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>Header </h1>
        </div>
    );
};


const Footer = () => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/firstComponent');
    };
    return (
        <div>
            <h1 style={{color:"blue", textAlignLast:"center"}} onClick={clickHandler}>Footer</h1>
        </div>
    );
};


const DisplayClients = (props) => {

    if(props.data===null){
        return <h3>Brak danych z serwera</h3>
    }
    else
    {
        return (

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Firma</th>
                    <th>Mail</th>
                    <th>Telefon</th>
                </tr>
                </thead>
                <tbody>

                {props.data && props.data.map(client => (
                    <tr key={client.id}>
                        <td>{client.id + " "}</td>
                        <td>{client.firstName + " "}</td>
                        <td>{client.surname + " "}</td>
                        <td>{client.companyName + " "}</td>
                        <td>{client.email + " "}</td>
                        <td>{client.phoneNumber + " "}</td>
                    </tr>
                ))}

                </tbody>

            </table>
        );
    }
};

const FetchFromLeaflets = () => {

    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8080/client/restapi/allClients");
    //             const data = await response.json();
    //             setData(data);
    //         } catch (error) {
    //             console.error(error);
    //             setData(null);
    //         }
    //     };
    //
    //     const intervalId = setInterval(fetchData, 10000);
    //
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/client/restapi/allClients");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
                setData(null);
            }
        };
        fetchData();

    });
    return (
        <>
            <DisplayClients data={data}/>
        </>
    )



};

export default FetchFromLeaflets;



