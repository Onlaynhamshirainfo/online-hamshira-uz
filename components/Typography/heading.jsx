import React from "react";

export default function Heading({ className, type, children, ...pageProps }) {
  const HeadingTag = `h${type}`;

  return (
    <HeadingTag
      className={className}
      role={type}
      aria-level={type}
      title={children}
      {...pageProps}
    >
      {children}
    </HeadingTag>
  );
}
