import { useIntl } from "react-intl";
import Seo from "../../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { InfoForm, Loader, ReturnBack } from "../../../components";
import { useEffect } from "react";
import { getActiveOrderFromLocal } from "../../../redux/slice/modals";

export default function FirstStep() {
  const router = useRouter();
  const intl = useIntl();
  const { active, currentOrder } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveOrderFromLocal());
  }, []);

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "orders" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <main className="container">
        <div className="flex flex-col gap-7 py-5">
          <div className="flex flex-col items-start justify-start gap-3">
            <ReturnBack isPadding />
            <h1 className="text-text-primary leading-normal font-semibold text-xl">
              {intl.formatMessage({ id: "call_home" })}
              {/* {active == "call_home"
                : intl.formatMessage({ id: "go_clinic" })} */}
            </h1>
          </div>
          <Loader per={"25%"}/>
          <InfoForm />
        </div>
      </main>
    </>
  );
}
