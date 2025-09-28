import React, {useEffect, useState} from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";

const MapWithPlacemark = ({ onLocationSelect, mapHeight = 0 }) => {
  const [placemarkGeometry, setPlacemarkGeometry] = useState(null);
  const [placemarkClass, setPlaceMarkClass] = useState("default-placemark");
  const [location, setLocation] = useState({
    latitude: 41.309904782261114,
    longitude: 69.27991414120805,
  });

  // const handleMapClick = (event) => {
  //   setPlacemarkGeometry(event.get("coords"));
  //   onLocationSelect(event.get("coords"));
  // };

  const handleGeoLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPlacemarkGeometry([latitude, longitude]);
      onLocationSelect([latitude, longitude]);
    });
  };
  const handleBoundsChange = (event) => {
    const mapInstance = event.get('target');
    const newCenter = mapInstance.getCenter(); // Получаем центр карты
    setPlacemarkGeometry(newCenter);
    onLocationSelect(newCenter);
  };

  function handleActionStart(_) {
    setPlaceMarkClass("placemark-action");
  }

  function handleActionEnd(_) {
    setPlaceMarkClass("default-placemark");
  }



  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          onLocationSelect([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          // setError(err.message);
          console.log(err);
        }
      );
    } else {
      // setError('Геолокация недоступна в этом браузере');
    }
  }, []);
  // h-[320px]
  // md:h-[400px]
  return (
    <div className={`w-full h-[${mapHeight}] overflow-hidden rounded-2xl relative`}>
      <YMaps>
        <Map
          defaultState={{ center: [location.latitude, location.longitude], zoom: 16 }}
          width="100%"
          height={mapHeight}
          options={{ mapType: "yandex#hybrid" }}
          // onClick={handleMapClick}
          onBoundsChange={handleBoundsChange}
          onActionBegin={handleActionStart}
          onActionEnd={handleActionEnd}
        >
          {/*{placemarkGeometry && (*/}
          {/*  <Placemark*/}
          {/*    geometry={placemarkGeometry}*/}
          {/*    options={{*/}
          {/*      iconLayout: "default#image",*/}
          {/*      iconImageHref: "/images/PIN.png",*/}
          {/*      iconImageSize: [36, 60],*/}
          {/*      iconImageOffset: [-15, -40],*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          <ZoomControl options={{ float: "right" }} />
          <GeolocationControl
            options={{ float: "right" }}
            onClick={handleGeoLocationClick}
          />
        </Map>
      </YMaps>
      <img alt={"map-marker"} src={"/images/PIN.png"} className={`placemark ${placemarkClass}`} width={46} height={93} />
    </div>
  );
};

export default MapWithPlacemark;
