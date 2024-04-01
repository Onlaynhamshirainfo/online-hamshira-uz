import { useIntl } from "react-intl";
import Seo from "../../../components/Seo/Seo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { File, InfoIllness, InfoPerson, ReturnBack } from "../../../components";
import { useEffect, useState } from "react";
import { getActiveOrderFromLocal } from "../../../redux/slice/modals";
import Button from "../../../components/Forms/button";
import { authAxios } from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  changeOrderImages,
  removeItemsFromLocal,
} from "../../../redux/slice/settings";
import toast from "react-hot-toast";
import { createFiles } from "../../../utils/file";
import { useFiles } from "../../../context/useFiles";

export default function LastStep() {
  const router = useRouter();
  const intl = useIntl();
  const { active } = useSelector((state) => state.modals);
  const { orderInfo, orderImages } = useSelector((state) => state.settings);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  // const [files, setFiles] = useState(null);
  const { files } = useFiles();

  useEffect(() => {
    dispatch(getActiveOrderFromLocal());
  }, []);

  const pushToFormData = async (obj) => {
    const formData = new FormData();
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (Array.isArray(obj[key])) {
          if (key === "patient_pictures") {
            // const files = orderImages.map((fileInfo) => {
            //   const blob = new Blob([], { type: fileInfo.type });
            //   return new File([blob], fileInfo.name, { type: fileInfo.type });
            // });
            // console.error(files);
            files.forEach((file, index) => {
              formData.append(`${key}[${index}]`, file);
            });
          } else {
            obj[key].forEach((item, index) => {
              for (const itemKey in item) {
                if (Object.hasOwnProperty.call(item, itemKey)) {
                  formData.append(
                    `${key}[${index}][${itemKey}]`,
                    item[itemKey]
                  );
                }
              }
            });
          }
        } else {
          formData.append(key, obj[key]);
        }
      }
    }
    return formData;
  };

  const orderFn = async () => {
    try {
      setReqLoading(true);
      const formData = await pushToFormData(orderInfo);
      const response = await authAxios.post(`client-order/create`, formData);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <p>{intl.formatMessage({ id: "orderSuccess" })}</p>,
        icon: "success",
        position: "center",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push(`/${router.locale}/`);
        dispatch(removeItemsFromLocal());
      }, 300);
    } catch (e) {
      console.log(e);
      // toast.error(e?.message)
      toast.error(e?.response?.data?.errors?.["arrival_time"] || e?.message);
    } finally {
      setReqLoading(false);
    }
  };

  const handleGetImages = (images) => {
    const imgObjects = images.map((image) => image);
    setFiles(images);

    // const imgObjects = images.map((image) => URL.createObjectURL(image));
    // let fileObjects = images.map((file) => new File([file], file.name));
    // dispatch(changeOrderImages(imgObjects));
    // console.error(imgObjects);
    // const imgObjects = images.map((image) => image?.name);
    localStorage.setItem("orderImages", JSON.stringify(imgObjects));
  };

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "orders" })}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      {/* {console.log(files)} */}
      <main className="container">
        <div className="flex flex-col gap-7 py-5">
          <div className="flex flex-col items-start justify-start gap-3">
            {/* <ReturnBack isPadding url="orders/create/fourth-step" /> */}
            <h1 className="text-text-primary leading-normal font-semibold text-xl">
              {active == "call_home"
                ? intl.formatMessage({ id: "call_home" })
                : intl.formatMessage({ id: "go_clinic" })}
            </h1>
          </div>
          {/* <File
            id={"images"}
            isMultiple
            name={"images"}
            title={intl.formatMessage({ id: "moreImages" })}
            getImages={handleGetImages}
          /> */}
          <InfoPerson />
          <InfoIllness />
          <Button onClick={orderFn}>
            {reqLoading
              ? intl.formatMessage({ id: "loading" })
              : intl.formatMessage({ id: "orderNow" })}
          </Button>
        </div>
      </main>
    </>
  );
}
