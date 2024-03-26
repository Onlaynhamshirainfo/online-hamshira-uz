import { useRouter } from "next/router";
import { DateTranslate } from "../../utils/date";
import React from "react";

export default function NewsCard({ data }) {
  const router = useRouter();
  return (
    <a
      href={`/${router.locale}/news/${data?.id}`}
      className="w-full flex flex-col gap-3 items-start bg-white p-8 rounded-2xl">
      <span className="px-3 py-2 linear rounded-full text-sm text-white">
        {DateTranslate(data?.created_at)}
      </span>
      <h2 className="text-text-primary leading-normal font-semibold text-lg">
        {data?.title}
      </h2>
      <p className="text-text-secondary leading-normal font-normal text-base line-clamp-2">
        {data?.description}
      </p>
      {/* <p
        className="text-text-secondary leading-normal font-normal text-base line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
      /> */}
    </a>
  );
}
