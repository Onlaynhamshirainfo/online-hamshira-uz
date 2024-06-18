import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdsModal, toggleSliderModal } from "../../../redux/slice/modals";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";

export default function AdsModal() {
  const { adsModal, adsModalId } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const router = useRouter();
  const swiperRef = useRef();
  const intl = useIntl();

  const { data: slides } = useSWR(
    [`story/view?id=${adsModalId}&expand=storyImages`, router.locale],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  const slideNextFn = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const currentIndex = swiper.activeIndex;
      const slidesCount = swiper.slides.length;
      // if (currentIndex === slidesCount - 1) {
      //   setTimeout(() => {
      //     toast.success(intl.formatMessage({ id: "welcome" }));
      //   }, 200);
      //   setTimeout(() => {
      //     dispatch(toggleSliderModal());
      //   }, 500);
      // } else {
      // }
      swiper.slideNext();
    }
  };

  // useEffect(() => {
  //   if (!slides?.data || slides?.data === 0) {
  //     dispatch(toggleSliderModal());
  //   }
  // }, [slides]);

  // if (!slides?.data || slides?.data === 0) {
  //   return null;
  // }

  return (
    <Wrapper
      active={adsModal}
      func={() => dispatch(toggleAdsModal())}
      type={"slider"}
      titleAds={"ads"}
    >
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        ref={swiperRef}
        className="slider__modal ads w-full h-full"
      >
        {slides?.data?.storyImages?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={`w-full h-full relative z-0 bg-grey-7 after:absolute after:w-full after:h-full after:bg-black ${item?.description ? "after:opacity-50" : "after:opacity-0"} after:top-0 after:left-0 after:z-0`}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE}${item?.picture})`,
                backgroundSize: `cover`,
              }}
            >
              <div className="w-11/12 small:w-[85%] mx-auto h-full flex flex-col items-center justify-end gap-2 text-white text-center pb-14 relative z-10">
                <p className="leading-normal font-medium text-lg">
                  {item?.description}
                </p>
                {
                  item?.button_text ? 
                  <a href={item?.button_url} className="block py-3 px-20 rounded-3xl font-medium text-base linear">{item?.button_text}</a>
                  :
                  <></>
                }
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
}
