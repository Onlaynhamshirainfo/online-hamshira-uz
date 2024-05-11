import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { Dropdown, File } from "..";
import Selection from "./components/selection";
import Button from "../Forms/button";
import { changeOrderImages } from "../../redux/slice/settings";
import { useFiles } from "../../context/useFiles";
import toast from "react-hot-toast";

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
  const dispatch = useDispatch();
  const { setFiles } = useFiles();

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

    if(!data?.reason){
      toast.error(intl.formatMessage({id: "reasonCheck"}))
    }else{
      localStorage.setItem("orderReasons", JSON.stringify(data?.reason || {}));
      localStorage.setItem("orderRelatives", JSON.stringify(data?.relative_id));
      localStorage.setItem(
        "orderRelativePerson",
        JSON.stringify(
          relatives?.data?.find((item) => item.id == data?.relative_id)
        )
      );
      router.push(`/${router.locale}/orders/create/second-step`);
    }
  };

  const handleGetImages = (images) => {
    const imgObjects = images.map((image) => ({
      lastModified: image?.lastModified,
      lastModifiedDate: image?.lastModifiedDate,
      name: image?.name,
      size: image?.size,
      type: image?.type,
      webkitRelativePath: image?.webkitRelativePath,
    }));
    setFiles(images);
    // const imgObjects = images.map((image) => URL.createObjectURL(image));
    // let fileObjects = images.map((file) => new File([file], file.name));
    // dispatch(changeOrderImages(imgObjects));
    // console.error(imgObjects);
    // const imgObjects = images.map((image) => image?.name);
    localStorage.setItem("orderImages", JSON.stringify(imgObjects));
  };

  const relativesData = [info];
  if (relatives?.data) {
    relativesData?.push(...relatives?.data);
  }

  const transformedRelativesData = relativesData.map((rel) => ({
    id: rel?.id,
    name: rel?.first_name
      ? intl.formatMessage({ id: "me" })
      : `${rel?.type_name} (${rel?.fullname})`,
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
        isActive={true}
        title={intl.formatMessage({ id: "reason" })}
      />
      <File
        id={"images"}
        isMultiple
        name={"images"}
        type="svg"
        title={intl.formatMessage({ id: "moreImages" })}
        getImages={handleGetImages}
      />
      <Button type="submit">{intl.formatMessage({ id: "continue" })}</Button>
    </form>
  );
}
