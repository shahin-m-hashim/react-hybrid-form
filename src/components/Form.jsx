import { memo, useRef } from "react";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import { validateDescription, validateName } from "../utils/validator";

const Form = memo(function Form() {
  console.log("Form rendered");

  const form = useRef({});

  /*
    For Default Values
    const form = useRef({
      name: "default name",
      description:
        "Add Your default description here. This is a default description.",
    });
  */

  const inputRefs = useRef({});

  const handleReset = () => {
    Object.values(inputRefs.current).forEach((inputRef) => {
      inputRef.reset();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = true;

    Object.entries(inputRefs.current).forEach(([key, inputRef]) => {
      if (inputRef.validate && !inputRef.validate()) {
        isFormValid = false;
      } else {
        form.current[key] = inputRef.getValue();
      }
    });

    if (isFormValid) {
      console.log(form.current);
      handleReset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        validate={validateName}
        defaultValue={form.current.name}
        ref={(el) => (inputRefs.current["name"] = el)}
      />

      <TextAreaField
        rows="5"
        name="description"
        label="Description"
        placeholder="Description"
        validate={validateDescription}
        defaultValue={form.current.description}
        ref={(el) => (inputRefs.current["description"] = el)}
      />

      <SelectField
        name="question"
        label="Capital of India?"
        style={{ padding: "0.5rem" }}
        options={[
          { value: "Punjab", label: "Punjab" },
          { value: "Kerala", label: "Kerala" },
          { value: "New Delhi", label: "New Delhi" },
        ]}
        ref={(el) => (inputRefs.current["question"] = el)}
      />

      <RadioField
        name="gender"
        label="Gender?"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        ref={(el) => (inputRefs.current["gender"] = el)}
      />

      <CheckboxField
        name="interests"
        label="Interests?"
        options={[
          { value: "eat", label: "Eat" },
          { value: "play", label: "Play" },
          { value: "sleep", label: "Sleep" },
          { value: "music", label: "Music" },
        ]}
        ref={(el) => (inputRefs.current["interests"] = el)}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>
      <button type="reset" onClick={handleReset} className="reset-btn">
        Reset
      </button>
    </form>
  );
});

export default Form;
