import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCodeModal,
  toggleInfoModal,
  toggleOrderCancelModal,
  toggleRegisterModal,
} from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import Input from "../Forms/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../Forms/button";
import { useMask } from "@react-input/mask";
import { Checkbox, Radio, Select } from "..";
import axios, { authAxios } from "../../utils/axios";
import SwalModal from "../Helper/swal-modal";
import toast from "react-hot-toast";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import CheckboxChecked from "./components/checkbox";

export default function OrderCancel() {
  const { orderCancel, currentOrderId } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      issue_id: "",
    },
  });

  const submitFn = async (data) => {
    try {
      setReqLoading(true);
      setFormError(null);
      const response = await authAxios.post(`order/cancel`, {
        ...data,
        order_id: currentOrderId,
      });

      toast.success(response?.data?.message);

      dispatch(toggleOrderCancelModal());
      setTimeout(() => {
        router.push(`/${router.locale}/`);
      }, 500);

      reset();
    } catch (e) {
    } finally {
      setReqLoading(false);
    }
  };

  const { data: issues } = useSWR(
    ["order-cancel-issue?type=1", router.locale],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  return (
    <Wrapper
      isLogo
      active={orderCancel}
      func={() => dispatch(toggleOrderCancelModal())}
      title={intl.formatMessage({ id: "orderCancel" })}
    >
      <form
        className="flex flex-col gap-5 w-[95%]"
        onSubmit={handleSubmit(submitFn)}
      >
        {issues?.data?.map((item, index) => {
          return (
            <CheckboxChecked
              name="issue_id"
              register={register}
              key={index}
              item={item}
            />
          );
        })}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleOrderCancelModal())}
            className="p-4 bg-text-primary rounded-full text-white"
          >
            {intl.formatMessage({ id: "returnProfile" })}
          </button>
          <Button type="submit">
            {reqLoading
              ? intl.formatMessage({ id: "sending" })
              : intl.formatMessage({ id: "cancel" })}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
