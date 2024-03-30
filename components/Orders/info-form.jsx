import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Dropdown, File } from "..";
import Selection from "./components/selection";
import Button from "../Forms/button";

export default function InfoForm() {
  const intl = useIntl();
  const router = useRouter();
  const [reqLoading, setReqLoading] = useState(false);
  const { info } = useSelector((state) => state.settings);
  const { currentOrder } = useSelector((state) => state.modals);
  const [formError, setFormError] = useState(null);
  // const [errors, setErrors] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      relative_id: "",
    },
  });

  const { data: relatives } = useSWR(
    ["relative/my-relatives", router.locale],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  const { data: reasons } = useSWR(
    [`illness-cause/list?speciality_id=${currentOrder?.id}`, router.locale],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  const submitFn = async (data) => {
    localStorage.setItem("orderReasons", JSON.stringify(data?.reason || {}));
    localStorage.setItem("orderRelatives", JSON.stringify(data?.relative_id));
    localStorage.setItem(
      "orderRelativePerson",
      JSON.stringify(
        relatives?.data?.find((item) => item.id == data?.relative_id)
      )
    );
    router.push(`/${router.locale}/orders/create/second-step`);
  };

  const handleGetImages = (images) => {
    const imageNames = images.map((image) => image.name);
    localStorage.setItem("orderImages", JSON.stringify(imageNames));
  };

  const relativesData = [info];
  if (relatives?.data) {
    relativesData?.push(...relatives?.data);
  }

  const transformedRelativesData = relativesData.map((rel) => ({
    id: rel?.id,
    name: rel?.first_name ? intl.formatMessage({ id: "me" }) : rel?.type_name,
    photo: rel?.photo ? rel?.photo : "/admin/images/defaultAvatar.png",
  }));

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(submitFn)}>
      <Dropdown
        data={transformedRelativesData}
        id={"relative_id"}
        name={"relative_id"}
        register={register}
        errors={formError}
        currentDrop={info}
        title={intl.formatMessage({ id: "bemor" })}
      />
      <Dropdown
        typeDropdown={"moreSelection"}
        data={reasons?.data}
        id={"reason"}
        name={"reason"}
        register={register}
        errors={formError}
        currentDrop={info}
        title={intl.formatMessage({ id: "reason" })}
      />
      <File
        id={"images"}
        isMultiple
        name={"images"}
        title={intl.formatMessage({ id: "moreImages" })}
        getImages={handleGetImages}
      />
      <Button type="submit">{intl.formatMessage({ id: "continue" })}</Button>
    </form>
  );
}
