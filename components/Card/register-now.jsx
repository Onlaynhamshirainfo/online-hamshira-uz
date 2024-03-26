import React from "react";
import { useIntl } from "react-intl";
import Button from "../Forms/button";
import { useDispatch } from "react-redux";
import { toggleRegisterModal } from "../../redux/slice/modals";

export default function RegisterNow() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const changeFn = () => {
    dispatch(toggleRegisterModal());
  }


  return (
    <div className="flex flex-col items-center justify-center gap-2 w-[320px] mx-auto bg-white px-5 py-8 rounded-2xl shadow-xl  text-center">
      <svg
        width="145"
        height="141"
        viewBox="0 0 145 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M72.6401 117.003C104.283 117.003 129.894 91.2405 129.894 59.455C129.894 27.6694 104.283 2 72.6401 2C41.0904 2 15.3867 27.7621 15.3867 59.5476C15.3867 91.3332 41.0904 117.003 72.6401 117.003Z"
          fill="#EAEEF9"
        />
        <path
          d="M7.12679 72.9221C9.26103 72.9221 10.9313 71.2541 10.9313 69.1227C10.9313 66.9913 9.26103 65.3232 7.12679 65.3232C4.99254 65.3232 3.32227 66.9913 3.32227 69.1227C3.32227 71.2541 5.08534 72.9221 7.12679 72.9221Z"
          fill="#EAEEF9"
        />
        <path
          d="M3.32282 60.5972C4.71472 60.5972 5.92103 59.3925 5.92103 58.0025C5.92103 56.6124 4.71472 55.4077 3.32282 55.4077C1.93092 55.4077 0.724609 56.6124 0.724609 58.0025C0.724609 59.4852 1.93092 60.5972 3.32282 60.5972Z"
          fill="#EAEEF9"
        />
        <path
          d="M139.45 82.4672C142.141 82.4672 144.275 80.3358 144.275 77.6484C144.275 74.961 142.141 72.8296 139.45 72.8296C136.759 72.8296 134.625 74.961 134.625 77.6484C134.625 80.3358 136.759 82.4672 139.45 82.4672Z"
          fill="#EAEEF9"
        />
        <circle cx="71.3417" cy="29.6049" r="2.23823" fill="#C4C4C4" />
        <g filter="url(#filter0_d_123_28)">
          <path
            d="M114.57 107.481H30.5528C27.4217 107.481 24.8125 104.894 24.8125 101.789V16.9291C24.8125 13.8245 27.4217 11.2373 30.5528 11.2373H114.57C117.701 11.2373 120.31 13.8245 120.31 16.9291V101.789C120.31 104.894 117.701 107.481 114.57 107.481Z"
            fill="url(#paint0_linear_123_28)"
          />
        </g>
        <path
          d="M71.6023 43.0341C78.195 43.0341 83.5395 37.6896 83.5395 31.0969C83.5395 24.5041 78.195 19.1597 71.6023 19.1597C65.0095 19.1597 59.665 24.5041 59.665 31.0969C59.665 37.6896 65.0095 43.0341 71.6023 43.0341Z"
          fill="#D5DDEA"
        />
        <path
          d="M71.6015 31.8431C74.0737 31.8431 76.0779 29.8389 76.0779 27.3666C76.0779 24.8943 74.0737 22.8901 71.6015 22.8901C69.1292 22.8901 67.125 24.8943 67.125 27.3666C67.125 29.8389 69.1292 31.8431 71.6015 31.8431Z"
          fill="#989FB0"
        />
        <path
          d="M80.5553 39.3072C78.3907 41.6042 75.3469 43.034 71.9754 43.034C68.6039 43.034 65.56 41.6042 63.3955 39.3072C64.5907 35.8373 67.9804 33.335 71.9754 33.335C75.9703 33.335 79.3601 35.8373 80.5553 39.3072Z"
          fill="#989FB0"
        />
        <path
          d="M104.113 61.6863H39.3174C38.543 61.6863 37.7686 60.8254 37.7686 59.9645V52.2168C37.7686 51.356 38.543 50.4951 39.3174 50.4951H104.113C104.887 50.4951 105.662 51.356 105.662 52.2168V59.9645C105.662 60.8254 104.887 61.6863 104.113 61.6863Z"
          fill="#D5DDEA"
        />
        <path
          d="M104.113 78.0998H39.3174C38.543 78.0998 37.7686 77.239 37.7686 76.3781V68.6304C37.7686 67.7695 38.543 66.9087 39.3174 66.9087H104.113C104.887 66.9087 105.662 67.7695 105.662 68.6304V76.3781C105.662 77.239 104.887 78.0998 104.113 78.0998Z"
          fill="#D5DDEA"
        />
        <path
          d="M104.05 84.8145H80.4143C79.6085 84.8145 78.8027 85.4289 78.8027 86.6577V93.4163C78.8027 94.3379 79.3399 95.2595 80.4143 95.2595H104.05C104.856 95.2595 105.661 94.6451 105.661 93.4163V86.6577C105.661 85.6849 104.856 84.8145 104.05 84.8145Z"
          fill="#D5DDEA"
        />
        <path
          d="M98.6621 89.291H86.5485C86.033 89.291 85.5176 89.6641 85.5176 90.0371C85.5176 90.4101 86.033 90.7832 86.5485 90.7832H98.6621C99.1776 90.7832 99.693 90.4101 99.693 90.0371C99.693 89.4775 99.1776 89.291 98.6621 89.291Z"
          fill="#989FB0"
        />
        <rect
          x="42.2451"
          y="54.9712"
          width="29.097"
          height="2.23823"
          fill="#989FB0"
        />
        <rect
          x="42.2451"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <rect
          x="46.7217"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <rect
          x="51.1982"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <rect
          x="55.6748"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <rect
          x="59.4053"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <rect
          x="63.8818"
          y="71.3853"
          width="2.23823"
          height="2.23823"
          rx="1.11911"
          fill="#AAB2C5"
        />
        <defs>
          <filter
            id="filter0_d_123_28"
            x="2.8125"
            y="0.237305"
            width="139.498"
            height="140.244"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="11" />
            <feGaussianBlur stdDeviation="11" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_123_28"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_123_28"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_123_28"
            x1="72.5303"
            y1="9.01109"
            x2="72.5303"
            y2="108.519"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDFEFF" />
            <stop offset="0.9964" stopColor="#ECF0F5" />
          </linearGradient>
        </defs>
      </svg>
      <h1 className="text-text-primary leading-normal font-semibold text-lg capitalize">
        {intl.formatMessage({ id: "registerNowTitle" })}
      </h1>
      <p className="text-text-secondary leading-normal font-normal text-base pb-4">
        {intl.formatMessage({ id: "registerNowBody" })}
      </p>
      <Button onClick={() => changeFn()}>
        {intl.formatMessage({ id: "registerNowButton" })}
      </Button>
    </div>
  );
}
