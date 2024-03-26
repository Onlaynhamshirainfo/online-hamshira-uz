import React from "react";
import Wrapper from "../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleLangStartModal } from "../../../redux/slice/modals";
import Button from "../../../components/Forms/button";
import { useRouter } from "next/router";

export default function LangModalStart() {
  const { langStartModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const router = useRouter();

  const langs = [
    { id: 1, name: "O‘zbek", short: "uz" },
    { id: 2, name: "English", short: "en" },
    { id: 3, name: "Русский", short: "ru" },
  ];

  const changeLanguage = () => {
    localStorage.setItem("isLocal", "done");
    localStorage.setItem("isSlider", "start");
  };

  return (
    <Wrapper
      active={langStartModal}
      func={() => dispatch(toggleLangStartModal())}
      type={"lang"}>
      <div className="flex flex-col gap-4 w-10/12 sm:w-9/12">
        {langs?.map((item, index) => {
          return (
            <a
              href={`/${item?.short}${router.asPath}`}
              key={index}
              locale={item}
              onClick={() => changeLanguage()}>
              <Button>{item?.name}</Button>
            </a>
          );
        })}
      </div>
    </Wrapper>
  );
}
