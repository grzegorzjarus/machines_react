//import React, {useEffect} from 'react';
import {useState,useEffect} from 'react';

const UserList = () => {

    const [uzytkownicy, setUzytkownicy, odpowiedz, setOdpowiedz] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Funkcja do pobierania użytkowników
        let token = localStorage.getItem("currentToken")
        async function zaczytajUzytkownikow() {
            try {
                const resp = await fetch('http://localhost:8080/demo/demo-owner',
                    {
                        method: "GET",
                            headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                                "Access-Control-Allow-Origin": "*",
                    },
                        // body: JSON.stringify({email,password}),

                    }
                )
                const dane = await resp.json();
                // setUzytkownicy(dane);
                setOdpowiedz(dane)
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas wczytywania użytkowników:', error);
                setLoading(false);
            }
        }

        zaczytajUzytkownikow();
    }, []);  // Pusta tablica zależności oznacza, że useEffect zostanie wywołany tylko raz - po pierwszym renderowaniu

    if (loading) {
        return <div>Ładowanie...</div>;
    }


    return (
        <div>
            <h1>{odpowiedz}</h1>
        </div>
    );
};

export default UserList;