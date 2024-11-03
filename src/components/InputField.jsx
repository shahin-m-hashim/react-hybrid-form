/* eslint-disable react/prop-types */

import { forwardRef, useImperativeHandle, useState } from "react";

const InputField = forwardRef(function InputField(
  { type, name, label, validate, placeholder, defaultValue },
  ref
) {
  if (!name) {
    throw new Error("Input field requires a name");
  } else if (!type) {
    throw new Error("Input field requires a type");
  }

  console.log(`Input field ${name} rendered`);
  const [input, setInput] = useState({
    value: defaultValue || "",
    error: null,
  });

  const validateInput = () => {
    const error = validate(input.value);
    setInput((prev) => ({ ...prev, error }));
    return !error;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const error = validate(value);
    setInput({ value, error });
  };

  const reset = () => setInput({ value: defaultValue || "", error: null });
  const getValue = () => input.value;

  useImperativeHandle(ref, () => ({
    reset,
    getValue,
    validate: validateInput,
  }));

  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        value={input.value}
        onChange={handleChange}
        placeholder={placeholder}
        className={input.error ? "err-field" : ""}
      />
      {input.error && <p className="err-txt">{input.error}</p>}
    </div>
  );
});

export default InputField;
