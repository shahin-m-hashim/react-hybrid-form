import { memo } from "react";

import {
  InputField,
  RadioField,
  SelectField,
  PasswordField,
  TextAreaField,
  CheckBoxField,
  useHybridForm,
} from "react-hybrid-form";

// This example of HybridForm is the least styled.

const HybridFormE1 = memo(function HybridFormE2() {
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
    <form
      onSubmit={handleSubmit}
      style={{
        gap: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <InputField
        type="text"
        name="name"
        label="Name:"
        ref={register("name")}
      />

      <PasswordField
        name="password"
        label="Password:"
        ref={register("password")}
        requiresConfirmation={false}
        requiresTogglingVisibility={false}
        validate={(v) => (!v ? "Description is required" : "")}
      />

      <TextAreaField
        rows="5"
        cols="10"
        name="description"
        label="Description:"
        ref={register("description")}
      />

      <SelectField
        name="question"
        label="Capital of India?"
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

      <CheckBoxField
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
      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <button type="reset" className="reset-btn" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>
  );
});

export default HybridFormE1;
