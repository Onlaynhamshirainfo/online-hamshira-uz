import React from "react";
import { HelpCardHome, Title } from "..";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import Skeleton from "react-loading-skeleton";

export default function HelpHome() {
  const intl = useIntl();
  const router = useRouter();
  const { data: helps } = useSWR(
    ["speciality/index?expand=price", router.locale],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  if (!helps?.data || helps?.data?.length == 0) {
    return (
      <div className="container">
        <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <Skeleton height={"120px"} borderRadius={"16px"} />
          <Skeleton height={"120px"} borderRadius={"16px"} />
          <Skeleton height={"120px"} borderRadius={"16px"} />
          <Skeleton height={"120px"} borderRadius={"16px"} />
          <Skeleton height={"120px"} borderRadius={"16px"} />
          <Skeleton height={"120px"} borderRadius={"16px"} />
        </div>
      </div>
    );
  }

  return (
    <section className="container flex flex-col gap-3">
      <Title>{intl.formatMessage({ id: "helpTitle" })}</Title>
      <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {helps?.data?.map((item, index) => {
          return <HelpCardHome data={item} key={index} />;
        })}
      </div>
    </section>
  );
}
