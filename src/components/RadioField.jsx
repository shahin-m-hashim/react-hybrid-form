/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle, memo } from "react";

const RadioField = memo(
  forwardRef(
    ({ name, label, options, defaultValue, updateFormInputs }, ref) => {
      console.log(`Radio field ${name} rendered`);

      const [selected, setSelected] = useState(defaultValue);

      const handleChange = (e) => {
        const newValue = e.target.value;
        setSelected(newValue);
        updateFormInputs(name, newValue);
      };

      const reset = () => {
        setSelected(defaultValue);
        updateFormInputs(name, defaultValue);
      };

      useImperativeHandle(ref, () => ({
        reset,
      }));

      return (
        <div className="field" style={{ flexDirection: "row" }}>
          {label && <label>{label}</label>}
          {options.map((option) => (
            <div key={option.value}>
              <label
                htmlFor={option.value}
                style={{
                  gap: ".25rem",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
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
    }
  )
);

export default RadioField;
