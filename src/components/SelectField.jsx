/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle, memo } from "react";

const SelectField = memo(
  forwardRef(
    ({ name, label, style, defaultValue, updateFormInputs, options }, ref) => {
      if (options.length === 0) {
        throw new Error("SelectField component requires options");
      }

      console.log(`Select field ${name} rendered`);

      const initialSelected = defaultValue || options[0].value;
      const [selected, setSelected] = useState(initialSelected);

      const handleChange = (e) => {
        setSelected(e.target.value);
        updateFormInputs(name, e.target.value);
      };

      const reset = () => {
        setSelected(initialSelected);
        updateFormInputs(name, initialSelected);
      };

      useImperativeHandle(ref, () => ({
        reset,
      }));

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
    }
  )
);

export default SelectField;
