import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function FieldMapTab() {
  return (
   <div className="h-[600px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl animate-fade-in-up map-dark-filter">
      <MapContainer center={[19.9975, 73.7898]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[19.9975, 73.7898]}>
          <Popup><div className="text-black"><strong>Field 1</strong><br/>Last Scan: Tomato Late Blight</div></Popup>
        </Marker>
        <Marker position={[20.0050, 73.8000]}>
          <Popup><div className="text-black"><strong>Field 2</strong><br/>Status: Healthy</div></Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}