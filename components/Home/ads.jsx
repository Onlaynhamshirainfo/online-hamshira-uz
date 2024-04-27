import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import React from "react";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import { useIntl } from "react-intl";

export default function Ads() {
  const router = useRouter();
  const intl = useIntl();
  const { data: ads } = useSWR(["story/index", router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

  if (ads?.data?.length == 0) {
    return null;
  }

  if (!ads?.data) {
    return (
      <section className="container flex flex-row items-center justify-start gap-3 overflow-x-scroll scroll__none">
        <Skeleton width={"100px"} height={"90px"} borderRadius={"12px"} />
        <Skeleton width={"100px"} height={"90px"} borderRadius={"12px"} />
        <Skeleton width={"100px"} height={"90px"} borderRadius={"12px"} />
      </section>
    );
  }

  return (
    <section className="container flex flex-row items-center justify-start gap-3 overflow-x-scroll scroll__none">
      {console.log(ads)}
      {ads?.data?.map((item, index) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${item.icon}`}
            target="_blank"
            key={index}
            className="overflow-hidden rounded-xl">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${item.icon}`}
              alt={item.name}
              title={item.name}
              width={"100px"}
              height={"90px"}
            />
          </a>
        );
      })}
      {/* <div
        className="flex flex-row items-center justify-center w-[100px] h-[90px] bg-grey-7 rounded-xl"
        title={intl.formatMessage({ id: "unsubscribeBody" })}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1133 14.116C13.6132 14.6162 13.3324 15.2945 13.3325 16.0018C13.3326 16.709 13.6137 17.3873 14.1139 17.8873C14.6141 18.3873 15.2925 18.6682 15.9997 18.668C16.707 18.6679 17.3852 18.3868 17.8853 17.8866"
            stroke="#7F7F7F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.2413 22.2307C20.371 23.4009 18.2062 24.0146 16 24C11.2 24 7.2 21.3333 4 16C5.696 13.1733 7.616 11.096 9.76 9.768M13.5733 8.24C14.3721 8.07831 15.1851 7.9979 16 8C20.8 8 24.8 10.6667 28 16C27.112 17.48 26.1613 18.756 25.1493 19.8267M4 4L28 28"
            stroke="#7F7F7F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div> */}
    </section>
  );
}
