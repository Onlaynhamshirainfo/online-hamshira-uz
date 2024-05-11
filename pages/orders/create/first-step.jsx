import { useIntl } from "react-intl";
import Seo from "../../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { InfoForm, Loader, ReturnBack } from "../../../components";
import { useEffect } from "react";
import { getActiveOrderFromLocal } from "../../../redux/slice/modals";
import CancelOrder from "../../../components/Helper/cancel-order";

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
          <CancelOrder />
          <Loader per={"25%"} />
          <InfoForm />
        </div>
      </main>
    </>
  );
}
