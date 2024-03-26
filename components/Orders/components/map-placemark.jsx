import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapWithPlacemark = ({ onLocationSelect }) => {
  const [placemarkGeometry, setPlacemarkGeometry] = useState(null);

  const handleMapClick = (event) => {
    setPlacemarkGeometry(event.get("coords"));
    onLocationSelect(event.get("coords"));
  };

  return (
    <div className="w-full h-[320px] md:h-[400px] overflow-hidden rounded-2xl">
      <YMaps>
        <Map
          defaultState={{ center: [40.9, 69.9], zoom: 8 }}
          width="100%"
          height="100%"
          options={{ mapType: "yandex#hybrid" }}
          onClick={handleMapClick}>
          {placemarkGeometry && (
            <Placemark
              geometry={placemarkGeometry}
              options={{
                iconLayout: "default#image",
                iconImageHref: "/images/PIN.png",
                iconImageSize: [36, 60],
                iconImageOffset: [-15, -40],
              }}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapWithPlacemark;
