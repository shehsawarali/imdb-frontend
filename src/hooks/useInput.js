import {useState} from "react";

const useInput = (validateValue) => {
  const [value, setValue] = useState("");

  const hasError = validateValue(value);

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
