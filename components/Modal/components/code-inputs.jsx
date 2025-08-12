import React, { useRef, useEffect } from "react";

export default function CodeInputs({ onSubmit }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value && index < inputRefs?.current?.length - 1) {
      inputRefs?.current?.[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
    const values = inputRefs?.current?.map((ref) => ref?.value).join("");
    onSubmit(values);
  };

  return (
    <div className="grid grid-cols-4 gap-3 xs:gap-5">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          placeholder={"*"}
          required
          inputMode="numeric" 
          maxLength={1}
          autoComplete="off"
          type="number"
          className="no-spinner px-5 py-4 border-grey-5 border bg-white  w-full placeholder:leading-normal placeholder:text-text-secondary placeholder:font-normal placeholder:text-base focus:border-green rounded-xl text-center"
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
              inputRefs.current[index - 1].focus();
            }
          }}
        />
      ))}
    </div>
  );
}
