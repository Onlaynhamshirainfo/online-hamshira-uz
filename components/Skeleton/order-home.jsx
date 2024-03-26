import React from "react";
import Skeleton from "react-loading-skeleton";

export default function OrderCardHome() {
  return (
    <div className="flex flex-row items-center justify-between bg-grey-7 rounded-2xl text-white p-5 min-w-[460px]">
      <div className="flex flex-row items-center gap-5">
        <div className="w-[64px] h-[64px] rounded-full overflow-hidden full__image flex items-center justify-center">
          <Skeleton width={100} height={100} />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton width={200} height={20} />
          <Skeleton width={120} height={20} />
        </div>
      </div>
      <div className="w-14 h-14 bg-white overflow-hidden rounded-full flex items-center justify-center">
        <Skeleton width={80} height={80} />
      </div>
    </div>
  );
}
