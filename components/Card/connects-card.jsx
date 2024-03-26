import { convertUnixToDate } from "../../utils/date";
import Image from "next/image";
import React from "react";

export default function ConnectsCard({ data }) {
  return (
    <div className="flex flex-row items-center justify-start bg-white p-3 sm:p-5 rounded-3xl gap-3">
      <span className="w-10 h-10 rounded-full overflow-hidden full__image">
        <Image
          src={`${
            data?.picture
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE}${data?.picture}`
              : "/images/account.svg"
          }`}
          width={0}
          height={0}
          layout="responsive"
        />
      </span>
      <span className="flex flex-col gap-0 sm:gap-1 flex-1">
        <span className="text-text-primary leading-normal font-semibold text-base">
          {data?.type_name}
        </span>
        <span className="text-text-secondary leading-normal font-normal text-sm">
          {convertUnixToDate(data?.birthday)}
        </span>
      </span>
    </div>
  );
}
