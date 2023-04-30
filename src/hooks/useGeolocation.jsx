import { useEffect } from "react";
import { useState } from "react";

const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(undefined);
  const [long, setLong] = useState(undefined);
  const [error, setError] = useState(undefined);

  const onSuccess = (location) => {
    setLoading(false);
    setLat(location.coords.latitude);
    setLong(location.coords.longitude);
  };

  const onError = (err) => {
    setLoading(false);
    setError(err);
  };

  useEffect(() => {
    setLoading(true);
    // if (!('geolocation' in navigator)) {
    //   onError({message: "Geolocation not supported"});
    // }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return {
    loading,
    lat,
    long,
    error,
  };
};

export default useGeolocation;
