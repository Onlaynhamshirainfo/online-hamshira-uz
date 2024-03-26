import React from "react";
import Wrapper from "./components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleContactUsModal } from "../../redux/slice/modals";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

export default function ContactUs() {
  const { contactUs } = useSelector((state) => state.modals);
  const { info } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const phone = info?.contact?.branch?.dispetcher_number;

  return (
    <Wrapper
      active={contactUs}
      isLogo
      title={intl.formatMessage({ id: "contactUs" })}
      type={"bottom"}
      func={() => dispatch(toggleContactUsModal())}>
      <a
        href={`tel: ${phone ? phone : ""}`}
        className="flex flex-row justify-between items-center font-medium gap-4 w-full border border-grey-5 p-5 rounded-xl">
        {phone ? <span>{phone}</span> : ""}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.0004 12.46L12.7304 11.85L10.2104 14.37C7.38039 12.93 5.06039 10.62 3.62039 7.78L6.15039 5.25L5.54039 0H0.0303908C-0.549609 10.18 7.82039 18.55 18.0004 17.97V12.46Z"
            fill="#26BF56"
          />
        </svg>
      </a>
    </Wrapper>
  );
}
