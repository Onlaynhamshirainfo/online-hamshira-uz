"use strict";
import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { ClinicCard, RegsiterNow } from "../../components";

export default function Clinics() {
  const router = useRouter();
  const intl = useIntl();
  const { info } = useSelector((state) => state.settings);

  const { data: clinics } = useSWR(
    ["clinic/index?expand=description", router.locale],
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
        title={intl.formatMessage({ id: "hospitals" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <div className="container">
        <main className="flex flex-col gap-7 py-5">
          {info ? (
            clinics?.data ? (
              clinics?.data?.items?.map((item, index) => {
                return <ClinicCard data={item} key={index} />;
              })
            ) : (
              <></>
            )
          ) : (
            <RegsiterNow />
          )}
        </main>
      </div>
    </>
  );
}
