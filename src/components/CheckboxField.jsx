/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle, memo } from "react";

const CheckboxField = memo(
  forwardRef(({ name, label, options, updateFormInputs }, ref) => {
    console.log(`Checkbox field ${name} rendered`);

    const [selected, setSelected] = useState([]);

    const handleChange = (e) => {
      const value = e.target.value;
      setSelected((prev) => {
        const isChecked = prev.includes(value);
        const newSelected = isChecked
          ? prev.filter((item) => item !== value)
          : [...prev, value];
        updateFormInputs(name, newSelected);
        return newSelected;
      });
    };

    const reset = () => {
      setSelected([]);
      updateFormInputs(name, []);
    };

    useImperativeHandle(ref, () => ({
      reset,
    }));

    return (
      <div className="field" style={{ flexDirection: "row" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {label && <label>{label}</label>}
          {options.map((option) => (
            <div key={option.value}>
              <label
                htmlFor={option.value}
                style={{
                  gap: ".5rem",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
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
  })
);

export default CheckboxField;
