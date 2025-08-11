import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import { MainProfile, NewsCard, RegsiterNow, ReturnBack, Settings } from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

export default function News() {
  const router = useRouter();
  const intl = useIntl();
  const { info, news } = useSelector((state) => state.settings);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(1);

  const { data: newsBase } = useSWR(
    ["news/index?expand=description", router.locale],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "news" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <div className="container">
        <main className="flex flex-col gap-7 py-5">
          <ReturnBack url="profile/connects" isPadding />

          <h1 className="text-text-primary leading-normal font-semibold text-lg sm:text-xl text-center">
            {intl.formatMessage({ id: "news" })}
          </h1>
          <div className="flex flex-row items-end gap-5 sm:gap-10">
            <button
              type="button"
              className={`${active == 1 ? "border-b-2 border-b-green" : ""}`}
              onClick={() => setActive(1)}
            >
              {intl.formatMessage({ id: "news" })}
            </button>
            <button
              type="button"
              className={`${active == 2 ? "border-b-2 border-b-green" : ""}`}
              onClick={() => setActive(2)}
            >
              {intl.formatMessage({ id: "archive" })}
            </button>
          </div>
          <div className={`${active == 1 ? "flex flex-col gap-4" : "hidden"}`}>
            {newsBase?.data?.items ? (
              newsBase?.data?.items?.map((item, index) => {
                return <NewsCard data={item} key={index} />;
              })
            ) : (
              <p className="text-center text-sm sm:text-base text-text-secondary">
                {intl.formatMessage({ id: "newsBody" })}
              </p>
            )}
          </div>
          <div className={`${active == 2 ? "flex flex-col gap-4" : "hidden"}`}>
            {news?.length !== 0 ? (
              news?.map((item, index) => {
                return <NewsCard data={item} key={index} />;
              })
            ) : (
              <p className="text-center text-sm sm:text-base text-text-secondary">
                {intl.formatMessage({ id: "newsBody" })}
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
