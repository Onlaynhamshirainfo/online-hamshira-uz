import React from "react";
import { Error } from "..";

export default function Input({
  type = "text",
  placeholder,
  name,
  coupon,
  register,
  validation,
  errors,
  format,
  label,
  required = true,
}) {
  return (
    <div
      className={`${
        type === "date" || type === "time"
          ? "relative z-0 w-full"
          : "input__box relative z-0 w-full"
      }`}
    >
      {type === "date" || type === "time" ? (
        <h2 className="pb-2 pl-2 text-text-primary text-sm font-medium">
          {placeholder}:
        </h2>
      ) : (
        ""
      )}
      <input
        type={type}
        placeholder={placeholder}
        placeholder-shown={placeholder}
        name={name}
        id={name}
        format={format}
        required={required}
        autoComplete="off"
        className="px-5 py-4 border-grey-5 border bg-white w-full placeholder:leading-normal placeholder:text-text-secondary placeholder:font-normal placeholder:text-base
        focus:border-green rounded-full"
        {...register(name, validation)}
      />

      {type === "date" || type === "time" ? (
        <></>
      ) : (
        <label
          htmlFor={name}
          className={`px-1 bg-white text-text-secondary leading-4 font-normal text-base ${
            type === "date" || type === "time" ? "opacity-0" : ""
          }`}
        >
          {placeholder}
        </label>
      )}
      <Error errors={errors} name={name} />
    </div>
  );
}
