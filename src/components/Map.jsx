import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ImLocation } from "react-icons/im";
import L from "leaflet";
import "./styles.css";
import { renderToStaticMarkup } from "react-dom/server";
import { useRef } from "react";
import useGeolocation from "../hooks/useGeolocation";
import {
  FormControl,
  FormErrorMessage,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

function Map({ ...props }) {
  const [field, meta, form] = useField(props);

  const ZOOM_LEVEL = 23;
  const map = useRef();
  const { loading, lat, long, error } = useGeolocation();
  useEffect(() => {
    lat !== undefined &&
      long !== undefined &&
      form.setValue(lat?.toString() + "," + long?.toString());
  }, [lat, long]);
  const toast = useToast();

  const iconMarkup = renderToStaticMarkup(<ImLocation size={30} />);
  const customMarkerIcon = L.divIcon({
    html: iconMarkup,
  });

  if (error) {
    console.log(error);
    toast({
      title: error.message,
      status: "error",
      isClosable: true,
    });
    return (
      <Skeleton h="280px">
        <div>contents wrapped</div>
      </Skeleton>
    );
  }

  return !lat && !long ? (
    <Skeleton h="280px">
      <div>contents wrapped</div>
    </Skeleton>
  ) : (
    <FormControl isInvalid={meta.error}>
      <Field
        as={MapContainer}
        {...field}
        value={lat?.toString() + "," + long?.toString()}
        center={[lat, long]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "280px" }}
      >
        {/* <MapContainer
          center={[lat, long]}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "280px" }}
        > */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]} icon={customMarkerIcon}>
          <Popup>Your Location</Popup>
        </Marker>
        {/* </MapContainer> */}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default Map;
