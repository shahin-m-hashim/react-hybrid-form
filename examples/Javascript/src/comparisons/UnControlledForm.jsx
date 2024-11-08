import { useRef, useState } from "react";

export default function UncontrolledForm() {
  const nameRef = useRef();
  const genderRef = useRef();
  const passwordRef = useRef();
  const questionRef = useRef();
  const interestRef = useRef();
  const descriptionRef = useRef();

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      description: descriptionRef.current.value,
      gender: genderRef.current.querySelector('input[name="gender"]:checked')
        ?.value,
      question: questionRef.current.value,
      interests: Array.from(
        interestRef.current.querySelectorAll('input[name="interests"]:checked')
      ).map((interest) => interest.value),
    };

    const newErrors = {
      name: data.name ? null : "Name is required",
      password: data.password ? null : "Password is required",
      description: data.description ? null : "Description is required",
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
    passwordRef.current.value = "";
    descriptionRef.current.value = "";
    questionRef.current.value = "Punjab";
    interestRef.current
      .querySelectorAll('input[name="interests"]')
      .forEach((interest) => (interest.checked = false));
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
      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" ref={nameRef} />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="description">Description:</label>
        <textarea
          rows="5"
          id="description"
          name="description"
          className="textarea"
          ref={descriptionRef}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div>
        <label htmlFor="question">Capital of India?</label>
        <select id="question" name="question" ref={questionRef}>
          <option value="Punjab">Punjab</option>
          <option value="Kerala">Kerala</option>
          <option value="New Delhi">New Delhi</option>
        </select>
      </div>

      <div ref={genderRef}>
        <span>Gender?</span>
        <div>
          <div>
            <input id="male" type="radio" value="male" name="gender" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input id="female" type="radio" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>

      <div>
        <span>Interests?</span>
        <div ref={interestRef}>
          {["eat", "play", "sleep", "music"].map((interest) => (
            <label key={interest}>
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
    </form>
  );
}
