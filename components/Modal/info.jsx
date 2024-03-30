import React, { useState } from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfoModal } from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import Input from "../Forms/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../Forms/button";
import { Dropdown } from "..";
import axios from "../../utils/axios";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import CheckboxChecked from "./components/checkbox";
import { converUnivDate } from "../../utils/date";
import toast from "react-hot-toast";

export default function InfoModal() {
  const { infoModal } = useSelector((state) => state.modals);
  const { info } = useSelector((state) => state.settings);
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
      // first_name: info?.first_name ?? "",
      // last_name: info?.last_name ?? "",
      // gender: Number(info?.contact?.gender) ?? "",
      // branch_id: Number(info?.contact?.branch?.id) ?? "",
      // birthday: info?.contact?.born ?? "",
      first_name: "",
      last_name: "",
      gender: "",
      branch_id: "",
      born: "",
      // photo: "",
    },
  });

  const submitFn = async (data) => {
    try {
      setReqLoading(true);
      setFormError(null);
      const date = converUnivDate(data?.born)
      const response = await axios.post(
        `client/fill-data?expand=contact.branch`,
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          gender: Number(data?.gender),
          branch_id: Number(data?.branch_id),
          born: Number(date),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth__key")}`,
          },
        }
      );

      localStorage.setItem("auth__info", JSON.stringify(response?.data?.data));
      localStorage.setItem("auth__key", response?.data?.data?.auth_key);
      toast.success(intl.formatMessage({ id: "infoSuccess" }));
      setTimeout(() => {
        dispatch(toggleInfoModal());
      }, 100);

      reset();
    } catch (e) {
      toast.error(e?.response?.data?.name);
      setFormError(e?.response?.data?.errors)
    } finally {
      setReqLoading(false);
    }
  };

  const { data: branches } = useSWR(["branch/index", router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

  // gender data
  const gender = [
    { id: 6, name: intl.formatMessage({ id: "men" }) },
    { id: 8, name: intl.formatMessage({ id: "women" }) },
  ];

  return (
    <Wrapper
      isLogo
      active={infoModal}
      func={() => dispatch(toggleInfoModal())}
      title={intl.formatMessage({ id: "info" })}
    >
      <form
        className="flex flex-col gap-4 w-[95%]"
        onSubmit={handleSubmit(submitFn)}
      >
        {/* <Input
          type="file"
          placeholder={intl.formatMessage({ id: "firstName" })}
          name={"first_name"}
          id="first_name"
          register={register}
          errors={formError}
        /> */}
        <Input
          type="text"
          placeholder={intl.formatMessage({ id: "firstName" })}
          name={"first_name"}
          id="first_name"
          register={register}
          errors={formError}
        />
        <Input
          type="text"
          placeholder={intl.formatMessage({ id: "lastName" })}
          name={"last_name"}
          id="last_name"
          register={register}
          errors={formError}
        />
        <Input
          type="date"
          placeholder={intl.formatMessage({ id: "birthday" })}
          name={"born"}
          id="born"
          register={register}
          errors={formError}
        />
        <Dropdown
          data={branches?.data}
          register={register}
          name={"branch_id"}
          title={intl.formatMessage({ id: "city" })}
          isLogo
          typeDropdown={"city"}
        />
        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-5">
          <h3 className="text-text-secondary xs:px-2 xs:py-1 text-base">
            {intl.formatMessage({ id: "gender" })}:
          </h3>
          {gender?.map((item, index) => {
            return (
              <CheckboxChecked
                name={"gender"}
                key={index}
                item={item}
                register={register}
              />
            );
          })}
        </div>
        <Button type="submit">
          {reqLoading
            ? intl.formatMessage({ id: "loading" })
            : intl.formatMessage({ id: "continue" })}
        </Button>
      </form>
    </Wrapper>
  );
}
