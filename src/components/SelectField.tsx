import { useState, forwardRef, useImperativeHandle, ChangeEvent } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
  fieldClass?: string;
  labelClass?: string;
  optionClass?: string;
  optionsClass?: string;
};

type SelectFieldRef = {
  reset: () => void;
  getValue: () => string;
};

const SelectField = forwardRef<SelectFieldRef, SelectFieldProps>(
  (
    { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: Select Field is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Select field requires a name");
    } else if (!label) {
      throw new Error("Select field requires a label");
    } else if (!options || options.length === 0) {
      throw new Error("Select field requires at least one option");
    }

    const [selected, setSelected] = useState<string>(options[0].value);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value);
    };

    const reset = () => setSelected(options[0].value);

    const getValue = (): string => selected;

    useImperativeHandle(ref, () => ({
      reset,
      getValue,
    }));

    return (
      <div className={fieldClass}>
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={selected}
          onChange={handleChange}
          className={optionsClass}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={optionClass}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectField;
