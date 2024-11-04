/* eslint-disable react/prop-types */
import { forwardRef, useState, useImperativeHandle } from "react";

const PasswordField = forwardRef(function PasswordField(
  {
    name,
    label,
    validate,
    fieldClass,
    inputClass,
    labelClass,
    errorClass,
    placeholder,
  },
  ref
) {
  if (!name) {
    throw new Error("Password field requires a name");
  }

  if (!validate) {
    throw new Error("Password field requires a validation function");
  }

  console.log(`Password field ${name} rendered`);

  const [input, setInput] = useState({
    password: {
      value: "",
      error: null,
    },
    cPassword: {
      value: "",
      error: null,
    },
  });

  const validatePassword = () => {
    const error = validate(input.password.value);
    setInput((prev) => ({
      ...prev,
      password: { ...prev.password, error },
    }));
    return !error;
  };

  const validateCPassword = () => {
    const error =
      !input.cPassword.value || input.password.value !== input.cPassword.value
        ? "Passwords do not match"
        : null;
    setInput((prev) => ({
      ...prev,
      cPassword: { ...prev.cPassword, error },
    }));
    return !error;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const error = validate(value);
    const cError =
      value === input.cPassword.value ? null : "Passwords do not match";
    setInput({
      password: { value, error },
      cPassword: { value: input.cPassword.value, error: cError },
    });
  };

  const handleCPasswordChange = (e) => {
    const value = e.target.value;
    const error =
      value === input.password.value ? null : "Passwords do not match";
    setInput((prev) => ({
      ...prev,
      cPassword: { value, error },
    }));
  };

  const getValue = () => input.password.value;

  const reset = () =>
    setInput({
      password: { value: "", error: null },
      cPassword: { value: "", error: null },
    });

  const validateOnSubmit = () => {
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateCPassword();
    return isPasswordValid && isConfirmPasswordValid;
  };

  useImperativeHandle(ref, () => ({
    reset,
    getValue,
    validate: validateOnSubmit,
  }));

  return (
    <>
      <div className={fieldClass}>
        {label && (
          <label htmlFor={name} className={labelClass}>
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type="password"
          className={inputClass}
          placeholder={placeholder}
          value={input.password.value}
          onChange={handlePasswordChange}
          style={{ border: input.password.error ? "2px solid red" : "" }}
        />
        {input.password.error && (
          <p className={errorClass}>{input.password.error}</p>
        )}
      </div>

      <div className={fieldClass}>
        {label && (
          <label htmlFor={`${name}-cPwd`} className={labelClass}>
            Confirm {label}
          </label>
        )}
        <input
          type="password"
          id={`${name}-cPwd`}
          name={`${name}-cPwd`}
          className={inputClass}
          value={input.cPassword.value}
          placeholder="Confirm Password"
          onChange={handleCPasswordChange}
          style={{ border: input.cPassword.error ? "2px solid red" : "" }}
        />
        {input.cPassword.error && (
          <p className={errorClass}>{input.cPassword.error}</p>
        )}
      </div>
    </>
  );
});

export default PasswordField;
