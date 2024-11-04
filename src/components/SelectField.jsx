/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const SelectField = forwardRef(function SelectField(
  { name, label, options, fieldClass, labelClass, optionsClass, optionClass },
  ref
) {
  if (!name) {
    throw new Error("Select field requires a name");
  } else if (!label) {
    throw new Error("Select field requires a label");
  } else if (!options || options.length === 0) {
    throw new Error("Select field requires options");
  }

  console.log(`Select field ${name} rendered`);

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => setSelected(e.target.value);

  const reset = () => setSelected(options[0].value);

  const getValue = () => selected;

  useImperativeHandle(ref, () => ({ reset, getValue }));

  return (
    <div className={fieldClass}>
      <span className={labelClass}>{label}</span>
      <select
        id={name}
        name={name}
        value={selected}
        className={optionsClass}
        onChange={handleChange}
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
});

export default SelectField;
