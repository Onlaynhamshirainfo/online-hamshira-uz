import React from "react";

export default function CheckboxChecked({
  name,
  required,
  item,
  validation,
  register,
  current,
}) {
  return (
    <label
      forhtml={name}
      className="flex flex-row items-center gap-4 cursor-pointer"
    >
      <span className="custom-checkbox">
        <input
          type="radio"
          required={required}
          id={name}
          name={name}
          value={item?.id}
          defaultChecked={current === item?.id}
          {...register(name, validation)}
        />
        <span>
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7613 0.21934C11.9017 0.359965 11.9806 0.550589 11.9806 0.74934C11.9806 0.948091 11.9017 1.13871 11.7613 1.27934L4.51127 8.52934C4.37064 8.66979 4.18002 8.74868 3.98127 8.74868C3.78252 8.74868 3.59189 8.66979 3.45127 8.52934L0.201268 5.27934C0.0688589 5.13708 -0.00324457 4.94903 0.000112156 4.75471C0.00346888 4.56039 0.0820243 4.37494 0.219267 4.23734C0.356871 4.1001 0.54232 4.02154 0.736637 4.01818C0.930954 4.01483 1.11901 4.08693 1.26127 4.21934L3.98127 6.93934L10.7013 0.21934C10.8419 0.0788894 11.0325 0 11.2313 0C11.43 0 11.6206 0.0788894 11.7613 0.21934Z"
              fill="#fff"
            />
          </svg>
        </span>
      </span>
      <span className="flex-1 text-sm sm:text-base">{item?.name}</span>
    </label>
  );
}
