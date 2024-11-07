import { forwardRef, useState, ChangeEvent, useImperativeHandle } from "react";

type InputFieldProps = {
  type?:
    | "tel"
    | "url"
    | "date"
    | "file"
    | "text"
    | "time"
    | "week"
    | "color"
    | "email"
    | "month"
    | "range"
    | "number"
    | "datetime-local";
  name: string;
  label?: string;
  fieldClass?: string;
  inputClass?: string;
  labelClass?: string;
  errorClass?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
  validate?: (value: string) => string | null;
};

type InputState = {
  value: string;
  error: string | null;
};

type InputFieldRef = {
  validate: () => boolean;
  getValue: () => string;
  reset: () => void;
};

const InputField = forwardRef<InputFieldRef, InputFieldProps>(
  (
    {
      name,
      label,
      fieldClass,
      inputClass,
      labelClass,
      errorClass,
      placeholder,
      autoComplete,
      type = "text",
      defaultValue = "",
      validate = () => null,
    },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: InputField is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Input field requires a name");
    } else if (!label && !placeholder) {
      throw new Error("Input field requires either a label or a placeholder");
    }

    const [input, setInput] = useState<InputState>({
      value: defaultValue,
      error: null,
    });

    const validateInput = (): boolean => {
      const error = validate(input.value);
      setInput((prev) => ({ ...prev, error }));
      return !error;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error = validate(value);
      setInput({ value, error });
    };

    const getValue = (): string => input.value;

    const reset = () => setInput({ value: defaultValue, error: null });

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
            width: "100%",
            border: input.error ? "2px solid red" : "",
          }}
        />
        {input.error && <p className={errorClass}>{input.error}</p>}
      </div>
    );
  }
);

export default InputField;
