import React from "react";

export default function Paragraph({ className, children, ...pageProps }) {
  return (
    <p
      className={className}
      aria-describedby={"Paragraphp"}
      title={children}
      {...pageProps}
    >
      {children}
    </p>
  );
}
