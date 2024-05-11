import React, { useState } from "react";
import MapWithPlacemark from "./components/map-placemark";
import { useIntl } from "react-intl";
import { authAxios } from "../../utils/axios";
import Button from "../Forms/button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function CurrentMap() {
  const [locationDetails, setLocationDetails] = useState(null);
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);

  const handleLocationSelect = async (location) => {
    try {
      const response = await authAxios.get(
        `elasticsearch/send?lat=${location?.[0]}&lon=${location?.[1]}`
      );
      setLocationDetails(response?.data?.display_name || "Displayed Map Name");
      if (!response?.data?.branch) {
        toast.error(intl.formatMessage({ id: "notBranch" }));
        setReqLoading(true);
      } else {
        setReqLoading(false);
        localStorage.setItem(
          "currentMap",
          response?.data?.display_name || "Displayed Map Name"
        );
        localStorage.setItem(
          "currentMapDetails",
          JSON.stringify(response?.data) || "Displayed Map Name"
        );
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const submitFn = () => {
    if (locationDetails === null) {
      toast.error(intl.formatMessage({ id: "selectMap" }));
    } else {
      router.push(`/${router.locale}/orders/create/third-step`);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex flex-col lg:flex-row justify-start text-text-primary">
        <h2 className="font-semibold text-base ">
          {intl.formatMessage({ id: "chooseMap" })}
        </h2>
        <p className="font-normal">{locationDetails}</p>
      </div> */}
      <MapWithPlacemark onLocationSelect={handleLocationSelect} />
      <Button type="button" onClick={() => submitFn()} disabled={reqLoading}>
        {intl.formatMessage({ id: "continue" })}
      </Button>
    </div>
  );
}
