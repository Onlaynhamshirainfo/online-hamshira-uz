import { useIntl } from "react-intl";
import Seo from "../../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CurrentMap, InfoForm, Loader, ReturnBack } from "../../../components";
import {useEffect, useState} from "react";
import { getActiveOrderFromLocal } from "@/redux/slice/modals";
import CancelOrder from "../../../components/Helper/cancel-order";

export default function SecondStep() {
  const router = useRouter();
  const intl = useIntl();
  // const { active, currentOrder } = useSelector((state) => state.modals);
  const [mapHeight, setMapHeight] = useState(0);

  const dispatch = useDispatch();
  function remToPx(rem) {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return rem * rootFontSize;
  }



  function resizeListener() {
    const back = document.querySelector(".header-back-container");
    const loader = document.querySelector(".map-loader");
    const btn = document.querySelector(".map-btn");
    const space = remToPx(1.75);
    setMapHeight(window.innerHeight - (back.clientHeight + loader.clientHeight + btn.clientHeight + 35 + (space * 4)));
  }

  useEffect(() => {
    const handleResize = () => resizeListener();
    dispatch(getActiveOrderFromLocal());
    window.addEventListener("resize", handleResize);
    resizeListener();

    return () => window.removeEventListener("resize", handleResize);
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
          {/* <div className="flex flex-col items-start justify-start gap-3">
            <ReturnBack isPadding url="orders/create/first-step/" isRouter/>
            <h1 className="text-text-primary leading-normal font-semibold text-xl">
              {intl.formatMessage({ id: "call_home" })}
            </h1>
          </div> */}
          <CancelOrder url="orders/create/first-step/" isRouter/>
          <Loader per={"50%"}/>
          <CurrentMap mapHeight={mapHeight} />
        </div>
      </main>
    </>
  );
}
