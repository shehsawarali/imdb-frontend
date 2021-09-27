import { useState } from "react";

const usePresetInput = (preset = "", validateValue = null) => {
  const [value, setValue] = useState(preset);

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

export default usePresetInput;
