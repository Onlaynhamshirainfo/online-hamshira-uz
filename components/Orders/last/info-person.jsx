import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "../../../utils/axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useIntl } from "react-intl";
import { changeItemsFromOrder } from "../../../redux/slice/settings";
import { convertUnixToDateWithHours } from "../../../utils/date";

export default function InfoPerson() {
  const { info, orderInfo } = useSelector((state) => state.settings);
  const intl = useIntl();
  const dispatch = useDispatch();

  const relativeId =
    typeof window !== "undefined"
      ? localStorage?.getItem("orderRelativePerson") !== "undefined"
        ? JSON.parse(localStorage?.getItem("orderRelativePerson"))
        : null
      : null;

  useEffect(() => {
    dispatch(changeItemsFromOrder());
  }, [info]);

  const dataTimes = [
    { id: 1, name: intl.formatMessage({ id: "allDate" }) },
    {
      id: 3,
      name: intl.formatMessage({ id: "currentDate" }),
      moreInputs: true,
    },
    { id: 2, name: intl.formatMessage({ id: "nowDate" }) },
  ];

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl flex flex-col gap-0 overflow-hidden">
      {/* name */}
      <div className="flex flex-row items-center gap-3 px-5 py-4 border-b-2 border-b-grey-7">
        <div className="w-6 h-6 rounded-full full__image overflow-hidden bg-grey-7">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/admin/images/defaultAvatar.png`}
            width={0}
            height={0}
            layout="responsive"
          />
        </div>
        <h3 className="font-medium text-base text-text-primary">
          {relativeId
            ? `${relativeId?.type_name} (${relativeId?.fullname})`
            : intl.formatMessage({ id: "me" })}
        </h3>
      </div>
      {/* time */}
      <div className="flex flex-row items-center gap-3 px-5 py-4 border-b-2 border-b-grey-7">
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
              fill="url(#paint0_linear_3330_232)"
            />
            <path
              d="M20 9.83997H4C3.45 9.83997 3 10.29 3 10.84V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V10.84C21 10.29 20.55 9.83997 20 9.83997ZM9.21 18.21C9.16 18.25 9.11 18.3 9.06 18.33C9 18.37 8.94 18.4 8.88 18.42C8.82 18.45 8.76 18.47 8.7 18.48C8.63 18.49 8.57 18.5 8.5 18.5C8.37 18.5 8.24 18.47 8.12 18.42C7.99 18.37 7.89 18.3 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.3 16.5 8.5 16.48 8.7 16.52C8.76 16.53 8.82 16.55 8.88 16.58C8.94 16.6 9 16.63 9.06 16.67C9.11 16.71 9.16 16.75 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21ZM9.21 14.71C9.02 14.89 8.76 15 8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.07 13.01 8.51 12.92 8.88 13.08C9.01 13.13 9.12 13.2 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71ZM12.71 18.21C12.52 18.39 12.26 18.5 12 18.5C11.74 18.5 11.48 18.39 11.29 18.21C11.11 18.02 11 17.76 11 17.5C11 17.24 11.11 16.98 11.29 16.79C11.66 16.42 12.34 16.42 12.71 16.79C12.89 16.98 13 17.24 13 17.5C13 17.76 12.89 18.02 12.71 18.21ZM12.71 14.71C12.66 14.75 12.61 14.79 12.56 14.83C12.5 14.87 12.44 14.9 12.38 14.92C12.32 14.95 12.26 14.97 12.2 14.98C12.13 14.99 12.07 15 12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.38 13.2 11.49 13.13 11.62 13.08C11.99 12.92 12.43 13.01 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71ZM16.21 18.21C16.02 18.39 15.76 18.5 15.5 18.5C15.24 18.5 14.98 18.39 14.79 18.21C14.61 18.02 14.5 17.76 14.5 17.5C14.5 17.24 14.61 16.98 14.79 16.79C15.16 16.42 15.84 16.42 16.21 16.79C16.39 16.98 16.5 17.24 16.5 17.5C16.5 17.76 16.39 18.02 16.21 18.21ZM16.21 14.71C16.16 14.75 16.11 14.79 16.06 14.83C16 14.87 15.94 14.9 15.88 14.92C15.82 14.95 15.76 14.97 15.7 14.98C15.63 14.99 15.56 15 15.5 15C15.24 15 14.98 14.89 14.79 14.71C14.61 14.52 14.5 14.26 14.5 14C14.5 13.74 14.61 13.48 14.79 13.29C14.89 13.2 14.99 13.13 15.12 13.08C15.3 13 15.5 12.98 15.7 13.02C15.76 13.03 15.82 13.05 15.88 13.08C15.94 13.1 16 13.13 16.06 13.17C16.11 13.21 16.16 13.25 16.21 13.29C16.39 13.48 16.5 13.74 16.5 14C16.5 14.26 16.39 14.52 16.21 14.71Z"
              fill="url(#paint1_linear_3330_232)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3330_232"
                x1="1.31112"
                y1="-1.04769"
                x2="26.4969"
                y2="1.34841"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1CC34B" />
                <stop offset="1" stopColor="#0057FF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_3330_232"
                x1="1.26471"
                y1="5.89922"
                x2="26.7077"
                y2="7.31656"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1CC34B" />
                <stop offset="1" stopColor="#0057FF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <h4 className="font-medium text-base text-text-primary">
          {dataTimes?.find((item) => item.id == orderInfo?.arrival_type)?.name}{" "}
          {orderInfo?.arrival_type == 3
            ? convertUnixToDateWithHours(orderInfo?.arrival_time)
            : ""}
        </h4>
      </div>
      {/* location name */}
      <div className="flex flex-row items-center gap-3 px-5 py-4 border-b-2 border-b-grey-7">
        <span>
          <svg
            width="24"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.6201 7.45C16.5701 2.83 12.5401 0.75 9.0001 0.75C9.0001 0.75 9.0001 0.75 8.9901 0.75C5.4601 0.75 1.4201 2.82 0.370095 7.44C-0.799905 12.6 2.3601 16.97 5.2201 19.72C6.2801 20.74 7.6401 21.25 9.0001 21.25C10.3601 21.25 11.7201 20.74 12.7701 19.72C15.6301 16.97 18.7901 12.61 17.6201 7.45ZM9.0001 12.46C7.2601 12.46 5.8501 11.05 5.8501 9.31C5.8501 7.57 7.2601 6.16 9.0001 6.16C10.7401 6.16 12.1501 7.57 12.1501 9.31C12.1501 11.05 10.7401 12.46 9.0001 12.46Z"
              fill="url(#paint0_linear_3333_1400)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3333_1400"
                x1="-1.59107"
                y1="-5.89353"
                x2="23.5496"
                y2="-5.07433"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1CC34B" />
                <stop offset="1" stopColor="#0057FF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <h5 className="font-medium text-base text-text-primary">
          {orderInfo?.location_name}
        </h5>
      </div>
      {/* additinal info */}
      {orderInfo?.entrance || orderInfo?.flat || orderInfo?.floor ? (
        <div className="flex flex-row items-center gap-3 px-5 py-4">
          <span>
            <svg
              width="24"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6201 7.45C16.5701 2.83 12.5401 0.75 9.0001 0.75C9.0001 0.75 9.0001 0.75 8.9901 0.75C5.4601 0.75 1.4201 2.82 0.370095 7.44C-0.799905 12.6 2.3601 16.97 5.2201 19.72C6.2801 20.74 7.6401 21.25 9.0001 21.25C10.3601 21.25 11.7201 20.74 12.7701 19.72C15.6301 16.97 18.7901 12.61 17.6201 7.45ZM9.0001 12.46C7.2601 12.46 5.8501 11.05 5.8501 9.31C5.8501 7.57 7.2601 6.16 9.0001 6.16C10.7401 6.16 12.1501 7.57 12.1501 9.31C12.1501 11.05 10.7401 12.46 9.0001 12.46Z"
                fill="url(#paint0_linear_3333_1400)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3333_1400"
                  x1="-1.59107"
                  y1="-5.89353"
                  x2="23.5496"
                  y2="-5.07433"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1CC34B" />
                  <stop offset="1" stopColor="#0057FF" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <h6 className="font-medium text-base text-text-primary">
            {orderInfo?.entrance &&
              `${intl.formatMessage({ id: "entrance" })} - ${
                orderInfo?.entrance
              }, `}

            {orderInfo?.flat &&
              `${intl.formatMessage({ id: "flat" })} - ${orderInfo?.flat}, `}

            {orderInfo?.floor &&
              `${intl.formatMessage({ id: "floor" })} - ${orderInfo?.floor}`}
          </h6>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
