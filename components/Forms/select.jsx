import React from "react";
import { Error } from "..";

export default function Select({
  data,
  title,
  id,
  register,
  name,
  validation,
  errors,
}) {
  if (!data) {
    return null;
  }
  return (
    <div>
      <select
        id={id}
        name={name}
        className="bg-white border border-grey-5 text-text-secondary text-base focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-4 focus:border-green rounded-full appearance-none"
        {...register(name, validation)}>
        {data?.map((item, index) => {
          return (
            <option value={item?.id} key={index} className="py-5">
              {item?.name}
            </option>
          );
        })}
      </select>
      <Error errors={errors} name={"branch_id"} />
    </div>
  );
}
