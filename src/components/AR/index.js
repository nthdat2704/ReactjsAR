import "./AR.css";
import React, { useEffect, useState } from "react";
import Image from "./assets/asset.jpeg";
// import "aframe";
// import "aframe-react";
require("aframe-htmlembed-component");
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
    imageLocation.long
    // myLocation.lat,
    // myLocation.long
  );
  // console.log("sss", myLocation);
  const handleClickMe = () => {
    alert("cliicked ...");
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
          gps-entity-place="latitude: 10.766166099909617; longitude: 106.68597812357707;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766332429562654; longitude: 106.68615918603793;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766190139820953; longitude: 106.68616455045596;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766026770034669; longitude: 106.68612699952975;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765947720106265; longitude: 106.6859553381528;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766638088780597; longitude: 106.68559055772677;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766427838417393; longitude: 106.6851051896265;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765946512291654; longitude: 106.6848906129053;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765633826132591; longitude: 106.68534122401981;"
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
      {/* <a-scene
        embedded
        loading-screen="enabled: false;"
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766166099909617; longitude: 106.68597812357707;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766332429562654; longitude: 106.68615918603793;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766190139820953; longitude: 106.68616455045596;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766026770034669; longitude: 106.68612699952975;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765947720106265; longitude: 106.6859553381528;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766638088780597; longitude: 106.68559055772677;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.766427838417393; longitude: 106.6851051896265;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765946512291654; longitude: 106.6848906129053;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.765633826132591; longitude: 106.68534122401981;"
        ></a-image>
        <a-image
          src="https://www.shutterstock.com/image-vector/pikachu-vector-art-illustration-on-260nw-2163481879.jpg"
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place="latitude: 10.7673448148506; longitude: 106.68676815921573;"
        ></a-image>
        <a-camera
          gps-camera="simulateLatitude: 10.7673448148506; simulateLongitude: 106.68676815921573;"
          rotation-reader
        ></a-camera>
      </a-scene> */}
    </div>
  );
};

export default AR;
