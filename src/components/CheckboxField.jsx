/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const CheckboxField = forwardRef(function CheckboxField(
  { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
  ref
) {
  if (!name) {
    throw new Error("Checkbox field requires a name");
  } else if (!label) {
    throw new Error("Checkbox field requires a label");
  } else if (!options || options.length === 0) {
    throw new Error("Checkbox field requires options");
  }

  console.log(`Checkbox field ${name} rendered`);

  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const reset = () => setSelected([]);
  const getValue = () => selected;

  useImperativeHandle(ref, () => ({ reset, getValue }));

  return (
    <div className={fieldClass}>
      <span className={labelClass}>{label}</span>
      <div className={optionsClass}>
        {options.map((option) => (
          <div key={option.value} className={optionClass}>
            <label htmlFor={option.value}>
              {option.label}
              <input
                name={name}
                type="checkbox"
                id={option.value}
                value={option.value}
                onChange={handleChange}
                checked={selected.includes(option.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CheckboxField;
