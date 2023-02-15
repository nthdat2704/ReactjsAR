import "./AR.css";
import React, { useEffect, useState } from "react";
import Image from "./assets/asset.jpeg";
import { useRef } from "react";
// import "aframe";
// import "aframe-react";
require("aframe-htmlembed-component");

var scene = document.createElement("iframe");
const AR = ({ handleTakePhoto }) => {
  const [myLocation, setMyLocation] = useState({
    lat: 0,
    long: 0,
  });
  const refLat = useRef();
  const refLong = useRef();
  const refPosition = useRef();
  const refToPosition = useRef();
  const refScale = useRef();
  const refRotation = useRef();
  const [myControl, setMyControl] = useState({
    lat: "10.76630080962586",
    long: "106.68534379449738",
    position: "0 0 -10",
    toposition: "0 3 -10",
    scale: "1 1 1",
    rotation: "0 0 0",
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
  // console.log('distance', metter);
  const handleGetMyControl = () => {
    let lat = refLat.current.value;
    let long = refLong.current.value;
    let position = refPosition.current.value;
    let toposition = refToPosition.current.value;
    let scale = refScale.current.value;
    let rotation = refRotation.current.value;
    setMyControl({
      lat: lat,
      long: long,
      position: position,
      toposition: toposition,
      scale: scale,
      rotation: rotation,
    });
  };
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
      <div className="mycontrol">
        <h2 className="myloca">
          now:
          {measure(
            myControl.lat,
            myControl.long,
            myLocation.lat,
            myLocation.long
          )}
        </h2>
        <div className="block-input">
          <span>lat:</span>
          <input ref={refLat} type="text" defaultValue={myControl.lat} />
          {myControl.lat}
        </div>
        <div className="block-input">
          <span>long:</span>
          <input ref={refLong} type="text" defaultValue={myControl.long} />
          {myControl.long}
        </div>
        <div className="block-input">
          <span>posiition:</span>
          <input
            ref={refPosition}
            type="text"
            defaultValue={myControl.position}
          />
          {myControl.position}
        </div>
        <div className="block-input">
          <span>Toposiition:</span>
          <input
            ref={refToPosition}
            type="text"
            defaultValue={myControl.toposition}
          />
          {myControl.toposition}
        </div>
        <div className="block-input">
          <span>scale:</span>
          <input ref={refScale} type="text" defaultValue={myControl.scale} />
          {myControl.scale}
        </div>
        <div className="block-input">
          <span>rotation:</span>
          <input
            ref={refRotation}
            type="text"
            defaultValue={myControl.rotation}
          />
          {myControl.rotation}
        </div>
        <button onClick={handleGetMyControl}>change</button>
      </div>
      <a-scene
        id="scene"
        cursor="rayOrigin: mouse"
        vr-mode-ui={`enabled: true`}
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-sphere
          position={myControl.position}
          radius="0.5"
          scale={myControl.scale}
          rotation={myControl.rotation}
          gps-entity-place={`latitude: ${myControl.lat}; longitude: ${myControl.long};`}
          look-at="[gps-camera]"
          color="#EF2D5E"
          arjs="sourceType: webcam; debugUIEnabled: false;"
          animation={`property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: ${myControl.toposition}; loop: true`}
        ></a-sphere>
        <a-camera
          // gps-camera
          gps-camera={`simulateLatitude: ${myControl.lat}; simulateLongitude: ${myControl.long}`}
          rotation-reader
        ></a-camera>
      </a-scene>
    </div>
  );
};

export default AR;
