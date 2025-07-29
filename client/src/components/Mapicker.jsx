// LocationPicker.jsx
import React, { useEffect, useState,useCallback } from "react";
import FullScreenButton from './fullscreenbutton';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useRef } from "react";
// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const getZip = async (lat, lng) => {
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const zip = data.results[0].components.postcode;
    return zip;
    
  } catch (error) {
    console.log('Error:', error)      
  }
};

const LocationMarker = ({ onSelect , value ,setZipcode}) => {
  const [position, setPosition] = useState(value);
  useMapEvents({
   async click(e)  {
      // let zip = await getZip(e.latlng.lat,e.latlng.lng)
      // setZipcode(zip)
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position}  
   value={{ id: 123, name: "Custom Marker", lat: position.lat, lng: position.lng }}
    eventHandlers={{
      click: (e) => {
          const marker = e.target;
          const val = marker.options.value;
      }}}
      /> :  null  
      };


const LocationPicker = ({ onLocationSelected ,coords,setZipcode}) => {
  return (
    <div className={`mt-1 relative z-0 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}>
      <MapContainer
        center={[28.1000, 30.7500]} // minya default
        zoom={150}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        
      />
        <LocationMarker onSelect={onLocationSelected} value={coords ? coords : ''} setZipcode={setZipcode}/>
      </MapContainer>
    </div>
  
  );
  
};

export default LocationPicker;
