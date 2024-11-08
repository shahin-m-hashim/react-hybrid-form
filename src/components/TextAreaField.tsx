import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ChangeEvent,
} from "react";

type TextAreaFieldProps = {
  name: string;
  rows?: number;
  cols?: number;
  label?: string;
  fieldClass?: string;
  labelClass?: string;
  errorClass?: string;
  placeholder?: string;
  defaultValue?: string;
  textareaClass?: string;
  validate?: (value: string) => string | null;
};

type TextAreaState = {
  value: string;
  error: string | null;
};

type TextAreaFieldRef = {
  reset: () => void;
  getValue: () => string;
  validate: () => boolean;
};

const TextAreaField = forwardRef<TextAreaFieldRef, TextAreaFieldProps>(
  (
    {
      name,
      label,
      rows = 3,
      cols = 20,
      fieldClass,
      labelClass,
      errorClass,
      placeholder,
      defaultValue,
      textareaClass,
      validate = () => null,
    },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: Text Area Field is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Text area field requires a name");
    } else if (!label && !placeholder) {
      throw new Error("Input field requires either a label or a placeholder");
    }

    const [input, setInput] = useState<TextAreaState>({
      value: defaultValue || "",
      error: null,
    });

    const validateInput = (): boolean => {
      const error = validate(input.value);
      setInput((prev) => ({ ...prev, error }));
      return !error;
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const error = validate(value);
      setInput({ value, error });
    };

    const reset = () => setInput({ value: defaultValue || "", error: null });

    const getValue = (): string => input.value;

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
  }
);

export default TextAreaField;
