import Image from "next/image";
import React from "react";

export default function CustomImage({ src, alt , title}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      layout="responsive"
      role="img"
      loading="lazy"
      title={title}
    />
  );
}
