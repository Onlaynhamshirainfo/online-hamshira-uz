import {
  toggleOrderTypeModal,
  toggleRegisterModal,
} from "../../redux/slice/modals";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function HelpCardHome({ data }) {
  const dispatch = useDispatch();

  const helpedModalFn = () => {
    const quest =
      typeof window !== undefined ? localStorage?.getItem("auth__key") : null;
    if (!quest) {
      dispatch(toggleRegisterModal());
    } else {
      dispatch(toggleOrderTypeModal(data));
    }
  };

  return (
    <button
      className="w-full bg-white rounded-2xl flex flex-col items-center text-center justify-center gap-2 py-6 px-2 cursor-pointer"
      onClick={() => helpedModalFn()}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${data?.icon}`}
        width={56}
        height={56}
        alt={data?.name}
        title={data?.name}
        unoptimized
      />
      <span className="text-text-primary leading-normal font-medium text-[14px]">
        {data?.name}
      </span>
    </button>
  );
}
