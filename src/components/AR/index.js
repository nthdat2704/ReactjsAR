import "./AR.css";
import React, { useEffect, useState } from "react";
import Image from "./assets/asset.jpeg";
// import "aframe";
// import "aframe-react";
require("aframe-htmlembed-component");
let imageLocation = {
  lat: 10.766106,
  long: 106.686038,
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

  // console.log("sss", myLocation);
  const handleClickMe = () => {
    let metter = measure(
      imageLocation.lat,
      imageLocation.long,
      myLocation.lat,
      myLocation.long
    );
    if (metter < 12) {
      alert(`done...${metter}`);
    } else {
      alert(`chua chinh xac...${metter}`);
    }
  };
  console.log("mylocation", myLocation);
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
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
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

  return (
    <div id="AR">
      <h2 className="myloca">lat:{myLocation.lat}</h2>
      <h2 className="myloca">long:{myLocation.long}</h2>
      <a-scene
        id="scene"
        cursor="rayOrigin: mouse"
        vr-mode-ui={`enabled: true`}
        look-controls
        gps-camera-debug
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766106; longitude: 106.686038;"
        ></a-image>
        <a-entity
          id="menu"
          htmlembed="ppu:60"
          position="-3 2.5 -4.476"
          rotation="0 45 0"
          arjs="sourceType: webcam; debugUIEnabled: false;"
        >
          <h1 onClick={handleClickMe}>kakakkakakakak</h1>
        </a-entity>
        <a-camera
          // gps-camera="simulateLatitude: 10.7673448148506; simulateLongitude: 106.68676815921573;"
          // gps-camera
          gps-camera={`simulateLatitude: ${myLocation.lat}; simulateLongitude:  ${myLocation.long};`}
          rotation-reader
        ></a-camera>
      </a-scene>
      <button className="clickok" onClick={handleClickMe}>
        Click ok
      </button>
    </div>
  );
};

export default AR;
