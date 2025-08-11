import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCodeModal,
  toggleInfoModal,
} from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import toast from "react-hot-toast";
import CodeInputs from "./components/code-inputs";
import { getItemsFromLocal } from "../../redux/slice/settings";
import { Error } from "..";

export default function CodeModal() {
  const { codeModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const submitFn = async (values) => {
    try {
      setErrors(null);
      setReqLoading(true);
      if (values?.length == 4) {
        const response = await axios.post(
          "/client/confirm?expand=contact.branch",
          {
            code: values,
            auth_key: localStorage.getItem("auth__key"),
          }
        );
        localStorage.setItem(
          "auth__info",
          JSON.stringify(response?.data?.data)
        );
        localStorage.setItem(
          "auth__key",
          response?.data?.data?.auth_key
        );
        dispatch(getItemsFromLocal());
        toast.success(intl.formatMessage({ id: "registerSuccess" }));
        setTimeout(() => {
          dispatch(toggleCodeModal());
        }, 100);
        if (response?.data?.data?.contact?.status !== 10) {
          setTimeout(() => {
            dispatch(toggleInfoModal());
          }, 300);
        }else{
          router.reload();
        }
      }
    } catch (e) {
      console.log(e);
      setErrors(e?.response?.data?.errors);
    } finally {
      setReqLoading(false);
    }
  };

  const sendSms = async () => {
    try {
      setErrors(null);
      const response = await axios.post("/client/register", {
        phone: `+${localStorage.getItem("auth__phone")}`,
      });

      localStorage.setItem("auth__key", response?.data?.data?.auth_key);
      localStorage.setItem("auth__phone", cleanedPhone);

      toast.success(intl.formatMessage({ id: "phoneSend" }));
    } catch (e) {
      setErrors(e?.response?.data);
    }
  };

  return (
    <Wrapper
      active={codeModal}
      func={() => dispatch(toggleCodeModal())}
      body={intl.formatMessage({ id: "codeMessage" })}
      title={intl.formatMessage({ id: "code" })}>
        
      <div className="flex flex-col gap-4 w-[95%]">
        <CodeInputs onSubmit={(values) => submitFn(values)} />
        <Error errors={errors} name={"code"}/>
        <Error errors={errors} name={"token"}/>
        <button onClick={() => sendSms()} className="text-base font-medium">
          {intl.formatMessage({ id: "reCodeMessage" })}
        </button>
      </div>
    </Wrapper>
  );
}
