import { useEffect } from "react";

const useCheckbox = (inputId, validationMessage) => {
  if (inputId) {
    useEffect(() => {
      const element = document.getElementById(inputId);
      if (element) {
        element.oninvalid = function (e) {
          e.target.setCustomValidity("");
          if (!e.target.validity.valid) {
            e.target.setCustomValidity(validationMessage);
          }
        };
        element.oninput = function (e) {
          e.target.setCustomValidity("");
        };
      }
    }, [inputId, validationMessage]);
  }
};

export default useCheckbox;
