import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { OrderCardHome, RegsiterNow } from "..";

export default function MainOrders({ info }) {
  const intl = useIntl();
  const router = useRouter();

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

  if(!info){
    return  <RegsiterNow />
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <h1 className="text-text-primary leading-normal font-semibold text-lg sm:text-xl">
            {intl.formatMessage({ id: "orderTitle" })}
          </h1>
          {!orders?.data || orders?.data?.length == 0 ? (
            <p className="text-text-secondary leading-normal font-normal text-base">
              {intl.formatMessage({ id: "orderEmpty" })}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col w-full gap-3">
          {orders?.data ? (
            orders?.data?.map((item, index) => {
              return <OrderCardHome data={item} key={index} />;
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
