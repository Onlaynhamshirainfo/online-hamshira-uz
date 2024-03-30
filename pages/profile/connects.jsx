import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import {
  ConnectsCard,
  MainOrders,
  RegsiterNow,
  ReturnBack,
} from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

export default function Connects() {
  const router = useRouter();
  const intl = useIntl();

  const { data: relatives } = useSWR(
    ["relative/my-relatives", router.locale],
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

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "orders" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <div className="container">
        <main className="flex flex-col gap-3 py-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1 sm:gap-2">
              <ReturnBack url="profile/" isPadding />
              <h1 className="text-text-primary leading-normal font-semibold text-lg sm:text-xl">
                {intl.formatMessage({ id: "connects" })}
              </h1>
            </div>
            <a
              href={`/${router.locale}/profile/connects-add`}
              className="text-sm leading-normal block sm:bg-text-primary sm:py-2 sm:px-4 text-white rounded-full">
              <span className="sm:block hidden">
                {intl.formatMessage({ id: "addConnects" })}
              </span>
              <span className="sm:hidden block">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                    fill="#1C232C"
                  />
                </svg>
              </span>
            </a>
          </div>
          {!relatives?.data || relatives?.data?.length == 0 ? (
            <p className="text-center text-text-secondary">
              {intl.formatMessage({ id: "connectsEmpty" })}
            </p>
          ) : (
            relatives?.data?.map((item, index) => {
              return <ConnectsCard data={item} key={index} />;
            })
          )}
        </main>
      </div>
    </>
  );
}
