import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import { MainOrders, RegsiterNow } from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Orders() {
  const router = useRouter();
  const intl = useIntl();
  const { info } = useSelector((state) => state.settings);

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "orders" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <main className="flex flex-col gap-7 py-5">
        <MainOrders info={info}/>
      </main>
    </>
  );
}
