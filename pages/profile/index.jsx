import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import {
  LoaderPage,
  MainProfile,
  RegsiterNow,
  Settings,
} from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Profile() {
  const router = useRouter();
  const intl = useIntl();
  const { info } = useSelector((state) => state.settings);

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "profile" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <main className="flex flex-col gap-7 py-5">
        {info ? (
          <>
            <MainProfile info={info} />
            <Settings />
          </>
        ) : (
          <RegsiterNow />
        )}
      </main>
    </>
  );
}
