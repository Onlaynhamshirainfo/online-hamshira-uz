import React from "react";

export default function Error({errors , name}) {

  if(!errors){
    return null;
  }

  return (
    <span>
      {errors ? (
        <span className="pl-5 text-red-500 text-sm">
          {errors?.[name]?.[0] || errors?.message}
        </span>
      ) : (
        ""
      )}
    </span>
  );
}
