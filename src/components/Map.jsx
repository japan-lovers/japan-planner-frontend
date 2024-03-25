import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback } from "react";
import CardActivity from "./CardActivity";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const containerStyle = {
  width: "1180px",
  height: "500px",
  margin: "0px 40px 0px 40px",
};

// const center = {
//   lat: 36.0,
//   lng: 138.0,
// };

function Map({ activities, zoomStart, center }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [centerMap, setCenterMap] = useState(center);
  const [markerPositions, setMarkerPositions] = useState([
    {
      lat: 35.626330828,
      lng: 139.8749965,
    },
  ]);

  const [selectedMarker, setSelectedMarker] = useState("");
  const [zoom, setZoom] = useState(zoomStart);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    map.setZoom(zoomStart);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (markerPosition) => {
    setSelectedMarker(markerPosition);
    setCenterMap(markerPosition.geometry);
    setZoom(10);
  };

  const handleCloseInfo = () => {
    setSelectedMarker(null);
    setZoom(9);
  };

  return (
    <div className="basis-1 ">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerMap}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {activities.map((markerPosition) => {
            {
              console.log(markerPosition);
            }
            return (
              <div key={markerPosition.name}>
                <Marker
                  position={markerPosition.geometry}
                  onClick={() => {
                    handleMarkerClick(markerPosition);
                  }}
                />
                ;
                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker.geometry}
                    onCloseClick={handleCloseInfo}
                  >
                    <div>
                      <CardHeader floated={false} color="blue-gray">
                        <Link to={`/activities/${selectedMarker._id}`}>
                          <img
                            className="w-full h-64 md:h-48 md:w-64 object-cover"
                            src={selectedMarker.image}
                            alt={selectedMarker.name}
                          />
                        </Link>
                        <div>
                          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />

                          {selectedMarker.free && (
                            <Typography
                              color="white"
                              className="!absolute top-2 left-2 bg-gray-900 px-2 text-xs font-semibold rounded-full"
                            >
                              FREE
                            </Typography>
                          )}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-semibold text-lg"
                          >
                            {selectedMarker.name}
                          </Typography>
                        </div>
                        <span className="text-xs font-medium">
                          {selectedMarker.location}
                        </span>
                        <div className="group mt-4 flex justify-between items-center gap-3">
                          <Typography
                            color="white"
                            className="px-2 rounded-full text-xs h-4 bg-gray-900 font-white font-semibold"
                          >
                            {selectedMarker.category}
                          </Typography>
                          <Link to={`/activities/${selectedMarker._id}`}>
                            <button
                              color="gray"
                              className="btn btn-xs btn-ghost text-xs font-semibold"
                            >
                              View details
                            </button>
                          </Link>
                        </div>
                      </CardBody>
                    </div>
                  </InfoWindow>
                )}
              </div>
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
}

export default Map;
