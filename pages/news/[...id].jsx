import { useIntl } from "react-intl";
import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { DateTranslate } from "../../utils/date";
import { ReturnBack } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { changeAllNews, findCurrentNews } from "../../redux/slice/settings";

function page({ info, params }) {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.settings);

  const changeFn = () => {
    dispatch(changeAllNews(info));
  };
  return (
    <section className="container">
      <ReturnBack url={"profile/news"} />
      <main className="flex flex-col items-start leading-normal gap-3 sm:gap-5">
        <div className="w-full h-[240px] sm:h-[360px] full__image rounded-2xl overflow-hidden relative z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${info?.picture}`}
            width={0}
            height={0}
            layout="responsive"
          />

          {/* save */}
          <button
            className={`w-14 h-14 rounded-full ${
              news?.find((item) => item.id == info?.id) ? "linear" : "bg-grey-3"
            } absolute top-5 right-5 flex flex-row items-center justify-center shadow-xl`}
            onClick={() => changeFn()}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 0.833328H17.5V19.1667L10 13.5417L2.5 19.1667V0.833328ZM4.16667 2.49999V15.8333L10 11.4583L15.8333 15.8333V2.49999H4.16667Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <span className="px-3 py-2 linear rounded-full text-sm text-white">
          {DateTranslate(info?.created_at)}
        </span>
        <h1 className="text-text-primary font-semibold text-lg">
          {info?.title}
        </h1>
        <p className="text-text-secondary leading-normal font-normal text-base pb-5">
          {info?.description}
        </p>
      </main>
    </section>
  );
}
export async function getServerSideProps({ params, locale }) {
  // fetch product
  const info = await axios
    .get(`news/view?id=${params?.id}&expand=description`, {
      headers: {
        "Accept-Language": locale,
      },
    })
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
