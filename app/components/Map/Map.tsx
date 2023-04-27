"use client";

import { useRef, useState } from "react";
import MapGL, { Marker, MarkerDragEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventData, MapMouseEvent, MapboxEvent } from "mapbox-gl";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const Map = () => {
  const [viewState, setViewState] = useState({
    latitude: 50.08,
    longitude: 14.42,
    zoom: 10,
  });
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  // const [popupInfo, setPopupInfo] = useState(null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const handleClick = (evt: MapMouseEvent & EventData) => {
    const coord = evt.lngLat;
    console.log("set to:", coord);
    setMarker(coord);
  };

  const dragHandler = (evt: MarkerDragEvent & EventData) => {
    const coord = evt.lngLat;
    console.log("drag to:", coord);
    setMarker(coord);
  };

  const clickHandler = (evt: MapboxEvent<MouseEvent> & EventData) => {
    evt.originalEvent.stopPropagation();
    console.log("click to marker");
    setMarker(null);
  };

  return (
    <div ref={mapContainer}>
      <MapGL
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(evt) => handleClick(evt)}
        cursor="pointer"
        maxZoom={20}
        minZoom={3}
      >
        {marker && (
          <div>
            <Marker
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="center"
              color="red"
              draggable
              onDragEnd={(evt) => dragHandler(evt)}
              onClick={(evt) => clickHandler(evt)}
            />
          </div>
        )}

        {/* {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.marker.longitude)}
            latitude={Number(popupInfo.marker.latitude)}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            maxWidth="350px"
          >
            <div className="m-1 flex flex-col gap-1">
              <div className="flex justify-between">
                <h1 className="text-lg font-medium font-sans">PopUp</h1>
              </div>
            </div>
          </Popup>
        )} */}
      </MapGL>
    </div>
  );
};

export default Map;
