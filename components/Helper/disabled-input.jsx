import React from "react";
import { useIntl } from "react-intl";

export default function DisabledInput({
  title,
  value,
  part,
  items,
  price,
  total,
}) {
  const intl = useIntl();
  return (
    <div className="flex flex-col items-start justify-between p-5 bg-white rounded-3xl w-full gap-3">
      <h2 className="text-text-primary leading-normal font-semibold text-sm">
        {title}:
      </h2>
      {items ? (
        <div className="flex flex-col gap-5 text-text-secondary leading-normal font-medium text-sm w-full bg-slate-100 p-2 sm:p-5 rounded-md">
          <div className="flex flex-row items-center justify-between">
            <h3>{intl.formatMessage({ id: "homeServices" })}</h3>
            <p className="text-green">
              {price} {intl.formatMessage({ id: "sum" })}
            </p>
          </div>
          {items?.map((item, index) => {
            return (
              <div
                className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0 xs:border-transparent border-b border-grey-5 pb-3 xs:pb-0"
                key={index}
              >
                <h3>
                  {item?.service?.name}
                  <span className="text-green font-semibold pl-5">
                    +{item?.count}
                  </span>
                  <br />{" "}
                  <span className="text-sm">[{item?.illnessCause?.name}]</span>
                </h3>
                <p className="text-green flex flex-row items-center gap-2">
                  <span className="xs:hidden block">
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.86158 3.75H11.9993C12.1286 3.75013 12.2533 3.79952 12.3491 3.88859C12.445 3.97767 12.5052 4.10009 12.5181 4.23214L12.8365 7.5H11.7864L11.5254 4.82143H9.86158V6.42857C9.86158 6.57065 9.80659 6.70691 9.70871 6.80738C9.61084 6.90784 9.47808 6.96429 9.33966 6.96429C9.20124 6.96429 9.06849 6.90784 8.97061 6.80738C8.87274 6.70691 8.81775 6.57065 8.81775 6.42857V4.82143H4.64243V6.42857C4.64243 6.57065 4.58745 6.70691 4.48957 6.80738C4.39169 6.90784 4.25894 6.96429 4.12052 6.96429C3.9821 6.96429 3.84935 6.90784 3.75147 6.80738C3.65359 6.70691 3.59861 6.57065 3.59861 6.42857V4.82143H1.9337L1.09864 13.3929H6.73009V14.4643H0.521399C0.448502 14.4642 0.376429 14.4485 0.309822 14.4181C0.243216 14.3877 0.183554 14.3433 0.13468 14.2877C0.0858055 14.2322 0.0488036 14.1668 0.0260577 14.0957C0.00331184 14.0246 -0.00467354 13.9494 0.00261619 13.875L0.942062 4.23214C0.954991 4.10009 1.01521 3.97767 1.11106 3.88859C1.2069 3.79952 1.33155 3.75013 1.46084 3.75H3.59861V3.37607C3.59861 1.51821 4.99316 0 6.73009 0C8.46702 0 9.86158 1.51821 9.86158 3.37607V3.75107V3.75ZM8.81775 3.75V3.37607C8.81775 2.09679 7.87622 1.07143 6.73009 1.07143C5.58397 1.07143 4.64243 2.09679 4.64243 3.37607V3.75107H8.81775V3.75ZM12.1027 11.85L10.9054 10.6221V14.4643C10.9054 14.6064 10.8504 14.7426 10.7525 14.8431C10.6547 14.9436 10.5219 15 10.3835 15C10.2451 15 10.1123 14.9436 10.0144 14.8431C9.91656 14.7426 9.86158 14.6064 9.86158 14.4643V10.6221L8.66535 11.85C8.61721 11.9012 8.55961 11.942 8.49594 11.9701C8.43226 11.9981 8.36378 12.0129 8.29448 12.0135C8.22518 12.0141 8.15645 12.0006 8.09231 11.9737C8.02817 11.9467 7.9699 11.9069 7.92089 11.8566C7.87189 11.8063 7.83314 11.7465 7.8069 11.6807C7.78065 11.6149 7.76745 11.5443 7.76805 11.4732C7.76865 11.402 7.78305 11.3317 7.8104 11.2664C7.83776 11.201 7.87752 11.1419 7.92736 11.0925L10.015 8.94964C10.1129 8.84921 10.2456 8.79279 10.384 8.79279C10.5224 8.79279 10.6551 8.84921 10.753 8.94964L12.8407 11.0925C12.8905 11.1419 12.9303 11.201 12.9576 11.2664C12.985 11.3317 12.9994 11.402 13 11.4732C13.0006 11.5443 12.9874 11.6149 12.9611 11.6807C12.9349 11.7465 12.8961 11.8063 12.8471 11.8566C12.7981 11.9069 12.7399 11.9467 12.6757 11.9737C12.6116 12.0006 12.5428 12.0141 12.4735 12.0135C12.4043 12.0129 12.3358 11.9981 12.2721 11.9701C12.2084 11.942 12.1508 11.9012 12.1027 11.85Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  {item?.price} {intl.formatMessage({ id: "sum" })}
                </p>
              </div>
            );
          })}
          <div className="flex flex-row items-center justify-between font-semibold">
            <h3>{intl.formatMessage({ id: "total" })}</h3>
            <p className="text-green">
              {total} {intl.formatMessage({ id: "sum" })}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-text-secondary leading-normal font-medium text-sm w-full bg-slate-100 p-3  rounded-md">
          {value} {part}
        </p>
      )}
    </div>
  );
}
