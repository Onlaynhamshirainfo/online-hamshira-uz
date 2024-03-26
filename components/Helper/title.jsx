import React from "react";

export default function Title({ children, count }) {
  return (
    <div className="flex flex-row items-center justify-start gap-3">
      <h1 className="text-text-primary leading-normal font-semibold text-base sm:text-lg">
        {children}
      </h1>
      {count ? (
        <div className="linear text-white w-6 h-6 rounded-full overflow-hidden text-center text-xs flex items-center justify-center font-semibold ">
          {count}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
