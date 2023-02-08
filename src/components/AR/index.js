import "./AR.css";
import React, { useEffect, useState } from "react";
import Image from "./assets/asset.jpeg";
let imageLocation = {
  lat: 10.792069407607704,
  long: 106.65632318705322,
};

var scene = document.createElement("iframe");
const AR = ({ handleTakePhoto }) => {
  const [myLocation, setMyLocation] = useState({
    lat: 0,
    long: 0,
  });
  function measure(lat1, lon1, lat2, lon2) {
    var R = 6378.137;
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
  }
  let metter = measure(
    imageLocation.lat,
    imageLocation.long,
    myLocation.lat,
    myLocation.long
  );
  // console.log('mylocation', myLocation);
  // console.log('distance', metter);
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      setMyLocation({
        lat: 10.792069407607704,
        long: 106.65632318705322,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <></>;
};

export default AR;
