/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const RadioField = forwardRef(function RadioField(
  { name, label, options },
  ref
) {
  if (!name) {
    throw new Error("Radio field requires a name");
  } else if (!label) {
    throw new Error("Radio field requires a label");
  } else if (!options || options.length === 0) {
    throw new Error("Radio field requires options");
  }

  console.log(`Radio field ${name} rendered`);

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => setSelected(e.target.value);
  const reset = () => setSelected(options[0].value);
  const getValue = () => selected;

  useImperativeHandle(ref, () => ({ reset, getValue }));

  return (
    <div className="field" style={{ flexDirection: "row" }}>
      {label && <label>{label}</label>}
      {options.map((option) => (
        <div key={option.value}>
          <label htmlFor={option.value} className="radio">
            {option.label}
            <input
              name={name}
              type="radio"
              id={option.value}
              value={option.value}
              onChange={handleChange}
              checked={selected === option.value}
            />
          </label>
        </div>
      ))}
    </div>
  );
});

export default RadioField;
