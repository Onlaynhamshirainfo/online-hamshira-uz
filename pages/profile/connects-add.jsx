import { useIntl } from "react-intl";
import Seo from "../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../components/Forms/Input";
import { Dropdown, File, ReturnBack } from "../../components";
import { converUnivDate } from "../../utils/date";
import CheckboxChecked from "../../components/Modal/components/checkbox";
import Button from "../../components/Forms/button";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ConnectsAdd() {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const { info } = useSelector((state) => state.settings);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      type: "",
      fullname: "",
      birthday: "",
      weight: "",
      gender: "",
      about: "",
      picture_file: "",
    },
  });

  const { data: types } = useSWR(["relative/type", router.locale], (url) =>
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
    const date = converUnivDate(data?.birthday);
    try {
      const formData = new FormData();
      formData.append("fullname", data?.fullname);
      formData.append("birthday", Number(date));
      formData.append("gender", data?.gender);
      formData.append("weight", " ");
      formData.append("about", " ");
      formData.append("type", data?.type);
      formData.append("picture_file", image);

      setReqLoading(true);
      setFormError(null);
      console.error(image);

      const response = await axios.post(`relative/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth__key")}`,
        },
      });

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <p>{intl.formatMessage({ id: "infoSuccess" })}</p>,
        icon: "success",
        position: "center",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push(`/${router.locale}/profile/connects`);
      }, 500);

      reset();
    } catch (e) {
      setFormError(e?.response?.data?.errors);
    } finally {
      setReqLoading(false);
    }
  };

  const handleGetImages = (images) => {
    setImage(images?.[0]);
  };

  // gender data
  const gender = [
    { id: 6, name: intl.formatMessage({ id: "men" }) },
    { id: 8, name: intl.formatMessage({ id: "women" }) },
  ];

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "orders" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <div className="container">
        <form
          onSubmit={handleSubmit(submitFn)}
          className="flex flex-col gap-3 py-5"
        >
          <ReturnBack url="profile/connects" />
          <Dropdown
            data={types?.data}
            register={register}
            name={"type"}
            title={intl.formatMessage({ id: "relative" })}
            isLogo
            typeDropdown={"city"}
          />
          <Input
            type="text"
            placeholder={intl.formatMessage({ id: "fullname" })}
            name={"fullname"}
            id="fullname"
            register={register}
            errors={formError}
          />
          <Input
            type="date"
            placeholder={intl.formatMessage({ id: "birthday" })}
            name={"birthday"}
            id="birthday"
            register={register}
            errors={formError}
          />
          {/* <Input
            type="text"
            placeholder={intl.formatMessage({ id: "weight" })}
            name={"weight"}
            id="weight"
            register={register}
            errors={formError}
          />
          <Input
            type="text"
            placeholder={intl.formatMessage({ id: "about" })}
            name={"about"}
            id="about"
            register={register}
            errors={formError}
          /> */}
          <File
            id={"picture_file"}
            name={"picture_file"}
            title={intl.formatMessage({ id: "profileImage" })}
            getImages={handleGetImages}
            errors={formError}
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
          <Button type="submit">{intl.formatMessage({ id: "add" })}</Button>
        </form>
      </div>
    </>
  );
}
