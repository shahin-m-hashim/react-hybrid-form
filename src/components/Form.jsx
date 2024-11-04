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

  const [form, resetForm, isFormValid, register] = useHybridForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log(form.current);

      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        ref={register("name")}
        validate={validateName}
      />

      <TextAreaField
        rows="5"
        name="description"
        label="Description"
        placeholder="Description"
        ref={register("description")}
        validate={validateDescription}
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
        ref={register("question")}
      />

      <RadioField
        name="gender"
        label="Gender?"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        ref={register("gender")}
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
