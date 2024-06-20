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
import toast from "react-hot-toast";

export default function Edit() {
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
      first_name: info?.first_name || "",
      last_name: info?.last_name || "",
      father_name: info?.father_name || "",
      // weight: info?.contact?.weight || "",
      gender: info?.contact?.gender || "",
      branch_id: info?.contact?.branch?.id || "",
      photo: info?.photo || "",
      born: info?.contact?.born || "",
    },
  });

  const { data: branches } = useSWR(["branch/index", router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

  const submitFn = async (data) => {
    const date = await converUnivDate(data?.born);
    try {
      console.error(data?.born, date);
      const formData = new FormData();
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data?.last_name);
      formData.append("born", data?.born);
      // formData.append("weight", data?.weight);
      formData.append("gender", data?.gender);
      if (image) {
        formData.append("photo", image);
      }
      formData.append(
        "branch_id",
        data?.branch_id ? data?.branch_id : info?.contact?.branch?.id
      );
      setReqLoading(true);
      setFormError(null);

      const response = await axios.post(
        `client/fill-data?expand=contact.branch`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth__key")}`,
          },
        }
      );

      const oldDatas = JSON.parse(localStorage.getItem("auth__info"));
      const newDatas = { ...oldDatas, ...response?.data?.data };
      localStorage.setItem("auth__info", JSON.stringify(newDatas));
      localStorage.setItem("auth__key", newDatas?.auth_key);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <p>{intl.formatMessage({ id: "infoSuccess" })}</p>,
        icon: "success",
        position: "center",
        timer: 3000,
        showConfirmButton: false,
      });
      
      setTimeout(() => {
        router.push(`/${router.locale}/profile/`);
        router.reload();
      }, 500);

      reset();
    } catch (e) {
      setFormError(e?.response?.data?.errors);
      console.error(e);
      toast.error(e?.response?.data?.message || e?.message);
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
        title={intl.formatMessage({ id: "edit" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <div className="container">
        <form
          onSubmit={handleSubmit(submitFn)}
          className="flex flex-col gap-3 py-5 items-start"
        >
          <ReturnBack url="profile" />
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
          {/* <Input
            type="text"
            placeholder={intl.formatMessage({ id: "weight" })}
            name={"weight"}
            id="weight"
            register={register}
            errors={formError}
          /> */}
          {/* <Dropdown
            data={branches?.data}
            register={register}
            name={"branch_id"}
            title={intl.formatMessage({ id: "city" })}
            isLogo
            typeDropdown={"city"}
          /> */}
          <File
            id={"photo"}
            name={"photo"}
            title={intl.formatMessage({ id: "profileImage" })}
            getImages={handleGetImages}
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
                  current={info?.contact?.gender}
                  register={register}
                />
              );
            })}
          </div>
          <Button type="submit">
            {reqLoading
              ? intl.formatMessage({ id: "loading" })
              : intl.formatMessage({ id: "edit" })}
          </Button>
        </form>
      </div>
    </>
  );
}
