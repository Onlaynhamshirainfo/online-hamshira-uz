import { convertUnixToDate } from "../../utils/date";
import React from "react";
import { CustomImage, Heading, Paragraph } from "..";
import { ariaDiv } from "../../constants/aria-attributes";

export default function ConnectsCard({ data }) {
  return (
    <div
      className="flex flex-row items-center justify-start bg-white p-3 sm:p-5 rounded-3xl gap-3"
      {...ariaDiv(data?.type_name, "Barcha bog'lanmalar uchun qism", "region")}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden full__image">
        <CustomImage
          src={`${
            data?.picture
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE}${data?.picture}`
              : "/images/account.svg"
          }`}
          title={data?.type_name}
          alt={data?.type_name}
        />
      </div>
      <div className="flex flex-col gap-0 sm:gap-1 flex-1">
        <Heading
          type={6}
          className="text-text-primary leading-normal font-semibold text-base"
        >
          {data?.type_name} - {data?.fullname}
        </Heading>
        <Paragraph className="text-text-secondary leading-normal font-normal text-sm">
          {convertUnixToDate(data?.birthday)}
        </Paragraph>
      </div>
    </div>
  );
}
