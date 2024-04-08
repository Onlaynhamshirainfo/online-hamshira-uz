import { useIntl } from "react-intl";
import Seo from "../components/Seo/Seo";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";
import { ReturnBack } from "../components";

export default function Home() {
  const intl = useIntl();
  const router = useRouter();

  const { data: texts } = useSWR(["license/client", router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

  return (
    <>
      <Seo
        title={"Onlayn Hamshira"}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <main className="flex flex-col gap-7 py-5">
        <div className="container">
          <ReturnBack url="" />
          <div
            className="text-text-primary leading-normal font-normal text-base"
            dangerouslySetInnerHTML={{
              __html: texts?.data?.text,
            }}
          />
        </div>
      </main>
    </>
  );
}
