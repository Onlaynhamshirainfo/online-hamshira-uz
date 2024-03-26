import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";

export default function Wrapper({
  active,
  func,
  children,
  type,
  isLogo,
  title,
  body,
  height,
}) {
  const intl = useIntl();
  if (type == "lang") {
    return (
      <ModalWrapper
        active={active}
        func={() => {
          console.log("Lang");
        }}>
        <div
          className={`bg-white w-11/12 sm:w-[480px] px-5 py-9 xs:p-10 ${
            active ? "scale-1" : "scale-0"
          } transition-transform duration-200 rounded-2xl flex flex-col gap-8 sm:gap-10 items-center justify-center relative z-0`}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col text-center gap-1 w-full sm:w-[90%] text-text-primary">
            <h3 className="leading-normal font-semibold text-xl sm:text-2xl">
              {intl.formatMessage({ id: "langStart" })}
            </h3>
            <p className="leading-normal font-normal text-[14px] sm:text-base">
              {intl.formatMessage({ id: "langStartMessage" })}
            </p>
          </div>
          {children}
        </div>
      </ModalWrapper>
    );
  }

  if (type == "slider") {
    return (
      <ModalWrapper active={active} func={() => func()} isPadding="sm:py-5">
        <div
          className={`w-full sm:w-[480px] h-full relative z-0 sm:rounded-3xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}>
          {children}

          <button
            type="button"
            className="absolute z-20 top-5 right-5 bg-[#0000003c] p-3 rounded-full text-white text-[14px] leading-normal font-semibold backdrop-blur-sm"
            onClick={() => func()}>
            {intl.formatMessage({ id: "skip" })}
          </button>
        </div>
      </ModalWrapper>
    );
  }

  if (type == "bottom") {
    return (
      <ModalWrapper active={active} func={func} isEnd isPadding={"py-0"}>
        <div
          className={`bg-white w-full sm:w-[420px] px-5 py-9 xs:p-10 ${
            active ? "translate-y-0" : "translate-y-full"
          } transition-transform duration-200 rounded-t-3xl flex flex-col gap-3 items-center justify-center relative z-0`}
          onClick={(e) => e.stopPropagation()}>
          <div className="w-10 h-2 bg-grey-5 absolute top-4 rounded-xl"></div>
          <div className="flex flex-col items-center gap-5 text-text-primary w-full">
            <h1 className="leading-normal font-semibold text-lg">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper active={active} func={func}>
      <div
        className={`bg-white w-11/12 sm:w-[480px] px-5 py-9 xs:p-10 ${
          active ? "scale-1" : "scale-0"
        } transition-transform duration-200 rounded-2xl flex flex-col gap-3 items-center justify-center relative z-0`}
        onClick={(e) => e.stopPropagation()}>
        {isLogo ? (
          <></>
        ) : (
          <div className="w-[140px] sm:w-[200px]">
            <Image
              src={"/images/logo-regsiter.svg"}
              alt="Onlayn Hamshira"
              title="Onlayn Hamshira"
              width={200}
              height={128}
              layout="responsive"
            />
          </div>
        )}
        {/* <button
          type="button"
          className="absolute top-5 right-5 "
          onClick={() => func()}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1L15 15M1 15L15 1"
              stroke="#242424"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
        <div className="flex flex-col items-center gap-5 text-text-primary w-full">
          <div
            className={`flex flex-col text-center gap-1 ${
              isLogo ? "pt-4" : ""
            }`}>
            <h3 className="leading-normal font-semibold text-xl sm:text-2xl">
              {title}
            </h3>
            {body ? (
              <p className="leading-normal font-normal text-[14px] sm:text-base">
                {body}
              </p>
            ) : (
              <></>
            )}
          </div>
          {children}
        </div>
      </div>
    </ModalWrapper>
  );
}

function ModalWrapper({
  active,
  func,
  children,
  isPadding,
  removePadding,
  isEnd,
}) {
  return (
    <div
      className={`${
        isEnd ? "items-end" : "modal"
      } fixed top-0 left-0 w-full h-screen bg-[#00000054] z-[1000] ${
        active ? "opacity-100 visible" : "invisible opacity-0"
      } flex justify-center transition-opacity duration-200 ${
        isPadding ? isPadding : "py-5"
      } overflow-y-scroll scroll__none`}
      onClick={() => (func ? func() : null)}>
      {children}
    </div>
  );
}
