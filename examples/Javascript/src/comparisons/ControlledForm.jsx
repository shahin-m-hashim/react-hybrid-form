import { useState } from "react";

export default function ControlledForm() {
  const [inputs, setInputs] = useState({
    name: { value: "", error: null },
    gender: { value: "", error: null },
    password: { value: "", error: null },
    interests: { value: [], error: null },
    description: { value: "", error: null },
    question: { value: "Punjab", error: null },
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
        return !value ? "Name is required" : null;
      case "password":
        return !value ? "Password is required" : null;
      case "description":
        return !value ? "Description is required" : null;
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

      console.log(finalData);
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
      gender: { value: "", error: null },
      password: { value: "", error: null },
      interests: { value: [], error: null },
      description: { value: "", error: null },
      question: { value: "Punjab", error: null },
    });
  };

  return (
    <form
      style={{
        gap: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
      onSubmit={handleSubmit}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name.value}
        />
        {inputs.name.error && <span>{inputs.name.error}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password.value}
        />
        {inputs.password.error && <span>{inputs.password.error}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <label htmlFor="description">Description:</label>
        <textarea
          rows="5"
          id="description"
          name="description"
          onChange={handleChange}
          value={inputs.description.value}
        />
        {inputs.description.error && <span>{inputs.description.error}</span>}
      </div>

      <div>
        <label htmlFor="question">Capital of India?</label>
        <select
          id="question"
          name="question"
          onChange={handleChange}
          value={inputs.question.value}
        >
          <option value="Punjab">Punjab</option>
          <option value="Kerala">Kerala</option>
          <option value="New Delhi">New Delhi</option>
        </select>
      </div>

      <div>
        <span>Gender?</span>
        <div>
          <div>
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
          <div>
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

      <div>
        <span>Interests?</span>
        <div>
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
    </form>
  );
}
