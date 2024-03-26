import React from "react";

export default function Button({ children, type = "button", ...pageProps }) {
  return (
    <button
      type={type}
      className="w-full linear py-4 px-5 text-white leading-normal font-medium text-base rounded-full"
      {...pageProps}>
      {children}
    </button>
  );
}
