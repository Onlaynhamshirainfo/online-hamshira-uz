import React, { useState } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { Error } from "..";

export default function File({
  name,
  id,
  isMultiple = false,
  title,
  getImages,
  errors
}) {
  const intl = useIntl();
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (!isMultiple) {
      if (selectedFiles.length > 1) {
        toast.error("Only one file can be uploaded.");
        return;
      }
      setImages(selectedFiles); 
      handleGetImages(selectedFiles); 
    } else {
      if (selectedFiles.length + images.length > 4) {
        toast.error("Maximum 4 images allowed.");
      } else {
        setImages([...images, ...selectedFiles]);
        handleGetImages([...images, ...selectedFiles]);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleGetImages = (images) => {
    getImages(images);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-semibold text-sm">{title}</p>
      <div className="relative z-0 bg-white p-5 flex flex-row items-center justify-between rounded-3xl ">
        <input
          type="file"
          multiple={isMultiple}
          name={name}
          id={id}
          onChange={handleFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
        <span>{intl.formatMessage({ id: "upload" })}</span>
        <span>
          <svg
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 1H6C4.67392 1 3.40215 1.52678 2.46447 2.46447C1.52678 3.40215 1 4.67392 1 6V13C1 13.6566 1.12933 14.3068 1.3806 14.9134C1.63188 15.52 2.00017 16.0712 2.46447 16.5355C3.40215 17.4732 4.67392 18 6 18H14.5C15.1566 18 15.8068 17.8707 16.4134 17.6194C17.02 17.3681 17.5712 16.9998 18.0355 16.5355C18.4998 16.0712 18.8681 15.52 19.1194 14.9134C19.3707 14.3068 19.5 13.6566 19.5 13V6C19.5 5.34339 19.3707 4.69321 19.1194 4.08658C18.8681 3.47995 18.4998 2.92876 18.0355 2.46447C17.5712 2.00017 17.02 1.63188 16.4134 1.3806C15.8068 1.12933 15.1566 1 14.5 1Z"
              stroke="#242424"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.25 14.4996L4 11.2996C4.35984 10.9422 4.83211 10.7201 5.33688 10.6709C5.84165 10.6217 6.34792 10.7484 6.77 11.0296C7.19208 11.3108 7.69835 11.4375 8.20312 11.3883C8.70789 11.3391 9.18016 11.117 9.54 10.7596L11.87 8.42961C12.5395 7.75784 13.4259 7.34582 14.371 7.26705C15.3162 7.18829 16.2586 7.44792 17.03 7.99961L19.52 9.92961M6.25 7.66961C6.46799 7.66961 6.68385 7.62667 6.88525 7.54325C7.08666 7.45983 7.26965 7.33755 7.4238 7.18341C7.57794 7.02926 7.70022 6.84626 7.78364 6.64486C7.86706 6.44346 7.91 6.2276 7.91 6.00961C7.91 5.79162 7.86706 5.57576 7.78364 5.37435C7.70022 5.17295 7.57794 4.98996 7.4238 4.83581C7.26965 4.68167 7.08666 4.55939 6.88525 4.47597C6.68385 4.39255 6.46799 4.34961 6.25 4.34961C5.80974 4.34961 5.38751 4.5245 5.0762 4.83581C4.76489 5.14712 4.59 5.56935 4.59 6.00961C4.59 6.44987 4.76489 6.8721 5.0762 7.18341C5.38751 7.49472 5.80974 7.66961 6.25 7.66961Z"
              stroke="#242424"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Display selected files */}
      <div className="flex flex-row items-center gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white p-3 rounded-full"
          >
            <span className="text-sm leading-normal font-medium">
              {image.name}
            </span>
            <button
              className=""
              type="button"
              onClick={() => handleDeleteImage(index)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99996 1.66675C5.40829 1.66675 1.66663 5.40841 1.66663 10.0001C1.66663 14.5917 5.40829 18.3334 9.99996 18.3334C14.5916 18.3334 18.3333 14.5917 18.3333 10.0001C18.3333 5.40841 14.5916 1.66675 9.99996 1.66675ZM12.8 11.9167C13.0416 12.1584 13.0416 12.5584 12.8 12.8001C12.675 12.9251 12.5166 12.9834 12.3583 12.9834C12.2 12.9834 12.0416 12.9251 11.9166 12.8001L9.99996 10.8834L8.08329 12.8001C7.95829 12.9251 7.79996 12.9834 7.64163 12.9834C7.48329 12.9834 7.32496 12.9251 7.19996 12.8001C6.95829 12.5584 6.95829 12.1584 7.19996 11.9167L9.11663 10.0001L7.19996 8.08342C6.95829 7.84175 6.95829 7.44175 7.19996 7.20008C7.44163 6.95842 7.84163 6.95842 8.08329 7.20008L9.99996 9.11675L11.9166 7.20008C12.1583 6.95842 12.5583 6.95842 12.8 7.20008C13.0416 7.44175 13.0416 7.84175 12.8 8.08342L10.8833 10.0001L12.8 11.9167Z"
                  fill="#636C79"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      {/* Erros */}
      <Error errors={errors} name={name} />
    </div>
  );
}
