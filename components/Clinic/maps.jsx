"use strict";
import React, { useEffect, useMemo, useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function Maps({ data }) {
  return (
    <div className="container ">
      <div className="w-full h-[320px] sm:h-[480px] rounded-2xl relative z-0 overflow-hidden border-2 border-grey-3 maps">
        <YMaps className="absolute top-0 left-0 z-1">
          <Map
            defaultState={{ center: [data?.latitude, data?.longitude], zoom: 8 }}
            width={"100%"}
            height={"100%"}>
            <Placemark
              geometry={[data?.latitude, data?.longitude]}
              options={{
                iconLayout: "default#image",
                iconImageHref: "/images/PIN.png",
                iconImageSize: [36, 60],
                iconImageOffset: [-15, -40],
              }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
