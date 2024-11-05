import { memo, useState } from "react";
import {
  validateName,
  validateEmail,
  validateDueDate,
  validatePassword,
  validateDescription,
} from "../../utils/validator";

import showPwd from "../../assets/showPwd.webp";
import hidePwd from "../../assets/hidePwd.webp";

const ControlledForm = memo(function ControlledForm() {
  console.log("Controlled Form rendered");

  const [inputs, setInputs] = useState({
    name: { value: "", error: null },
    email: { value: "", error: null },
    gender: { value: "", error: null },
    dueDate: { value: "", error: null },
    interests: { value: [], error: null },
    description: { value: "", error: null },
    question: { value: "Punjab", error: null },
    password: { value: "", error: null, showPassword: false },
    confirmPassword: { value: "", error: null, showPassword: false },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
          ? [...inputs.interests.value, value]
          : inputs.interests.value.filter((interest) => interest !== value)
        : value;

    const newInputs = {
      ...inputs,
      [name]: { value: newValue, error: validateField(name, newValue) },
    };

    setInputs(newInputs);
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "dueDate":
        return validateDueDate(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return value !== inputs.password.value
          ? "Passwords do not match"
          : null;
      case "description":
        return validateDescription(value);
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(inputs).forEach((key) => {
      newErrors[key] = validateField(key, inputs[key].value);
    });

    const hasErrors = Object.values(newErrors).some((error) => error !== null);

    if (!hasErrors) {
      const finalData = Object.fromEntries(
        Object.entries(inputs)
          .filter(([key]) => key !== "confirmPassword")
          .map(([key, { value }]) => [key, value])
      );

      console.log("Form submitted:", finalData);
      resetForm();
    } else {
      setInputs((prevInputs) =>
        Object.keys(prevInputs).reduce((acc, key) => {
          acc[key] = { ...prevInputs[key], error: newErrors[key] };
          return acc;
        }, {})
      );
    }
  };

  const resetForm = () => {
    setInputs({
      name: { value: "", error: null },
      email: { value: "", error: null },
      dueDate: { value: "", error: null },
      password: { value: "", error: null },
      confirmPassword: { value: "", error: null },
      description: { value: "", error: null },
      gender: { value: "", error: null },
      question: { value: "Punjab", error: null },
      interests: { value: [], error: null },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          flex: "1",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="field">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="on"
            className="input"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name.value}
          />
          {inputs.name.error && (
            <span className="err-txt">{inputs.name.error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="dueDate" className="label">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="input"
            onChange={handleChange}
            value={inputs.dueDate.value}
          />
          {inputs.dueDate.error && (
            <span className="err-txt">{inputs.dueDate.error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="input"
            autoComplete="on"
            placeholder="Email"
            onChange={handleChange}
            value={inputs.email.value}
          />
          {inputs.email.error && (
            <span className="err-txt">{inputs.email.error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            Password:
          </label>

          <div style={{ position: "relative" }}>
            <input
              type={inputs.password.showPassword ? "text" : "password"}
              className="input"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Confirm password"
              value={inputs.password.value}
            />
            <img
              alt={inputs.password.showPassword ? "show" : "hide"}
              src={inputs.password.showPassword ? showPwd : hidePwd}
              style={{
                top: "0.4rem",
                right: "0.5rem",
                width: "1.25em",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() =>
                setInputs((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    showPassword: !prev.password.showPassword,
                  },
                }))
              }
            />
          </div>

          {inputs.password.error && (
            <span className="err-txt">{inputs.password.error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password:
          </label>

          <div style={{ position: "relative" }}>
            <input
              type={inputs.confirmPassword.showPassword ? "text" : "password"}
              className="input"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm password"
              value={inputs.confirmPassword.value}
            />
            <img
              alt={inputs.confirmPassword.showPassword ? "show" : "hide"}
              src={inputs.confirmPassword.showPassword ? showPwd : hidePwd}
              style={{
                top: "0.4rem",
                right: "0.5rem",
                width: "1.25em",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() =>
                setInputs((prev) => ({
                  ...prev,
                  confirmPassword: {
                    ...prev.confirmPassword,
                    showPassword: !prev.confirmPassword.showPassword,
                  },
                }))
              }
            />
          </div>

          {inputs.confirmPassword.error && (
            <span className="err-txt">{inputs.confirmPassword.error}</span>
          )}
        </div>
      </div>

      <div
        style={{
          flex: "1",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="field">
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            rows="5"
            id="description"
            name="description"
            className="textarea"
            onChange={handleChange}
            placeholder="Description"
            value={inputs.description.value}
          />
          {inputs.description.error && (
            <span className="err-txt">{inputs.description.error}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="question" className="label">
            Capital of India?
          </label>
          <select
            id="question"
            name="question"
            className="input"
            onChange={handleChange}
            value={inputs.question.value}
          >
            <option value="Punjab">Punjab</option>
            <option value="Kerala">Kerala</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        <div className="field">
          <span className="label">Gender?</span>
          <div className="options">
            <div className="option">
              <input
                id="male"
                type="radio"
                value="male"
                name="gender"
                onChange={handleChange}
                checked={inputs.gender.value === "male"}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="option">
              <input
                id="female"
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={inputs.gender.value === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="field">
          <span className="label">Interests?</span>
          <div className="options">
            {["eat", "play", "sleep", "music"].map((interest) => (
              <label key={interest} className="option">
                <span>
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </span>
                <input
                  id={interest}
                  type="checkbox"
                  name="interests"
                  value={interest}
                  onChange={handleChange}
                  checked={inputs.interests.value.includes(interest)}
                />
              </label>
            ))}
          </div>
        </div>

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

export default ControlledForm;
