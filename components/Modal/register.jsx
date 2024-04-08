import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleCodeModal, toggleRegisterModal } from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import Input from "../Forms/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../Forms/button";
import { useMask } from "@react-input/mask";
import { Checkbox } from "..";
import axios from "../../utils/axios";
import SwalModal from "../Helper/swal-modal";
import toast from "react-hot-toast";

export default function RegisterModal() {
  const { registerModal } = useSelector((state) => state.modals);
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const resetForm = () => {
    inputRef.current.value = "";
    setErrors(null);
  };

  const submitFn = async (event) => {
    event.preventDefault();
    try {
      setErrors(null);
      setReqLoading(true);
      const cleanedPhone = inputRef?.current?.value.replace(/\D/g, "");
      const response = await axios.post("/client/register", {
        phone: `+${cleanedPhone}`,
      });

      localStorage.setItem("auth__key", response?.data?.data?.auth_key);
      localStorage.setItem("auth__phone", cleanedPhone);

      toast.success(intl.formatMessage({ id: "phoneSend" }));
      setTimeout(() => {
        dispatch(toggleRegisterModal());
        dispatch(toggleCodeModal());
      }, 100);
      resetForm();
    } catch (e) {
      console.log(e);
      setErrors(e?.response?.data?.errors);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <Wrapper
      active={registerModal}
      func={() => dispatch(toggleRegisterModal())}
      title={intl.formatMessage({ id: "Enter" })}
      body={intl.formatMessage({ id: "phoneMessage" })}
    >
      <form className="flex flex-col gap-4 w-[95%]" onSubmit={submitFn}>
        <div className="relative z-0">
          <input
            ref={inputRef}
            placeholder={"+998 (__) ___-__-__"}
            required
            id="phone"
            name="phone"
            autoComplete="off"
            className="px-5 py-4 border-grey-5 border bg-white  w-full placeholder:leading-normal placeholder:text-text-secondary placeholder:font-normal placeholder:text-base
               focus:border-green rounded-full"
          />
          {errors ? (
            <span className="pl-5 text-red-500 text-sm">
              {errors?.["phone"]?.[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row justify-between gap-2 pl-2">
          <Checkbox />
          <div className="w-[1px] bg-text-primary"></div>
          <p className="flex-1 text-sm">
            <a
              href={`/${router.locale}/license`}
              className="text-green font-medium"
            >
              Ommaviy oferta
            </a>{" "}
            va{" "}
            <a
              href={`/${router.locale}/license`}
              className="text-green font-medium"
            >
              maxfiylik siyosati
            </a>{" "}
            shartlari bilan tanishdim hamda roziligimni bildiraman.
          </p>
        </div>
        <Button type="submit">
          {reqLoading
            ? intl.formatMessage({ id: "sending" })
            : intl.formatMessage({ id: "continue" })}
        </Button>
      </form>
    </Wrapper>
  );
}
