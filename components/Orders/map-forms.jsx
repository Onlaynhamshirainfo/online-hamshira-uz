import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Dropdown, File, Textarea } from "..";
import Selection from "./components/selection";
import Button from "../Forms/button";
import Input from "../Forms/Input";
import { convertUnixFormat } from "../../utils/date";
import toast from "react-hot-toast";

export default function InfoForm() {
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const { info } = useSelector((state) => state.settings);
  const { currentOrder } = useSelector((state) => state.modals);
  const [formError, setFormError] = useState(null);
  const [displayedName, getDisplayedName] = useState("");
  const [moreInputs, setMoreInputs] = useState(false);
  // const [errors, setErrors] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    let disName =
      typeof window !== "undefined" ? localStorage.getItem("currentMap") : "";
    getDisplayedName(disName);
  }, []);

  const submitFn = async (data) => {
    const { date, hour, arrival_type, flat, floor, entrance, info_for_nurse } =
      data;
    const newData = {
      arrival_type: Number(arrival_type),
      flat,
      floor,
      entrance,
      info_for_nurse,
      arrival_time: convertUnixFormat(date, hour),
    };
    if (!arrival_type) {
      toast.error(intl.formatMessage({ id: "dateError" }));
    } else {
      localStorage.setItem("orderDates", JSON.stringify(newData));
      const reasons = JSON.parse(localStorage.getItem("orderReasons"));
      if (reasons?.length > 0) {
        router.push(`/${router.locale}/orders/create/fourth-step`);
      } else {
        router.push(`/${router.locale}/orders/create/last-step`);
      }
    }
  };

  const dataTimes = [
    { id: 1, name: intl.formatMessage({ id: "allDate" }) },
    {
      id: 3,
      name: intl.formatMessage({ id: "currentDate" }),
      moreInputs: true,
    },
    { id: 2, name: intl.formatMessage({ id: "nowDate" }) },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-3 sm:gap-5 bg-white p-5 rounded-3xl overflow-hidden">
        <span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.38 13.176C2.60278 13.1092 2.84225 13.1361 3.04573 13.2509C3.24921 13.3656 3.40002 13.5589 3.465 13.788C3.52998 14.0171 3.5038 14.2635 3.39221 14.4727C3.28063 14.682 3.09278 14.8372 2.87 14.904C2.4325 15.0354 2.1175 15.174 1.91538 15.3C2.12363 15.4287 2.45262 15.5727 2.90937 15.7068C3.92 16.0038 5.36638 16.2 7 16.2C8.63362 16.2 10.08 16.0038 11.0906 15.7068C11.5482 15.5727 11.8764 15.4287 12.0846 15.3C11.8834 15.174 11.5684 15.0354 11.1309 14.904C10.9116 14.8342 10.7278 14.6786 10.619 14.4707C10.5102 14.2628 10.4852 14.0193 10.5494 13.7926C10.6135 13.5659 10.7617 13.3743 10.962 13.2589C11.1623 13.1436 11.3986 13.1138 11.62 13.176C12.2045 13.3515 12.74 13.5765 13.1513 13.8654C13.5319 14.1345 14 14.6034 14 15.3C14 16.0047 13.5205 16.4772 13.1338 16.7463C12.7155 17.0361 12.1686 17.262 11.571 17.4375C10.3653 17.793 8.75 18 7 18C5.25 18 3.63475 17.793 2.429 17.4375C1.83137 17.262 1.2845 17.0361 0.86625 16.7463C0.4795 16.4763 0 16.0047 0 15.3C0 14.6034 0.468125 14.1345 0.84875 13.8654C1.26 13.5765 1.7955 13.3515 2.38 13.176ZM7 0C8.74048 0 10.4097 0.711159 11.6404 1.97703C12.8711 3.2429 13.5625 4.95979 13.5625 6.75C13.5625 9.0612 12.3375 10.9404 11.0687 12.276C10.5644 12.8015 10.0224 13.2874 9.44737 13.7295C8.92762 14.1309 7.73938 14.8833 7.73938 14.8833C7.51401 15.0151 7.25923 15.0843 7 15.0843C6.74077 15.0843 6.48599 15.0151 6.26062 14.8833C5.67067 14.532 5.10043 14.1468 4.55263 13.7295C3.97735 13.2877 3.43535 12.8018 2.93125 12.276C1.6625 10.9404 0.4375 9.0612 0.4375 6.75C0.4375 4.95979 1.1289 3.2429 2.35961 1.97703C3.59032 0.711159 5.25952 0 7 0ZM7 4.95C6.53587 4.95 6.09075 5.13964 5.76256 5.47721C5.43437 5.81477 5.25 6.27261 5.25 6.75C5.25 7.22739 5.43437 7.68523 5.76256 8.02279C6.09075 8.36036 6.53587 8.55 7 8.55C7.46413 8.55 7.90925 8.36036 8.23744 8.02279C8.56563 7.68523 8.75 7.22739 8.75 6.75C8.75 6.27261 8.56563 5.81477 8.23744 5.47721C7.90925 5.13964 7.46413 4.95 7 4.95Z"
              fill="#1CC34B"
            />
          </svg>
        </span>
        <h2>{displayedName ? displayedName : ""}</h2>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        onSubmit={handleSubmit(submitFn)}
      >
        <Input
          type="text"
          placeholder={intl.formatMessage({ id: "entrance" })}
          name={"entrance"}
          id="entrance"
          register={register}
          errors={formError}
          required={false}
        />
        <Input
          type="text"
          placeholder={intl.formatMessage({ id: "floor" })}
          name={"floor"}
          id="floor"
          register={register}
          errors={formError}
          required={false}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            type="text"
            placeholder={intl.formatMessage({ id: "flat" })}
            name={"flat"}
            id="flat"
            register={register}
            errors={formError}
            required={false}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Dropdown
            typeDropdown={"date"}
            data={dataTimes}
            id={"arrival_type"}
            name={"arrival_type"}
            register={register}
            errors={formError}
            required={false}
            title={intl.formatMessage({ id: "chooseDate" })}
            getArrivalTypes={(types) => setMoreInputs(types)}
          />
          {moreInputs ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 pt-5 gap-5">
              <Input
                type="date"
                placeholder={intl.formatMessage({ id: "date" })}
                name={"date"}
                id="date"
                register={register}
                errors={formError}
              />
              <Input
                type="time"
                placeholder={intl.formatMessage({ id: "hour" })}
                name={"hour"}
                id="hour"
                format="HH:mm"
                register={register}
                errors={formError}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Textarea
            type="text"
            placeholder={intl.formatMessage({ id: "infoPlaceholder" })}
            label={intl.formatMessage({ id: "info_for_nurse" })}
            name={"info_for_nurse"}
            id="info_for_nurse"
            register={register}
            errors={formError}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Button type="submit">
            {intl.formatMessage({ id: "continue" })}
          </Button>
        </div>
      </form>
    </div>
  );
}
