/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const TextAreaField = forwardRef(function TextAreaField(
  {
    name,
    rows,
    cols,
    label,
    validate,
    fieldClass,
    labelClass,
    errorClass,
    fieldStyles,
    placeholder,
    labelStyles,
    inputStyles,
    errorStyles,
    defaultValue,
  },
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
    <div className={fieldClass} style={fieldStyles}>
      {label && (
        <label htmlFor={name} className={labelClass} style={labelStyles}>
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
        className={input.error ? "err-field" : inputStyles} // Default error styling
        style={{
          border: input.error ? "2px solid red" : "", // Default error styling
          ...inputStyles,
        }}
      />
      {input.error && (
        <p className={errorClass} style={errorStyles}>
          {input.error}
        </p>
      )}
    </div>
  );
});

export default TextAreaField;
