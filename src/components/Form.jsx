import { useCallback } from "react";
import { memo, useRef } from "react";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import { validateDescription, validateName } from "../utils/validator";

const Form = memo(function Form() {
  console.log("Form rendered");

  const inputRefs = useRef({});

  const form = useRef({
    name: "",
    interests: [],
    gender: "male",
    description: "",
    question: "Punjab",
  });

  const updateFormInputs = useCallback((input, value) => {
    form.current = {
      ...form.current,
      [input]: value,
    };
  }, []);

  const handleReset = useCallback(() => {
    Object.values(inputRefs.current).forEach((inputRef) => {
      inputRef.reset();
    });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let isFormValid = true;

      Object.values(inputRefs.current).forEach((inputRef) => {
        if (inputRef.validate && !inputRef.validate()) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        console.log(form.current);
        handleReset();
      }
    },
    [inputRefs, handleReset]
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        validate={validateName}
        updateFormInputs={updateFormInputs}
        ref={(el) => (inputRefs.current["name"] = el)}
      />

      <TextAreaField
        rows="5"
        type="text"
        name="description"
        label="Description"
        placeholder="Description"
        validate={validateDescription}
        updateFormInputs={updateFormInputs}
        ref={(el) => (inputRefs.current["description"] = el)}
      />

      <SelectField
        name="question"
        label="Capital of India?"
        style={{ padding: "0.5rem" }}
        updateFormInputs={updateFormInputs}
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
        defaultValue={form.current.gender}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        updateFormInputs={updateFormInputs}
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
        updateFormInputs={updateFormInputs}
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
