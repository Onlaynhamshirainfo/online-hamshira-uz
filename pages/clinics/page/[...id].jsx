import { useIntl } from "react-intl";
import axios from "../../../utils/axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Maps, ReturnBack } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Stars from "../../../components/Clinic/stars";

function page({ info, params }) {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  return (
    <section className="container">
      <ReturnBack url={`clinics/`} />
      <main className="flex flex-col items-start leading-normal gap-3 sm:gap-5">
        <div className="w-full h-[240px] sm:h-[360px] full__image rounded-2xl overflow-hidden relative z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${info?.picture}`}
            width={0}
            height={0}
            layout="responsive"
          />
          <a
            href="#maps"
            type="button"
            onClick={() => setActive((prev) => !prev)}
            className="absolute bottom-5 right-5 text-sm text-white linear p-2 flex rounded-full cursor-pointer">
            {intl.formatMessage({ id: "seeMap" })}
          </a>
        </div>
        <Stars count={info?.star} />
        <h1 className="text-text-primary font-semibold text-lg">
          {info?.name}
        </h1>
        <p className="text-text-secondary leading-normal font-normal text-base pb-5">
          {info?.description}
        </p>
        {active ? <Maps data={info} /> : <></>}
        <div id="maps"></div>
      </main>
    </section>
  );
}
export async function getServerSideProps({ params, locale }) {
  // fetch product
  const info = await axios
    .get(
      `clinic/view?id=${params?.id?.[0]}&branch_id=${params?.id?.[1]}&expand=description`,
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    )
    .then((res) => res?.data?.data)
    .catch((err) => console.error(err));

  if (!info) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      info,
      params,
    },
  };
}

export default page;
