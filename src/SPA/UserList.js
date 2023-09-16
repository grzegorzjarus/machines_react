
import {useState, useEffect} from 'react';

const UserList = () => {

    const [uzytkownicy, setUzytkownicy, odpowiedz, setOdpowiedz] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Funkcja do pobierania użytkowników
        let token = localStorage.getItem("currentToken")
        console.log("Token from userList: " + token);

        let bearerToken = `Bearer ${token}`;
        console.log(bearerToken);

        async function zaczytajUzytkownikow() {
            try {
                const resp = await fetch('http://localhost:8080/demo/demo-owner',//{mode:'cors'},
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            //"Authorization": "Bearer " + token,
                            "Authorization": bearerToken,

                            "Access-Control-Allow-Origin": "*",
                        },
                        mode: 'cors',

                        // body: JSON.stringify({email,password}),

                    });
                    //.then((response) => response.json());
               // resp.set('Access-Control-Allow-Origin', '*');
                const dane = await resp.json();
                // setUzytkownicy(dane);
                setOdpowiedz(dane);
                console.log(odpowiedz)
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
            <h1>Odpowiedz = {odpowiedz}</h1>
        </div>
    );
};

export default UserList;