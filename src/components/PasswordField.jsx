/* eslint-disable react/prop-types */
import { forwardRef, useState, useImperativeHandle } from "react";

import showPwd from "../assets/showPwd.png";
import hidePwd from "../assets/hidePwd.png";

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
      show: false,
    },
    cPassword: {
      value: "",
      error: null,
      show: false,
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
      password: { value: "", error: null, show: false },
      cPassword: { value: "", error: null, show: false },
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

        <div style={{ position: "relative" }}>
          <input
            id={name}
            name={name}
            className={inputClass}
            placeholder={placeholder}
            value={input.password.value}
            onChange={handlePasswordChange}
            type={input.password.show ? "text" : "password"}
            style={{ border: input.password.error ? "2px solid red" : "" }}
          />
          <img
            alt={input.password.show ? "show" : "hide"}
            src={input.password.show ? showPwd : hidePwd}
            style={{
              top: "0.4rem",
              right: "0.5rem",
              width: "1.25em",
              cursor: "pointer",
              position: "absolute",
            }}
            onClick={() => {
              setInput((prev) => ({
                ...prev,
                password: { ...prev.password, show: !prev.password.show },
              }));
            }}
          />
        </div>

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
        <div style={{ position: "relative" }}>
          <input
            id={`${name}-cPwd`}
            name={`${name}-cPwd`}
            className={inputClass}
            value={input.cPassword.value}
            placeholder="Confirm Password"
            onChange={handleCPasswordChange}
            type={input.cPassword.show ? "text" : "password"}
            style={{ border: input.cPassword.error ? "2px solid red" : "" }}
          />
          <img
            alt={input.cPassword.show ? "show" : "hide"}
            src={input.cPassword.show ? showPwd : hidePwd}
            style={{
              top: "0.4rem",
              right: "0.5rem",
              width: "1.25em",
              cursor: "pointer",
              position: "absolute",
            }}
            onClick={() => {
              setInput((prev) => ({
                ...prev,
                cPassword: { ...prev.cPassword, show: !prev.cPassword.show },
              }));
            }}
          />
        </div>
        {input.cPassword.error && (
          <p className={errorClass}>{input.cPassword.error}</p>
        )}
      </div>
    </>
  );
});

export default PasswordField;
