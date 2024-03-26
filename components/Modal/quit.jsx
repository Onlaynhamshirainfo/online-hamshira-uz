import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleQuitModal } from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

export default function CodeModal() {
  const { quitModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();

  const quitFn = () => {
    toast.success(intl.formatMessage({ id: "quitSuccess" }));
    dispatch(toggleQuitModal());
    localStorage.clear();
    setTimeout(() => {
      router.push(`/`);
      router.reload();
    }, 100);
  };

  return (
    <Wrapper
      active={quitModal}
      isLogo
      func={() => dispatch(toggleQuitModal())}
      body={intl.formatMessage({ id: "quitBody" })}
      title={intl.formatMessage({ id: "quit" })}>
      <div className="grid grid-cols-2 justify-center gap-4 w-full">
        <button
          onClick={() => dispatch(toggleQuitModal())}
          className="bg-grey-7 p-5 rounded-lg text-[14px] font-medium">
          {intl.formatMessage({ id: "return" })}
        </button>
        <button
          onClick={() => quitFn()}
          className="bg-red-600 rounded-lg text-white text-[14px] font-medium">
          {intl.formatMessage({ id: "quit" })}
        </button>
      </div>
    </Wrapper>
  );
}
