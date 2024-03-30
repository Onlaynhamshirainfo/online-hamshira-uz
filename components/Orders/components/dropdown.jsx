import React, { useEffect, useState } from "react";
import { Error, SelectIcon } from "../..";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import Counter from "./counter";
import CounterCheckbox from "./counter-checkbox";

export default function Dropdown({
  data,
  register,
  name,
  validation,
  currentDrop,
  title,
  typeDropdown,
  getArrivalTypes,
  required,
  isLogo,
  isActive,
}) {
  const intl = useIntl();
  const [active, setActive] = useState(isActive || false);
  const [checked, setChecked] = useState(false);
  const [activeInfo, setActiveInfo] = useState(currentDrop);

  if (!data) {
    return null;
  }

  const changeCurrentActive = (item) => {
    setActiveInfo(item);
    if (getArrivalTypes) {
      getArrivalTypes(item?.moreInputs);
    }
  };

  if (typeDropdown == "moreSelection") {
    return (
      <DropdownWrapper title={title} isTitle>
        <div className="relative z-0 flex flex-col bg-white rounded-3xl border-grey-5 border">
          <div
            className="flex flex-row items-center justify-between cursor-pointer p-5"
            onClick={() => setActive((prev) => !prev)}
          >
            <p>{intl.formatMessage({ id: "reasonChoose" })}</p>
            <SelectIcon isActive={active} />
          </div>

          {/* bottom */}
          <div
            className={`${
              active ? "flex" : "hidden"
            } bg-white flex-col gap-4 px-5 pb-7 rounded-b-3xl`}
          >
            {/* relatives */}
            {data?.map((item, index) => {
              return (
                <label
                  forhtml={name}
                  key={index}
                  onClick={() => changeCurrentActive(item)}
                  className="flex flex-row items-center gap-4 cursor-pointer"
                >
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      required={required}
                      id={name}
                      name={name}
                      value={item?.id}
                      {...register(name, validation)}
                    />
                    <span>
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7613 0.21934C11.9017 0.359965 11.9806 0.550589 11.9806 0.74934C11.9806 0.948091 11.9017 1.13871 11.7613 1.27934L4.51127 8.52934C4.37064 8.66979 4.18002 8.74868 3.98127 8.74868C3.78252 8.74868 3.59189 8.66979 3.45127 8.52934L0.201268 5.27934C0.0688589 5.13708 -0.00324457 4.94903 0.000112156 4.75471C0.00346888 4.56039 0.0820243 4.37494 0.219267 4.23734C0.356871 4.1001 0.54232 4.02154 0.736637 4.01818C0.930954 4.01483 1.11901 4.08693 1.26127 4.21934L3.98127 6.93934L10.7013 0.21934C10.8419 0.0788894 11.0325 0 11.2313 0C11.43 0 11.6206 0.0788894 11.7613 0.21934Z"
                          fill="#fff"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="flex-1">
                  {item?.name ||
                    (item?.name?.trim() == currentDrop?.first_name
                      ? intl.formatMessage({ id: "me" })
                      : "")}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </DropdownWrapper>
    );
  }

  if (typeDropdown == "date") {
    return (
      <DropdownWrapper>
        <div className="relative z-0 flex flex-col bg-white rounded-3xl border-grey-5 border">
          <div
            className="flex flex-row items-center justify-between cursor-pointer p-5"
            onClick={() => setActive((prev) => !prev)}
          >
            <div className="flex flex-row items-center gap-4">
              {activeInfo?.name || title}
            </div>
            <SelectIcon isActive={active} />
          </div>

          {/* bottom */}
          <div
            className={`${
              active ? "flex" : "hidden"
            } bg-white flex-col gap-4 px-5 pb-7 rounded-b-3xl`}
          >
            {/* relatives */}
            {data?.map((item, index) => {
              return (
                <label
                  forhtml={name}
                  key={index}
                  onClick={() => changeCurrentActive(item)}
                  className="flex flex-row items-center gap-4 cursor-pointer"
                >
                  <span className="custom-checkbox">
                    <input
                      type="radio"
                      required={required}
                      id={name}
                      name={name}
                      value={item?.id}
                      {...register(name, validation)}
                    />
                    <span>
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7613 0.21934C11.9017 0.359965 11.9806 0.550589 11.9806 0.74934C11.9806 0.948091 11.9017 1.13871 11.7613 1.27934L4.51127 8.52934C4.37064 8.66979 4.18002 8.74868 3.98127 8.74868C3.78252 8.74868 3.59189 8.66979 3.45127 8.52934L0.201268 5.27934C0.0688589 5.13708 -0.00324457 4.94903 0.000112156 4.75471C0.00346888 4.56039 0.0820243 4.37494 0.219267 4.23734C0.356871 4.1001 0.54232 4.02154 0.736637 4.01818C0.930954 4.01483 1.11901 4.08693 1.26127 4.21934L3.98127 6.93934L10.7013 0.21934C10.8419 0.0788894 11.0325 0 11.2313 0C11.43 0 11.6206 0.0788894 11.7613 0.21934Z"
                          fill="#fff"
                        />
                      </svg>
                    </span>
                  </span>
                  {item?.name ||
                    (item?.name?.trim() == currentDrop?.first_name
                      ? intl.formatMessage({ id: "me" })
                      : "")}
                </label>
              );
            })}
          </div>
        </div>
      </DropdownWrapper>
    );
  }

  if (typeDropdown == "illness") {
    return (
      <DropdownWrapper>
        <div className="relative z-0 flex flex-col bg-white rounded-3xl border-grey-5 border">
          <div
            className="flex flex-row items-center justify-between cursor-pointer p-5"
            onClick={() => setActive((prev) => !prev)}
          >
            <p className="font-semibold text-sm sm:text-base text-text-primary">
              {data?.name}
            </p>
            <SelectIcon isActive={active} />
          </div>

          {/* bottom */}
          <div
            className={`${
              active ? "flex" : "hidden"
            } bg-white flex-col gap-5 px-5 pb-7 rounded-b-3xl`}
          >
            {/* relatives */}
            {data?.services?.map((item, index) => {
              return (
                <CounterCheckbox
                  item={item}
                  name={name}
                  serviceId={data?.id}
                  price={item?.value}
                  // current={!checked}
                  key={index}
                  title={item?.info}
                  count={item?.count}
                />
              );
            })}
          </div>
        </div>
      </DropdownWrapper>
    );
  }

  if (typeDropdown == "city") {
    return (
      <DropdownWrapper isLogo>
        <div className="relative z-0 flex flex-col bg-white rounded-3xl border-grey-5 border">
          <div
            className="flex flex-row items-center justify-between cursor-pointer p-5"
            onClick={() => setActive((prev) => !prev)}
          >
            <div className="flex flex-row items-center gap-4">
              {activeInfo?.name || title}
            </div>
            <SelectIcon isActive={active} />
          </div>

          {/* bottom */}
          <div
            className={`${
              active ? "flex" : "hidden"
            } bg-white flex-col gap-4 px-5 pb-7 rounded-b-3xl`}
          >
            {/* relatives */}
            {data?.map((item, index) => {
              return (
                <label
                  forhtml={name}
                  key={index}
                  onClick={() => changeCurrentActive(item)}
                  className="flex flex-row items-center gap-4 cursor-pointer"
                >
                  <span className="custom-checkbox">
                    <input
                      type="radio"
                      required={required}
                      id={name}
                      name={name}
                      value={item?.id}
                      {...register(name, validation)}
                    />
                    <span>
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7613 0.21934C11.9017 0.359965 11.9806 0.550589 11.9806 0.74934C11.9806 0.948091 11.9017 1.13871 11.7613 1.27934L4.51127 8.52934C4.37064 8.66979 4.18002 8.74868 3.98127 8.74868C3.78252 8.74868 3.59189 8.66979 3.45127 8.52934L0.201268 5.27934C0.0688589 5.13708 -0.00324457 4.94903 0.000112156 4.75471C0.00346888 4.56039 0.0820243 4.37494 0.219267 4.23734C0.356871 4.1001 0.54232 4.02154 0.736637 4.01818C0.930954 4.01483 1.11901 4.08693 1.26127 4.21934L3.98127 6.93934L10.7013 0.21934C10.8419 0.0788894 11.0325 0 11.2313 0C11.43 0 11.6206 0.0788894 11.7613 0.21934Z"
                          fill="#fff"
                        />
                      </svg>
                    </span>
                  </span>
                  {item?.name ||
                    (item?.name?.trim() == currentDrop?.first_name
                      ? intl.formatMessage({ id: "me" })
                      : "")}
                </label>
              );
            })}
          </div>
        </div>
      </DropdownWrapper>
    );
  }

  return (
    <DropdownWrapper title={title} isTitle isLogo>
      <div className="relative z-0 flex flex-col bg-white rounded-3xl border-grey-5 border">
        <div
          className="flex flex-row items-center justify-between cursor-pointer p-5"
          onClick={() => setActive((prev) => !prev)}
        >
          <div className="flex flex-row items-center gap-4">
            {isLogo ? (
              <></>
            ) : (
              <span className="block w-10 h-10 rounded-full full__image overflow-hidden">
                <Image
                  src={`${
                    activeInfo?.photo || currentDrop?.photo
                      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE}${
                          activeInfo?.photo || currentDrop?.photo
                        }`
                      : "/images/account.svg"
                  }`}
                  width={0}
                  height={0}
                  placeholder="/images/account.svg"
                  layout="responsive"
                />
              </span>
            )}
            {isLogo
              ? title || activeInfo?.name
              : activeInfo?.name || intl.formatMessage({ id: "me" })}
          </div>
          <SelectIcon isActive={active} />
        </div>

        {/* bottom */}
        <div
          className={`${
            active ? "flex" : "hidden"
          } bg-white flex-col gap-4 px-5 pb-7 rounded-b-3xl`}
        >
          {/* relatives */}
          {data?.map((item, index) => {
            return (
              <label
                forhtml={name}
                key={index}
                onClick={() => changeCurrentActive(item)}
                className="flex flex-row items-center gap-4 cursor-pointer"
              >
                <span className="custom-checkbox">
                  <input
                    type="radio"
                    required={required}
                    id={name}
                    name={name}
                    value={item?.id}
                    {...register(name, validation)}
                  />
                  <span>
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7613 0.21934C11.9017 0.359965 11.9806 0.550589 11.9806 0.74934C11.9806 0.948091 11.9017 1.13871 11.7613 1.27934L4.51127 8.52934C4.37064 8.66979 4.18002 8.74868 3.98127 8.74868C3.78252 8.74868 3.59189 8.66979 3.45127 8.52934L0.201268 5.27934C0.0688589 5.13708 -0.00324457 4.94903 0.000112156 4.75471C0.00346888 4.56039 0.0820243 4.37494 0.219267 4.23734C0.356871 4.1001 0.54232 4.02154 0.736637 4.01818C0.930954 4.01483 1.11901 4.08693 1.26127 4.21934L3.98127 6.93934L10.7013 0.21934C10.8419 0.0788894 11.0325 0 11.2313 0C11.43 0 11.6206 0.0788894 11.7613 0.21934Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                </span>
                {item?.name ||
                  (item?.name?.trim() == currentDrop?.first_name
                    ? intl.formatMessage({ id: "me" })
                    : "")}
              </label>
            );
          })}
        </div>
      </div>
    </DropdownWrapper>
  );
}

function DropdownWrapper({ children, isTitle, title }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {isTitle ? (
        <p className="font-semibold text-sm">
          {title} <span className="text-red-500">*</span>
        </p>
      ) : (
        ""
      )}
      {children}
    </div>
  );
}
