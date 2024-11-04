/* eslint-disable react/prop-types */

import { forwardRef, useImperativeHandle, useState } from "react";

const InputField = forwardRef(function InputField(
  {
    type,
    name,
    label,
    validate,
    fieldClass,
    inputClass,
    labelClass,
    errorClass,
    placeholder,
    defaultValue,
    autoComplete,
  },
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

  const getValue = () => input.value;
  const reset = () => setInput({ value: defaultValue || "", error: null });

  useImperativeHandle(ref, () => ({
    reset,
    getValue,
    validate: validateInput,
  }));

  return (
    <div className={fieldClass}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={input.value}
        className={inputClass}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          border: input.error ? "2px solid red" : "",
        }}
      />
      {input.error && <p className={errorClass}>{input.error}</p>}
    </div>
  );
});

export default InputField;
