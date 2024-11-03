/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";

const CheckboxField = forwardRef(function CheckboxField(
  { name, label, options, style },
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
    <div className="field" style={{ flexDirection: "row" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {label && <label>{label}</label>}
        {options.map((option) => (
          <div key={option.value}>
            <label htmlFor={option.value} className="checkbox" style={style}>
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
