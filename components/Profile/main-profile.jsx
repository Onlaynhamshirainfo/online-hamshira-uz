import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RegsiterNow } from "..";
import { useIntl } from "react-intl";

export default function MainProfile({ info }) {
  // const { info } = useSelector((state) => state.settings);
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div
        className="w-16 h-16 overflow-hidden rounded-full bg-grey-5 full__image"
        onClick={() => router.push("/profile")}
      >
        {info ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${info?.photo}`}
            width={0}
            height={0}
            layout="responsive"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-text-primary leading-normal font-semibold text-lg">
          {info?.last_name + " " + info?.first_name ||
            intl.formatMessage({ id: "user" })}
        </h1>
        <p className="text-text-secondary leading-normal font-normal text-base">
          ID: {info?.id}{" "}
        </p>
      </div>
    </div>
  );
}
