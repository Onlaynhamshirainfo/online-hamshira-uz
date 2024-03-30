import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleSliderModal } from "../../../redux/slice/modals";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";

export default function SliderModal() {
  const { sliderModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const router = useRouter();
  const swiperRef = useRef();
  const intl = useIntl();

  const { data: slides } = useSWR(["slider/index?id=0", router.locale], (url) =>
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
      if (currentIndex === slidesCount - 1) {
        setTimeout(() => {
          toast.success(intl.formatMessage({ id: "welcome" }));
        }, 200);
        setTimeout(() => {
          dispatch(toggleSliderModal());
        }, 500);
      } else {
        swiper.slideNext();
      }
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
      active={sliderModal}
      func={() => dispatch(toggleSliderModal())}
      type={"slider"}>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        ref={swiperRef}
        className="slider__modal w-full h-full">
        {slides?.data?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full h-full bg-grey-7"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE}${item?.url})`,
                backgroundSize: `cover`,
              }}>
              <div className="w-11/12 small:w-[85%] mx-auto h-full flex flex-col items-center justify-end gap-2 text-white text-center pb-[140px] ">
                <h1 className="leading-normal font-bold text-xl sm:text-2xl">
                  {item?.title}
                </h1>
                <p className="leading-normal font-normal text-[14px]">
                  {item?.description}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        type="button"
        className="absolute bottom-5 left-2/4 translate-x-[-50%] z-20 bg-white w-16 h-16 rounded-xl flex items-center justify-center"
        onClick={() => slideNextFn()}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.2401 25.0935C18.9867 25.0935 18.7334 25.0002 18.5334 24.8002C18.1467 24.4135 18.1467 23.7735 18.5334 23.3868L25.9201 16.0002L18.5334 8.61349C18.1467 8.22682 18.1467 7.58682 18.5334 7.20016C18.9201 6.81349 19.5601 6.81349 19.9467 7.20016L28.0401 15.2935C28.4267 15.6802 28.4267 16.3202 28.0401 16.7068L19.9467 24.8002C19.7467 25.0002 19.4934 25.0935 19.2401 25.0935Z"
            fill="#242424"
          />
          <path
            d="M27.1067 17H4.66675C4.12008 17 3.66675 16.5467 3.66675 16C3.66675 15.4533 4.12008 15 4.66675 15H27.1067C27.6534 15 28.1067 15.4533 28.1067 16C28.1067 16.5467 27.6534 17 27.1067 17Z"
            fill="#242424"
          />
        </svg>
      </button>
    </Wrapper>
  );
}
