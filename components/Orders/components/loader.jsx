import React from "react";

export default function Loader({ per }) {
  return (
    <div className="w-full rounded-full bg-grey-5 h-2">
      <div
        className={`h-full linear rounded-full`}
        style={{ width: per }}></div>
    </div>
  );
}
