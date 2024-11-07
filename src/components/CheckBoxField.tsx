import { useState, forwardRef, useImperativeHandle, ChangeEvent } from "react";

type Option = {
  label: string;
  value: string;
};

type CheckboxFieldProps = {
  name: string;
  label: string;
  options: Option[];
  fieldClass?: string;
  labelClass?: string;
  optionsClass?: string;
  optionClass?: string;
};

type CheckboxFieldRef = {
  reset: () => void;
  getValue: () => string[];
};

const CheckboxField = forwardRef<CheckboxFieldRef, CheckboxFieldProps>(
  (
    { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: Checkbox Field is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Checkbox field requires a name");
    } else if (!label) {
      throw new Error("Checkbox field requires a label");
    } else if (!options || options.length === 0) {
      throw new Error("Checkbox field requires at least one option");
    }

    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };

    const reset = () => setSelected([]);
    const getValue = () => selected;

    useImperativeHandle(ref, () => ({
      reset,
      getValue,
    }));

    return (
      <div className={fieldClass}>
        <span className={labelClass}>{label}</span>
        <div className={optionsClass}>
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={option.value}
              className={optionClass}
            >
              <span>{option.label}</span>
              <input
                name={name}
                type="checkbox"
                id={option.value}
                value={option.value}
                onChange={handleChange}
                checked={selected.includes(option.value)}
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
);

export default CheckboxField;
