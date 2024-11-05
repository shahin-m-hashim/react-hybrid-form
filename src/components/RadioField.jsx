/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const RadioField = forwardRef(function RadioField(
  { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
  ref
) {
  if (!ref) {
    throw new Error("All react hybrid form fields must have a ref");
  } else if (!name) {
    throw new Error("Radio field requires a name");
  } else if (!label) {
    throw new Error("Radio field requires a label");
  } else if (!options || options.length === 0) {
    throw new Error("Radio field requires options");
  }

  const [selected, setSelected] = useState(options[0].value);

  const getValue = () => selected;
  const reset = () => setSelected(options[0].value);
  const handleChange = (e) => setSelected(e.target.value);

  useImperativeHandle(ref, () => ({ reset, getValue }));

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
});

export default RadioField;
