import React from "react";

export default function LoaderPage() {
  return (
    <div className="flex justify-center items-center h-full w-full fixed top-0 left-0 z-10 bg-body">
      <div className="animate-spin loader ease-linear rounded-full border-4 border-t-4 border-grey-5 h-14 w-14 relative z-0 border-t-green"></div>
    </div>
  );
}
