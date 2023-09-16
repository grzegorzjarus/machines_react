import React from 'react';

const CreateOffer = () => {
    return (

            <div>
                <label>Początek najmu: </label>
                {/*<input type="date" value = {} onChange={}/>*/}
                <input type="date" />
                <label> Koniec najmu: </label>
                {/*<input type="date" value={} onChange={}/>*/}
                <input type="date" />
                <br/>
                <button>Wyślij</button>
            </div>

    );
};

export default CreateOffer;