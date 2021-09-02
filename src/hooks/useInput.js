import { useState } from "react";

const useInput = (validateValue = null) => {
  const [value, setValue] = useState("");

  const hasError = validateValue ? validateValue(value) : false;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    hasError,
    handleChange,
  };
};

export default useInput;
