/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const TextAreaField = forwardRef(function TextAreaField(
  {
    name,
    rows,
    cols,
    label,
    fieldClass,
    labelClass,
    errorClass,
    placeholder,
    defaultValue,
    textareaClass,
    validate = () => {},
  },
  ref
) {
  if (!ref) {
    throw new Error("All react hybrid form fields must have a ref");
  } else if (!name) {
    throw new Error("Text area field requires a name");
  }

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
    <div className={fieldClass}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        cols={cols}
        name={name}
        value={input.value}
        onChange={handleChange}
        placeholder={placeholder}
        className={textareaClass}
        style={{
          border: input.error ? "2px solid red" : "",
        }}
      />
      {input.error && <p className={errorClass}>{input.error}</p>}
    </div>
  );
});

export default TextAreaField;
