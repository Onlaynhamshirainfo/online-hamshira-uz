import { useIntl } from "react-intl";
import UserIcon from "../Icons/user";
import { useDispatch, useSelector } from "react-redux";
import { toggleRegisterModal } from "../../redux/slice/modals";
import { useEffect } from "react";
import { getItemsFromLocal } from "../../redux/slice/settings";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const router = useRouter();
  const { info } = useSelector((state) => state.settings);

  // const date = new Date();
  // const lastHours =
  //   typeof window !== "undefined" ? localStorage.getItem("auth__timer") : null;

  // useEffect(() => {
  //   if (date.getHours() - lastHours == 1) {
  //     logOut();
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getItemsFromLocal());
  }, []);

  return (
    <header className="container">
      <div className="py-3 flex flex-row items-center justify-between relative z-20">
        <a
          href="./"
          title={intl.formatMessage({ id: "company" })}
          className="block w-[180px] sm:w-[240px]">
          <img
            src="/images/logo.svg"
            alt="logo"
            title={intl.formatMessage({ id: "company" })}
            width={240}
            height={140}
            // blurdataurl="data:image/jpeg ,data:image/png , data:image/svg "
            placeholder="blur"
          />
        </a>
        {info ? (
          <div
            className="w-12 h-12 overflow-hidden rounded-full full__image cursor-pointer"
            onClick={() => router.push("/profile")}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${info?.photo}`}
              width={0}
              height={0}
              layout="responsive"
            />
          </div>
        ) : (
          <button
            type="button"
            className="group p-3"
            onClick={() => dispatch(toggleRegisterModal())}>
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 14.3C15.1947 14.3 18.1 15.2022 20.2373 16.4736C21.304 17.108 22.216 17.8568 22.8747 18.6706C23.5227 19.4701 24 20.4269 24 21.45C24 22.5485 23.452 23.4143 22.6627 24.0318C21.916 24.6168 20.9307 25.0042 19.884 25.2746C17.78 25.8167 14.972 26 12 26C9.028 26 6.22 25.818 4.116 25.2746C3.06933 25.0042 2.084 24.6168 1.33733 24.0318C0.546666 23.413 0 22.5485 0 21.45C0 20.4269 0.477333 19.4701 1.12533 18.6693C1.784 17.8568 2.69467 17.1093 3.76267 16.4723C5.9 15.2035 8.80667 14.3 12 14.3ZM12 0C13.7681 0 15.4638 0.684819 16.714 1.90381C17.9643 3.12279 18.6667 4.77609 18.6667 6.5C18.6667 8.22391 17.9643 9.87721 16.714 11.0962C15.4638 12.3152 13.7681 13 12 13C10.2319 13 8.5362 12.3152 7.28596 11.0962C6.03571 9.87721 5.33333 8.22391 5.33333 6.5C5.33333 4.77609 6.03571 3.12279 7.28596 1.90381C8.5362 0.684819 10.2319 0 12 0Z"
                fill="#242424"
                className="group-hover:fill-green transition-colors duration-200"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
