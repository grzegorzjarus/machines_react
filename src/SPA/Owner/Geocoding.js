import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";


const MAP_CENTER_DEFAULT = [51.12683886, 17.04776645];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

const Geocoding = () => {
    const [markerPosition, setMarkerPosition] = useState();
    const [address, setAddress] = useState();
    const markerRef = useRef();
    const [selectedPosition, setSelectedPosition] = useState();

    function setMarker(mapClickInfo) {
        console.log(mapClickInfo)
        setMarkerPosition( mapClickInfo.latlng );
        reverseGeoCoding(mapClickInfo.latlng).then();
    }

    // const handleMarkerClick = () => {
    //     if (markerRef.current) {
    //         markerRef.current.leafletElement.openPopup();
    //     }
    // };
    // function setMarker(event) {
    //     const latlng = event.latlng;
    //     console.log(latlng);
    //
    //     // Check if the event is a PointerEvent
    //     if (event instanceof PointerEvent) {
    //         const pressureValue = event.pressure;
    //         const inputSource = event.pointerType;
    //
    //         // Use pressureValue and inputSource as needed
    //         console.log('Pressure:', pressureValue);
    //         console.log('Input Source:', inputSource);
    //     }
    //
    //     setMarkerPosition(latlng);
    //     reverseGeoCoding(latlng).then();
    // }

     function getMarker() {
        if (markerPosition) {
            return (
                <Marker ref={(ref) => showPopUp(ref)} position={markerPosition}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {getStringMarkerPosition()}
                    </Popup>
                </Marker>
            );
        }
    }

    //  function showPopUp(ref){
    //     if (ref) {
    //         ref.leafletElement.openPopup();
    //     }
    // }
    function showPopUp(ref) {
        if (ref) {
            const marker = ref.getPopupContainer; // Access the Leaflet marker
            //const marker = ref.current; // Access the Leaflet marker
            console.log("Marker: " +marker);
            marker.openPopup(); // Open the popup associated with the marker
        }
    }


    function getStringMarkerPosition() {
        //console.log(this.state.adress)
        return (
            <div>
                {address}
                <br/>
                {markerPosition.lat.toFixed(8) + ", " + markerPosition.lng.toFixed(8)}
            </div>
        );
    }

    async function reverseGeoCoding(coordinates) {
        // Here the coordinates are in LatLng Format
        // if you wish to use other formats you will have to change the lat and lng in the fetch URL
        //const data = await ( await fetch(GEOCODE_URL+`${coordinates.lng},${coordinates.lat}`)).json();
        const data = await ( await fetch(GEOCODE_URL+`${17.04776645},${51.12683886}`)).json();
        console.log(data.address);
        const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
        setAddress( addressLabel);
    }



    const Markers = () => {

        const map = useMapEvents({
            click(e) {
                console.log("Kliknalem w mapę");
                setMarker(e);
                // setSelectedPosition([
                //     e.latlng.lat,
                //     e.latlng.lng
                // ]);
            },
        })

        // return (
        //     selectedPosition ?
        //         <Marker
        //             key={selectedPosition[0]}
        //             position={selectedPosition}
        //             interactive={false}
        //         />
        //         : null
        // )
        return null;

    }








    return (
        <MapContainer center={MAP_CENTER_DEFAULT} zoom={15} click={setMarker}>
            <Markers/>
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
            {getMarker()}
        </MapContainer>
    );


};

export default Geocoding;