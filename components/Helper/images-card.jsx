import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";

export default function ImagesCards({ images }) {
  const intl = useIntl();
  return (
    <div className="flex flex-row items-center justify-start w-full flex-wrap gap-3 bg-white p-5 rounded-3xl">
      <h2 className="text-text-primary leading-normal font-semibold text-sm">
        {intl.formatMessage({ id: "photos" })}:
      </h2>
      <div className="w-full flex flex-row items-center justify-start flex-wrap gap-5">
        {images?.map((image, index) => {
          return (
            <a
              href={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${image?.picture}`}
              className="w-14 h-14 rounded-md border-2 border-grey-5 overflow-hidden full__image"
              key={index}
              title={image?.picture}
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${image?.picture}`}
                width={0}
                height={0}
                layout="responsive"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
