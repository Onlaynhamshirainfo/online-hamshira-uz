import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAdsModal,
  toggleCancelOrderingModal,
} from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

export default function CancelOrdering() {
  const { cancelOrderingModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();

  const quitFn = () => {
    dispatch(toggleCancelOrderingModal());
    localStorage.removeItem("currentMap");
    localStorage.removeItem("orderReasons");
    localStorage.removeItem("orderDates");
    localStorage.removeItem("currentOrder");
    localStorage.removeItem("orderRelativePerson");
    localStorage.removeItem("currentMapDetails");
    setTimeout(() => {
      router.push(`/`);
    }, 100);
  };

  return (
    <Wrapper
      active={cancelOrderingModal}
      isLogo
      func={() => dispatch(toggleCancelOrderingModal())}
      title={intl.formatMessage({ id: "titleCancelOrder" })}
      body={intl.formatMessage({ id: "bodyCancelOrder" })}
    >
      <div className="grid grid-cols-2 justify-center gap-4 w-full">
        <button
          onClick={() => dispatch(toggleCancelOrderingModal())}
          className="bg-grey-7 p-5 rounded-lg text-[14px] font-medium"
        >
          {intl.formatMessage({ id: "return" })}
        </button>
        <button
          onClick={() => quitFn()}
          className="bg-red-600 rounded-lg text-white text-[14px] font-medium"
        >
          {intl.formatMessage({ id: "yes" })}
        </button>
      </div>
    </Wrapper>
  );
}
