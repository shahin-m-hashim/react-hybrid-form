import { memo, useRef, useState } from "react";
import {
  validateName,
  validateEmail,
  validateDueDate,
  validatePassword,
  validateDescription,
} from "../../utils/validator";

import showPwd from "../../assets/showPwd.webp";
import hidePwd from "../../assets/hidePwd.webp";

const UncontrolledForm = memo(function UncontrolledForm() {
  console.log("Uncontrolled Form rendered");

  const nameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const dueDateRef = useRef();
  const passwordRef = useRef();
  const questionRef = useRef();
  const interestRef = useRef();
  const descriptionRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      dueDate: dueDateRef.current.value,
      password: passwordRef.current.value,
      description: descriptionRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      gender: genderRef.current.querySelector('input[name="gender"]:checked')
        ?.value,
      question: questionRef.current.value,
      interests: Array.from(
        interestRef.current.querySelectorAll('input[name="interests"]:checked')
      ).map((interest) => interest.value),
    };

    const validateCPassword = (value) =>
      !value || value !== data.password ? "Passwords do not match" : null;

    const newErrors = {
      name: validateName(data.name),
      email: validateEmail(data.email),
      dueDate: validateDueDate(data.dueDate),
      password: validatePassword(data.password),
      description: validateDescription(data.description),
      confirmPassword: validateCPassword(data.confirmPassword),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === null);

    if (isValid) {
      console.log(data);
      resetForm();
      setErrors({});
    }
  };

  const resetForm = () => {
    setErrors({});

    nameRef.current.value = "";
    emailRef.current.value = "";
    dueDateRef.current.value = "";
    passwordRef.current.value = "";
    descriptionRef.current.value = "";
    confirmPasswordRef.current.value = "";
    questionRef.current.value = "Punjab";
    interestRef.current
      .querySelectorAll('input[name="interests"]')
      .forEach((interest) => (interest.checked = false));
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
            ref={nameRef}
            autoComplete="on"
            className="input"
            placeholder="Name"
          />
          {errors.name && <span className="err-txt">{errors.name}</span>}
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
            ref={dueDateRef}
          />
          {errors.dueDate && <span className="err-txt">{errors.dueDate}</span>}
        </div>

        <div className="field">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            className="input"
            placeholder="Email"
            autoComplete="on"
          />
          {errors.email && <span className="err-txt">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            Password:
          </label>

          <div style={{ position: "relative" }}>
            <input
              id="password"
              name="password"
              className="input"
              ref={passwordRef}
              placeholder="Enter password"
              type={show.password ? "text" : "password"}
            />
            <img
              alt={show.password ? "show" : "hide"}
              src={show.password ? showPwd : hidePwd}
              style={{
                top: "0.4rem",
                right: "0.5rem",
                width: "1.25em",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
            />
          </div>

          {errors.password && (
            <span className="err-txt">{errors.password}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={show.confirmPassword ? "text" : "password"}
              className="input"
              id="confirmPassword"
              name="confirmPassword"
              ref={confirmPasswordRef}
              placeholder="Confirm password"
            />
            <img
              alt={show.confirmPassword ? "show" : "hide"}
              src={show.confirmPassword ? showPwd : hidePwd}
              style={{
                top: "0.4rem",
                right: "0.5rem",
                width: "1.25em",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            />
          </div>
          {errors.confirmPassword && (
            <span className="err-txt">{errors.confirmPassword}</span>
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
            ref={descriptionRef}
            placeholder="Description"
          />
          {errors.description && (
            <span className="err-txt">{errors.description}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="question" className="label">
            Capital of India?
          </label>
          <select
            id="question"
            name="question"
            ref={questionRef}
            className="input"
          >
            <option value="Punjab">Punjab</option>
            <option value="Kerala">Kerala</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        <div className="field" ref={genderRef}>
          <span className="label">Gender?</span>
          <div className="options">
            <div className="option">
              <input id="male" type="radio" value="male" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
            <div className="option">
              <input id="female" type="radio" name="gender" value="female" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="field">
          <span className="label">Interests?</span>
          <div className="options" ref={interestRef}>
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

export default UncontrolledForm;
