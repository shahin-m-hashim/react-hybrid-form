/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const SelectField = forwardRef(function SelectField(
  { name, label, style, options },
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
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        style={style}
        value={selected}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectField;
