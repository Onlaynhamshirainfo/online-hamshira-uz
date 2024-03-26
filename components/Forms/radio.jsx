import React from "react";

export default function Radio({
  name,
  register,
  validation,
  errors,
  value,
  label,
}) {
  return (
    <div className="flex items-center me-4">
      <input
        id={value}
        type="radio"
        value={value}
        name="colored-radio"
        className="w-4 h-4 text-green bg-gray-100 border-gray-300 focus:ring-green ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600 transition-colors duration-150"
        {...register(name, validation)}
      />
      <label
        htmlFor={value}
        className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}
