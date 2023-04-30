import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ImLocation } from "react-icons/im";
import L from "leaflet";
import "./styles.css";
import { renderToStaticMarkup } from "react-dom/server";
import { useRef } from "react";
import { useEffect } from "react";

function ReadOnlyMap({ lat, long }) {
  const ZOOM_LEVEL = 23;

  console.log(lat, long);
  const mapRef = useRef();
  const iconMarkup = renderToStaticMarkup(<ImLocation size={30} />);
  const customMarkerIcon = L.divIcon({
    html: iconMarkup,
  });

  useEffect(() => {
    mapRef.current?.setView([lat, long], ZOOM_LEVEL, {
      animate: true,
    });
  }, [lat, long]);

  return !lat && !long ? (
    <Skeleton h="280px">
      <div>contents wrapped</div>
    </Skeleton>
  ) : (
    // <Box w={"100%"} h="100%">
    <MapContainer
      ref={mapRef}
      style={{ borderRadius: "15px", width: "100%", height: "100%" }}
      center={[lat, long]}
      zoom={ZOOM_LEVEL}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]} icon={customMarkerIcon}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
    // </Box>
  );
}

export default ReadOnlyMap;
