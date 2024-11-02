/* eslint-disable react/prop-types */

import { forwardRef, memo, useImperativeHandle, useState } from "react";

const InputField = memo(
  forwardRef(
    (
      { type, name, label, placeholder, style, validate, updateFormInputs },
      ref
    ) => {
      console.log(`Input field ${name} rendered`);
      const [input, setInput] = useState({ value: "", error: null });

      const validateInput = () => {
        const error = validate(input.value);
        setInput((prev) => ({ ...prev, error }));
        return !error;
      };

      const handleChange = (e) => {
        const value = e.target.value;
        const error = validate(value);
        setInput({ value, error });
        updateFormInputs(name, value);
      };

      const reset = () => {
        setInput({ value: "", error: null });
        updateFormInputs(name, "");
      };

      useImperativeHandle(ref, () => ({
        validate: validateInput,
        reset,
      }));

      return (
        <div className="field">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            id={name}
            type={type}
            style={style}
            value={input.value}
            onChange={handleChange}
            placeholder={placeholder}
            className={input.error ? "err-field" : ""}
          />
          {input.error && <p className="err-txt">{input.error}</p>}
        </div>
      );
    }
  )
);

export default InputField;
