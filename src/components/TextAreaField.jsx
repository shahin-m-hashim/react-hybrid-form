/* eslint-disable react/prop-types */

import { forwardRef, useImperativeHandle, useState } from "react";

const TextAreaField = forwardRef(function TextAreaField(
  { name, rows = 3, label, validate, placeholder, defaultValue },
  ref
) {
  if (!name) {
    throw new Error("Text area field requires a name");
  }

  console.log(`Text area field ${name} rendered`);

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
    <div className="field" style={{ flexDirection: "column" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        rows={rows}
        value={input.value}
        onChange={handleChange}
        placeholder={placeholder}
        className={input.error ? "err-field" : ""}
      />
      {input.error && <p className="err-txt">{input.error}</p>}
    </div>
  );
});

export default TextAreaField;
