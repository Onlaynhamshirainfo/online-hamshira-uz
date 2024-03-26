import React from "react";
import { OrderCardHome, OrderHomeSkeleton, Title } from "..";
import { useIntl } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";

export default function OrdersHome() {
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

  if (!orders?.data || orders?.data == 0) {
    return null;
  }

  return (
    <section className="w-full 2xl:w-[1200px] mx-auto pl-5 2xl:px-0 flex flex-col gap-3">
      <Title count={orders?.data?.length}>{intl.formatMessage({ id: "OrdersTitleHome" })}</Title>
      <div className="w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 12,
            },
            576: {
              slidesPerView: 1.2,
            },
            850: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 1,
            },
          }}
          className="orders"
        >
          {orders?.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <a href={`/${router.locale}/orders/single/${item?.id}/${localStorage.getItem("auth__key")}`}>
                  <OrderCardHome data={item} white />
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* <OrderHomeSkeleton /> */}
      </div>
    </section>
  );
}
