import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "../../../utils/axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useIntl } from "react-intl";
import { changeItemsFromOrder } from "../../../redux/slice/settings";
import {
  getSpecialistPrices,
  handleTotalSum,
} from "../../../redux/slice/services";

export default function InfoIllness() {
  const { info, orderInfo } = useSelector((state) => state.settings);
  const { defaultSum } = useSelector((state) => state.services);
  const intl = useIntl();
  const dispatch = useDispatch();
  const totalSum =
    typeof window !== "undefined" ? localStorage.getItem("total__price") : "";

  useEffect(() => {
    dispatch(getSpecialistPrices());
    dispatch(handleTotalSum());
  });

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl flex flex-col gap-8 overflow-hidden p-7">
      <div className="flex flex-row items-center justify-between">
        <h4 className="font-semibold text-base text-text-primary">
          {intl.formatMessage({ id: "homeServices" })}
        </h4>
        <p className="font-medium text-base text-text-primary">
          {defaultSum} {intl.formatMessage({ id: "sum" })}
        </p>
      </div>
      {orderInfo?.items?.map((item, index) => {
        return (
          <div
            className="flex flex-row items-center justify-between"
            key={index}
          >
            <h5 className="font-medium text-base text-text-primary">
              {item?.name} <span className="text-green">+{item?.count}</span>
            </h5>
            <p className="font-normal text-base text-text-primary">
              {item?.price} {intl.formatMessage({ id: "sum" })}
            </p>
          </div>
        );
      })}
      <div className="flex flex-row items-center justify-between">
        <h4 className="font-semibold text-base text-text-primary">
          {intl.formatMessage({ id: "total" })}
        </h4>
        <p className="font-semibold text-base text-green">
          {totalSum || defaultSum} {intl.formatMessage({ id: "sum" })}
        </p>
      </div>
    </div>
  );
}
