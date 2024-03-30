import React from "react";
import { Error } from "..";

export default function Textarea({
  type = "text",
  placeholder,
  name,
  coupon,
  register,
  validation,
  errors,
  format,
  label,
}) {
  return (
    <div className="relative z-0 w-full flex flex-col gap-2">
      <label
        htmlFor={name}
        className="px-1  text-text-primary leading-4 font-medium text-base">
        {label}
      </label>
      <textarea
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        autoComplete="off"
        className="px-5 py-4 border-grey-5 border bg-white  w-full placeholder:leading-normal placeholder:text-text-secondary placeholder:font-normal placeholder:text-base
        focus:border-green rounded-3xl resize-none min-h-[200px]"
        {...register(name, validation)}></textarea>

      <Error errors={errors} name={name} />
    </div>
  );
}
