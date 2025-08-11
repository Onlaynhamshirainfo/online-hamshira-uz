import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { OrderCardHome, RegsiterNow } from "..";

export default function MainOrders({ info }) {
  const intl = useIntl();
  const router = useRouter();
  const [active, setActive] = useState(0);

  const { data: orders } = useSWR(
    [
      "client-order/list?expand=nurse,contact,relative,speciality,address,orderItems,orderPatientPictures",
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

  const handleTabs = (tab) => {
    setActive(tab);
  };

  const filteredOrders = orders?.data?.filter((order) => {
    if (active === 0) {
      return true;
    } else {
      return order.status.int === active;
    }
  });

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <h1 className="text-text-primary leading-normal font-semibold text-lg sm:text-xl">
          {intl.formatMessage({ id: "orderTitle" })}
        </h1>
        <div className="flex flex-row flex-wrap items-end justify-center gap-5 sm:gap-10 text-text-primary text-sm sm:text-base font-medium overflow-x-auto">
          <button
            type="button"
            className={`${active == 0 ? "border-b-2 border-b-green" : ""}`}
            onClick={() => handleTabs(0)}
          >
            {intl.formatMessage({ id: "all" })}
          </button>
          <button
            type="button"
            className={`${active == 10 ? "border-b-2 border-b-green" : ""}`}
            onClick={() => handleTabs(10)}
          >
            {intl.formatMessage({ id: "progress" })}
          </button>
          <button
            type="button"
            className={`${active == 12 ? "border-b-2 border-b-green" : ""}`}
            onClick={() => handleTabs(12)}
          >
            {intl.formatMessage({ id: "done" })}
          </button>
        </div>

        {!orders?.data || orders?.data?.length == 0 ? (
          <p className="text-text-secondary text-sm sm:text-base leading-normal text-center font-normal text-base mt-32">
            {intl.formatMessage({ id: "orderEmpty" })}
          </p>
        ) : (
          <></>
        )}

        <div className="flex flex-col w-full gap-3">
          {filteredOrders ? (
            filteredOrders?.map((item, index) => {
              return (
                <a
                  href={`/${router.locale}/orders/single/${
                    item?.id
                  }/${localStorage.getItem("auth__key")}`}
                >
                  <OrderCardHome data={item} />
                </a>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
