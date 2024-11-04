import { memo } from "react";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import useHybridForm from "../hooks/useHybridForm";
import { validateDescription, validateName } from "../utils/validator";

const Form = memo(function Form() {
  console.log("Form rendered");

  const [register, getFormData, resetForm] = useHybridForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = getFormData();

    if (data) {
      console.log(data);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        label="Name:"
        autoComplete="on"
        placeholder="Name"
        labelClass="label"
        fieldClass="field"
        inputClass="input"
        errorClass="err-txt"
        ref={register("name")}
        validate={validateName}
      />

      <TextAreaField
        rows="5"
        // cols="10"
        name="description"
        labelClass="label"
        fieldClass="field"
        label="Description:"
        errorClass="err-txt"
        textareaClass="textarea"
        placeholder="Description"
        ref={register("description")}
        validate={validateDescription}
      />

      <SelectField
        name="question"
        label="Capital of India?"
        fieldClass="field"
        labelClass="label"
        optionsClass="input"
        options={[
          { value: "Punjab", label: "Punjab" },
          { value: "Kerala", label: "Kerala" },
          { value: "New Delhi", label: "New Delhi" },
        ]}
        ref={register("question")}
      />

      <RadioField
        name="gender"
        label="Gender?"
        fieldClass="field"
        labelClass="label"
        optionsClass="options"
        optionClass="option"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        ref={register("gender")}
      />

      <CheckboxField
        name="interests"
        label="Interests?"
        labelClass="label"
        fieldClass="field"
        optionsClass="options"
        optionClass="option"
        options={[
          { value: "eat", label: "Eat" },
          { value: "play", label: "Play" },
          { value: "sleep", label: "Sleep" },
          { value: "music", label: "Music" },
        ]}
        ref={register("interests")}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>
      <button type="reset" onClick={resetForm} className="reset-btn">
        Reset
      </button>
    </form>
  );
});

export default Form;
