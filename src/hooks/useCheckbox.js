import { useState } from "react";

const useCheckbox = (preset = "") => {
  const [value, setValue] = useState(preset);

  const handleChange = (e) => {
    setValue(e.target.checked);
  };

  return {
    value,
    handleChange,
  };
};

export default useCheckbox;
