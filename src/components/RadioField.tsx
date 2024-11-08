import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ChangeEvent,
} from "react";

type Option = {
  label: string;
  value: string;
};

type RadioFieldProps = {
  name: string;
  label: string;
  options: Option[];
  fieldClass?: string;
  labelClass?: string;
  optionClass?: string;
  optionsClass?: string;
};

type RadioFieldRef = {
  reset: () => void;
  getValue: () => string;
};

const RadioField = forwardRef<RadioFieldRef, RadioFieldProps>(
  (
    { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
    ref
  ) => {
    if (!ref) {
      throw new Error(
        "Critical error: Radio field is not registered via ref !!!"
      );
    } else if (!name) {
      throw new Error("Radio field requires a name");
    } else if (!label) {
      throw new Error("Radio field requires a label");
    } else if (!options || options.length === 0) {
      throw new Error("Radio field requires at least one option");
    }

    const [selected, setSelected] = useState<string>(options[0].value);

    const getValue = () => selected;
    const reset = () => setSelected(options[0].value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      reset,
      getValue,
    }));

    return (
      <div className={fieldClass}>
        <span className={labelClass}>{label}</span>
        <div className={optionsClass}>
          {options.map((option) => (
            <div key={option.value} className={optionClass}>
              <input
                type="radio"
                name={name}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                checked={selected === option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default RadioField;
