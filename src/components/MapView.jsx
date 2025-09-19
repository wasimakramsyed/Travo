import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'

const pin = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

export default function MapView({ tourists = [], alerts = [] }) {
  const center = tourists.length ? [tourists[0].lat, tourists[0].lng] : [12.9716, 77.5946]
  return (
    <div className="h-[60vh] w-full rounded border">
      <MapContainer center={center} zoom={7} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {tourists.map(t => (
          <Marker key={t.id} position={[t.lat, t.lng]} icon={pin}>
            <Popup>
              <div className="text-sm">
                <strong>{t.name}</strong>
                <div>{t.id}</div>
                <div>{t.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        {alerts.map(a => (
          <Circle key={a.id} center={[a.location.lat, a.location.lng]} radius={200} pathOptions={{ color: 'red' }} />
        ))}
      </MapContainer>
    </div>
  )
}
