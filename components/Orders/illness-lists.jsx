import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { Dropdown } from "..";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecialistPrices,
  handleTotalSum,
} from "../../redux/slice/services";
import Button from "../Forms/button";

export default function IllnessLists() {
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const { defaultSum, totalSum, currentPrice } = useSelector(
    (state) => state.services
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTotalSum());
    dispatch(getSpecialistPrices());
  }, []);

  const services =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("orderReasons"))
      : null;

  const { data: illness } = useSWR(
    [
      `illness-cause/by-ids?expand=services&${
        typeof services == "string"
          ? `ids[]=${services}`
          : services
              ?.map(
                (item, i) =>
                  `ids[]=${item}${i === services.length - 1 ? "" : "&"}`
              )
              .join("")
      }`,
      router.locale,
    ],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  const continouFn = () => {
    localStorage.setItem("illness__lists", JSON.stringify(currentPrice));
    localStorage.setItem("total__price", totalSum);
    router.push(`/${router.locale}/orders/create/last-step`);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-5 w-full">
      <div className="p-5 bg-white rounded-3xl flex items-center justify-between w-full text-text-primary">
        <h3 className="font-semibold text-sm sm:text-base">
          {intl.formatMessage({ id: "homeServices" })}
        </h3>
        <p className="text-green font-medium text-sm sm:text-base">
          {defaultSum} {intl.formatMessage({ id: "sum" })}
        </p>
      </div>
      {illness?.data ? (
        illness?.data?.map((item, index) => {
          return (
            <Dropdown
              data={item}
              key={index}
              typeDropdown={"illness"}
              name={"items"}
            />
          );
        })
      ) : (
        <></>
      )}
      <div className="p-5 bg-white rounded-3xl flex items-center justify-between w-full text-text-primary mt-20">
        <h3 className="font-semibold text-sm sm:text-base">
          {intl.formatMessage({ id: "total" })}:
        </h3>
        <p className="text-green font-semibold text-sm sm:text-base">
          {totalSum} {intl.formatMessage({ id: "sum" })}
        </p>
      </div>
      <Button onClick={continouFn}>
        {intl.formatMessage({ id: "continue" })}
      </Button>
    </div>
  );
}
