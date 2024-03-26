import { useIntl } from "react-intl";
import axios, { authAxios } from "../../../utils/axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { DisabledInput, ReturnBack, Title } from "../../../components";
import { useDispatch } from "react-redux";
import { convertUnixToDateWithHours } from "../../../utils/date";
import Button from "../../../components/Forms/button";
import { toggleOrderCancelModal } from "../../../redux/slice/modals";

function page({ info, params }) {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

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
    <section className="container">
      <ReturnBack url={""} />
      <main className="flex flex-col items-start leading-normal gap-3 sm:gap-5">
        <Title>{intl.formatMessage({ id: "orderInfo" })}</Title>
        <div className="w-full flex flex-col gap-3">
          <DisabledInput
            title={intl.formatMessage({ id: "bemor" })}
            value={
              info?.relative?.type_name || intl.formatMessage({ id: "me" })
            }
          />
          <DisabledInput
            title={intl.formatMessage({ id: "orderStatus" })}
            value={info?.status?.string}
          />
          <DisabledInput
            title={intl.formatMessage({ id: "chooseDate" })}
            value={`${
              dataTimes?.find((item) => item.id == info?.arrival_type)?.name
            }`}
            part={
              info?.arrival_time
                ? convertUnixToDateWithHours(info?.arrival_time)
                : ""
            }
          />
          <DisabledInput
            title={intl.formatMessage({ id: "reasons" })}
            value={info?.speciality?.name}
          />
          <DisabledInput
            title={intl.formatMessage({ id: "location" })}
            value={info?.location_name}
          />
          <DisabledInput
            title={intl.formatMessage({ id: "address" })}
            value={`${info?.entrance}-${intl.formatMessage({
              id: "entrance",
            })}, ${info?.floor}-${intl.formatMessage({ id: "floor" })}, ${
              info?.flat
            }-${intl.formatMessage({ id: "flat" })}`}
          />
          <DisabledInput
            title={intl.formatMessage({ id: "services" })}
            items={info?.orderItems}
            price={info?.speciality_price}
            total={info?.price}
          />
          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"> */}
          <Button onClick={() => dispatch(toggleOrderCancelModal(info?.id))}>
            {intl.formatMessage({ id: "cancel" })}
          </Button>
          {/* </div> */}
        </div>
      </main>
    </section>
  );
}
export async function getServerSideProps({ params, locale }) {
  // fetch product
  const info = await authAxios
    .get(
      `client-order/view?id=${params?.id?.[0]}&expand=nurse,contact,relative,speciality,address,orderItems,orderPatientPictures`,
      {
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${params?.id?.[1]}`,
        },
      }
    )
    .then((res) => res?.data?.data)
    .catch((err) => console.error(err));

  if (!info) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      info,
      params,
    },
  };
}

export default page;
