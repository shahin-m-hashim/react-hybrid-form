import { forwardRef, useState, useImperativeHandle, ChangeEvent } from "react";

type PasswordFieldProps = {
  name: string;
  label?: string;
  fieldClass?: string;
  inputClass?: string;
  labelClass?: string;
  errorClass?: string;
  placeholder?: string;
  showPasswordIcon?: string;
  hidePasswordIcon?: string;
  toggleVisibilityClass?: string;
  requiresConfirmation?: boolean;
  requiresTogglingVisibility?: boolean;
  validate: (value: string) => string | null;
};

type InputState = {
  password: {
    value: string;
    show: boolean;
    error: string | null;
  };
  cPassword: {
    value: string;
    show: boolean;
    error: string | null;
  };
};

type PasswordFieldRef = {
  reset: () => void;
  getValue: () => string;
  validate: () => boolean;
};

const PasswordField = forwardRef<PasswordFieldRef, PasswordFieldProps>(
  (
    {
      name,
      label,
      validate,
      fieldClass,
      inputClass,
      labelClass,
      errorClass,
      placeholder,
      showPasswordIcon,
      hidePasswordIcon,
      toggleVisibilityClass,
      requiresConfirmation = true,
      requiresTogglingVisibility = true,
    },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: Password Field is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Password field requires a name");
    } else if (!validate) {
      throw new Error("Password field requires a validation function");
    } else if (!label && !placeholder) {
      throw new Error(
        "Password field requires either a label or a placeholder"
      );
    }

    const [input, setInput] = useState<InputState>({
      password: { value: "", error: null, show: false },
      cPassword: { value: "", error: null, show: false },
    });

    const validatePassword = (): boolean => {
      const error = validate(input.password.value);
      setInput((prev) => ({
        ...prev,
        password: { ...prev.password, error },
      }));
      return !error;
    };

    const validateCPassword = (): boolean => {
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

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error = validate(value);
      const cError =
        value === input.cPassword.value ? null : "Passwords do not match";
      setInput({
        password: { value, error, show: input.password.show },
        cPassword: {
          value: input.cPassword.value,
          error: cError,
          show: input.cPassword.show,
        },
      });
    };

    const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error =
        value === input.password.value ? null : "Passwords do not match";
      setInput((prev) => ({
        ...prev,
        cPassword: { value, error, show: prev.cPassword.show },
      }));
    };

    const getValue = (): string => input.password.value;

    const reset = () =>
      setInput({
        password: { value: "", error: null, show: false },
        cPassword: { value: "", error: null, show: false },
      });

    const validateOnSubmit = (): boolean => {
      const isPasswordValid = validatePassword();
      if (requiresConfirmation) {
        const isCPasswordValid = validateCPassword();
        return isPasswordValid && isCPasswordValid;
      } else {
        return isPasswordValid;
      }
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
              style={{
                width: "100%",
                border: input.password.error ? "2px solid red" : "",
              }}
            />
            {requiresTogglingVisibility && (
              <img
                alt={input.password.show ? "hide" : "show"}
                src={input.password.show ? showPasswordIcon : hidePasswordIcon}
                className={toggleVisibilityClass}
                onClick={() => {
                  setInput((prev) => ({
                    ...prev,
                    password: { ...prev.password, show: !prev.password.show },
                  }));
                }}
              />
            )}
          </div>

          {input.password.error && (
            <p className={errorClass}>{input.password.error}</p>
          )}
        </div>

        {requiresConfirmation && (
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
                onChange={handleCPasswordChange}
                placeholder={placeholder && `Confirm ${name}`}
                type={input.cPassword.show ? "text" : "password"}
                style={{
                  width: "100%",
                  border: input.cPassword.error ? "2px solid red" : "",
                }}
              />
              {requiresTogglingVisibility && (
                <img
                  alt={input.cPassword.show ? "hide" : "show"}
                  src={
                    input.cPassword.show ? showPasswordIcon : hidePasswordIcon
                  }
                  className={toggleVisibilityClass}
                  onClick={() => {
                    setInput((prev) => ({
                      ...prev,
                      cPassword: {
                        ...prev.cPassword,
                        show: !prev.cPassword.show,
                      },
                    }));
                  }}
                />
              )}
            </div>
            {input.cPassword.error && (
              <p className={errorClass}>{input.cPassword.error}</p>
            )}
          </div>
        )}
      </>
    );
  }
);

export default PasswordField;
