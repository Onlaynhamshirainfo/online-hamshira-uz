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
                className="flex flex-row items-center justify-between"
                key={index}
              >
                <h3>
                  {item?.service?.name}
                  <span className="text-green font-semibold pl-5">+{item?.count}</span>
                  <br />{" "}
                  <span className="text-sm">[{item?.illnessCause?.name}]</span>
                </h3>
                <p className="text-green">
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
