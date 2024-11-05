import { memo } from "react";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import PasswordField from "./PasswordField";
import useHybridForm from "../hooks/useHybridForm";

import {
  validateName,
  validateEmail,
  validateDueDate,
  validatePassword,
  validateDescription,
} from "../utils/validator";

const HybridForm = memo(function HybridForm() {
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
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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

        <InputField
          type="date"
          name="dueDate"
          label="Due Date:"
          labelClass="label"
          fieldClass="field"
          inputClass="input"
          errorClass="err-txt"
          ref={register("dueDate")}
          validate={validateDueDate}
        />

        <InputField
          type="email"
          name="email"
          label="Email:"
          labelClass="label"
          fieldClass="field"
          inputClass="input"
          errorClass="err-txt"
          placeholder="Email"
          ref={register("email")}
          validate={validateEmail}
        />

        <PasswordField
          label="Password:"
          name="password"
          labelClass="label"
          fieldClass="field"
          inputClass="input"
          errorClass="err-txt"
          ref={register("password")}
          validate={validatePassword}
          placeholder="Enter password"
        />
      </div>

      <div
        style={{
          flex: "1",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
      </div>
    </form>
  );
});

export default HybridForm;