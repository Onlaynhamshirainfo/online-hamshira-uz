import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";

export default function OrderCardHome({ data, white }) {
  const intl = useIntl();
  return (
    <div
      className={`flex flex-row items-center justify-between  rounded-2xl ${
        white ? "linear text-white" : "bg-white text-text-primary shadow-sm"
      } p-5 w-full min-h-[110px]`}
    >
      <div className="flex flex-row items-center gap-3 sm:gap-5">
        <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden full__image">
          <Image
            src={`${
              data?.nurse
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE}${data?.nurse?.photo}`
                : "/images/going-nurse.svg"
            }`}
            alt=""
            width={0}
            height={0}
            layout="responsive"
          />
        </div>
        <div className="flex flex-col sm:gap-1">
          <h2 className="leading-normal font-medium text-sm sm:text-base flex-1">
            {data?.nurse
              ? data?.nurse?.first_name + ` ` + data?.nurse?.last_name
              : intl.formatMessage({ id: "nurseNot" })}
          </h2>
          <div className="flex flex-row items-center gap-1">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.32275 3.16683C7.32275 1.96446 8.29747 0.989746 9.49984 0.989746C10.7022 0.989746 11.6769 1.96446 11.6769 3.16683C11.6769 4.3692 10.7022 5.34391 9.49984 5.34391C8.29747 5.34391 7.32275 4.3692 7.32275 3.16683Z"
                fill="#FDD14D"
              />
              <path
                d="M6.51011 9.16311L4.788 8.58908C4.29263 8.42395 3.9585 7.96037 3.9585 7.4382C3.9585 6.66587 4.67062 6.09018 5.42581 6.252L6.92805 6.57391C7.01159 6.59181 7.05336 6.60076 7.09477 6.60933C8.68157 6.93755 10.3188 6.93755 11.9056 6.60933C11.947 6.60076 11.9887 6.59181 12.0723 6.57391L13.5745 6.252C14.3297 6.09018 15.0418 6.66587 15.0418 7.4382C15.0418 7.96037 14.7077 8.42395 14.2123 8.58908L12.4902 9.16311C12.2821 9.23248 12.178 9.26717 12.0998 9.31547C11.8333 9.47997 11.6888 9.7861 11.7313 10.0964C11.7437 10.1875 11.7831 10.2899 11.8618 10.4946L12.8489 13.0609C13.1427 13.8249 12.5788 14.6459 11.7603 14.6459C11.3418 14.6459 10.9553 14.4216 10.7477 14.0583L9.50016 11.8751L8.25263 14.0583C8.04498 14.4216 7.65853 14.6459 7.24 14.6459C6.42151 14.6459 5.85762 13.8249 6.15144 13.0609L7.13848 10.4946C7.21723 10.2899 7.2566 10.1875 7.26906 10.0964C7.31149 9.7861 7.16702 9.47997 6.90053 9.31547C6.82228 9.26717 6.71822 9.23248 6.51011 9.16311Z"
                fill="#FDD14D"
              />
              <path
                d="M9.50016 17.4165C13.8724 17.4165 17.4168 15.8215 17.4168 13.854C17.4168 12.4908 15.7155 11.3065 13.2162 10.7075L13.9572 12.6342C14.5502 14.1759 13.4122 15.8329 11.7603 15.8329C10.9156 15.8329 10.1357 15.3803 9.71665 14.6469L9.50016 14.2681L9.28367 14.6469C8.86459 15.3803 8.08468 15.8329 7.24 15.8329C5.58815 15.8329 4.45011 14.1759 5.04309 12.6342L5.7841 10.7075C3.28484 11.3065 1.5835 12.4908 1.5835 13.854C1.5835 15.8215 5.12791 17.4165 9.50016 17.4165Z"
                fill="#FDD14D"
              />
            </svg>
            <span className="text-sm sm:text-[14px] leading-normal font-medium flex-1">
              {data?.status?.string}
            </span>
          </div>
        </div>
      </div>
      <div className="w-10 sm:w-14 h-10 sm:h-14 bg-white overflow-hidden rounded-full flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16.8292V11.1625C21 10.1189 21 9.5971 20.7169 9.20427C20.4881 8.88694 20.1212 8.71828 19.4667 8.49121C19.3328 10.0974 18.8009 11.7377 17.9655 13.1734C16.9928 14.845 15.5484 16.3395 13.697 17.1472C12.618 17.6179 11.382 17.6179 10.303 17.1472C8.45164 16.3395 7.00718 14.845 6.03449 13.1734C5.40086 12.0844 4.9418 10.8778 4.69862 9.65752C4.31607 9.60117 4.0225 9.63008 3.76917 9.77142C3.66809 9.82781 3.57388 9.89572 3.48841 9.97378C3 10.4199 3 11.2493 3 12.9082V17.8379C3 18.8815 3 19.4033 3.28314 19.7961C3.56627 20.189 4.06129 20.354 5.05132 20.684L5.43488 20.8118L5.43489 20.8118C7.01186 21.3375 7.80035 21.6003 8.60688 21.6018C8.8498 21.6023 9.09242 21.5851 9.33284 21.5503C10.131 21.4347 10.8809 21.0597 12.3806 20.3099C13.5299 19.7352 14.1046 19.4479 14.715 19.3146C14.9292 19.2678 15.1463 19.2352 15.3648 19.2169C15.9875 19.1648 16.6157 19.2695 17.8721 19.4789C19.1455 19.6911 19.7821 19.7972 20.247 19.5303C20.4048 19.4396 20.5449 19.321 20.6603 19.1802C21 18.7655 21 18.1201 21 16.8292Z"
            fill="url(#paint0_linear_105_20)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C8.68629 2 6 4.55211 6 7.70031C6 10.8238 7.91499 14.4687 10.9028 15.7721C11.5993 16.076 12.4007 16.076 13.0972 15.7721C16.085 14.4687 18 10.8238 18 7.70031C18 4.55211 15.3137 2 12 2ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
            fill="url(#paint1_linear_105_20)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_105_20"
              x1="1.26471"
              y1="4.24239"
              x2="26.7187"
              y2="5.55752"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1CC34B" />
              <stop offset="1" stopColor="#0057FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_105_20"
              x1="4.84314"
              y1="-2.53704"
              x2="21.8401"
              y2="-1.98878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1CC34B" />
              <stop offset="1" stopColor="#0057FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
