import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
const bounds = [
  [-90, -180], // Southwest corner (lat, lng)
  [90, 180]    // Northeast corner (lat, lng)
];

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ onSelect, value, setZipcode ,clickable = true}) => {
  const [position, setPosition] = useState(value);

  useMapEvents({
    click(e) {
      if(clickable){
        setPosition(e.latlng);
        onSelect(e.latlng);
      }

    },
  });

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ onLocationSelected, coords, setZipcode ,clickable}) => {
  return (
    <div
      className="mt-1 relative z-0 w-full rounded-md border px-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      style={{ height: "420px" }} 
    >
      <MapContainer
        center={coords ? coords : [0,0]}
        zoom={2}
        minZoom={1.5}   // users can’t zoom out further than zoom level 3
        maxBounds={bounds}
        maxBoundsViscosity={1.0}  // this prevents bouncing outside bounds
        scrollWheelZoom={true}
        className="w-full h-full" 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker clickable={clickable} onSelect={onLocationSelected} value={coords || null} setZipcode={setZipcode} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
