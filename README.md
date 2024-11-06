<div style="text-align: center;">

![RHF_banner](./RHF_banner.png "Banner")

</div>

# Introduction

Welcome to the Hybrid Form Library, a simple, straightforward
and high-performance form solution for React applications.
This library combines the benefits of both controlled and
uncontrolled forms, enabling real-time validation and
seamless integration with minimal code.

### **_"My goal with this library is to let you make forms effortless, letting you focus on what matters - while it handles the tedious parts."_**

# Key Features

- Hybrid Approach: Leverage the speed and efficiency of uncontrolled forms while enjoying real-time validation of individual fields for an enhanced user experience.

- Effortless Integration: Set up forms quickly and easily, ensuring a smooth start without hassle.

- Simplicity and Readability: Integrate forms seamlessly with a straightforward API that resembles standard HTML forms, resulting in clean, maintainable code.

- Optimized Performance: Achieve high performance for both simple and complex forms without the overhead typically found in other libraries.

- Component-Based Architecture: Adhere to React's principles with reusable components, making forms modular and easy to manage.

- Custom Styling Support: Easily apply your own styles or leverage popular libraries like Tailwind and Bootstrap to align with your app’s design.

- Dedicated Field Components: Utilize specialized components for common input types such as text, password, select, radio, and checkbox.

- Advanced Password Handling: Enjoy built-in support for password confirmation logic and toggling visibility with minimal setup.

- Clarity and Simplicity: Write forms in a way that is easy to read and maintain, promoting a clear and understandable codebase.

# Why choose this over others ?

Popular form libraries offer robust features, but often add unnecessary complexity and performance overhead. Here’s how this hybrid form library streamlines the process:

1. Performance Without Complexity -

- Other Libraries: Often require heavy state management (like Redux Form) or excessive hooks (like React Hook Form), which can lead to performance issues with re-renders, especially in large forms.

- This Library: Optimizes performance by minimizing re-renders and decoupling state, combining the speed of uncontrolled forms with the flexibility of real-time validation.

2. Simple, Minimal API -

   - Other Libraries: Typically involve multiple hooks and configurations, which can feel overwhelming for simple forms. React Hook Form and Formik, for example, use complex setups like Controller and useForm to manage state and validation.

   - This Library: Provides just three core functions—register, getFormData, and resetForm—keeping the API lean and straightforward for any form setup.

3. Low Learning Curve -

- Other Libraries: Require familiarity with advanced React patterns and extensive documentation, which can slow down development, especially for simpler projects.

- This Library: Designed for clarity and ease of use, allowing even beginners to quickly set up and manage forms without extensive prerequisites.

# Installation

    npm install react-hybrid-form

# Usage

Start by creating your form component and using the useHybridForm hook to manage form registration and data retrieval:

> &#128161; **Tip** Here's an important performance optimization tip to remember! -
>
> - Memoize the main form using React.memo()
> - Avoid using other states inside the main form.
> - Stick to the below pattern as much as you can.

The form has just 3 simple and straightforward api -

1. register() - attaches to the form fields and is critical for functioning
2. getFormData() - returns entire form data if every validation
   passes.
3. resetForm() - resets the entire form to its default.

```
import { useHybridForm } from 'react-hybrid-form';

const MyForm = () => {
  const [register, getFormData, resetForm] = useHybridForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getFormData();
    if(data){
      console.log(data);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields go here */}
    </form>
  );
};

```

### Registering Fields:-

> Critical -
>
> - Requires field provided by the library itself.
> - name passed to fields and register should be same.
> - No two fields within the form can have the same name.
> - Must attach the register api via reference of each field.

Use the register function to integrate each form field. This function automatically handles validation and state management.

```
<InputField
  type="text"
  name="name"
  ref={register("name")}
/>
```

### Dedicated Field Components:-

Each field component is specialized for its input type, offering a consistent API and handling common validation requirements.

1. Standard Input Field:

   **Requires** - name, type and must have either a label or a placeholder.

   ```
   <InputField
      type="text"
      name="username"
      placeholder="Username"
      ref={register("username")}
   />
   ```

2. Dedicated Password field:

   - Built in password visibility toggling
   - Automatic and easy confirm password validation

   **Requires** - same as standard input.

   ```
   <PasswordField
      name="password"
      label="Password"
      ref={register("password")}
      validate={validatePassword}
   />
   ```

   Extra props specific to this field -

   **_requiresConfirmation_** & **_requiresTogglingVisibility_** are two props which by default has boolean value true. Incase you want to disable them explicitly set it to false while creating the field.

   ```
   <PasswordField
      name="password"
      label="Password"
      ref={register("password")}
      validate={validatePassword}
      requiresConfirmation={false}
      requiresTogglingVisibility={false}
   />
   ```

3. Radio, Select and Checkbox Fields:

   - defaults to first option (except checkbox)

   **Requires** - name, label and at least one option.

   ```
   <SelectField
       name="country"
       label="Country"
       options={[
           { value: "usa", label: "USA" },
           { value: "canada", label: "Canada" },
       ]}
       ref={register("country")}
   />

   <RadioField
       name="gender"
       label="Gender"
       options={[
           { value: "male", label: "Male" },
           { value: "female", label: "Female" },
       ]}
       ref={register("gender")}
   />

   <CheckboxField
       name="interests"
       label="Interests"
       options={[
           { value: "sports", label: "Sports" },
           { value: "music", label: "Music" },
       ]}
       ref={register("interests")}
   />
   ```

## Validation

The library allows for real-time validation by adding custom validation functions which can easily be passed as props to individual fields thereby centralizing and abstracting complexity. You can use external libraries like Yup or Zod or write custom validation functions directly.

Example using a custom validation fn

```
const validateUsername = (value) => {
  if (!value) return "Username is required";
  if (value.length < 3) return "Username must be at least 3 characters";
  return null;
};

<InputField
  type="text"
  name="username"
  ref={register("username")}
  validate={validateUsername}
/>

```

## Custom Styling Options -

This library is designed with flexible styling in mind, allowing custom classes for each element of a field. You can use popular styling libraries or your own custom CSS classes.

Each class is specific to individual elements within the field, and acts same way as className in react.

Common styling class props -

|    Prop    |        Description         | Applies To |
| :--------: | :------------------------: | :--------: |
| fieldClass | Styles the field container | All fields |
| labelClass |      Styles the label      | All fields |
| errorClass |   Styles error messages    | All fields |

Specific styling class Props

|         Prop          |            Description            |               Applies To               |
| :-------------------: | :-------------------------------: | :------------------------------------: |
|      inputClass       |     Styles the input element      |         Standard input fields          |
|     textareaClass     |        Styles the textarea        |             TextAreaField              |
|     optionsClass      |    Styles the options wrapper     | SelectField, RadioField, CheckboxField |
|      optionClass      |     Styles individual options     |       RadioField, CheckboxField        |
| toggleVisibilityClass | Styles the visibility toggle icon |             PasswordField              |

Recommended Way of using custom styling or other classes -

```
  <InputField
    labelClass="label"
    fieldClass="field"
    inputClass="input"
    errorClass="err-txt"
  />

  <PasswordField
    labelClass="label"
    fieldClass="field"
    inputClass="input"
    errorClass="err-txt"
    toggleVisibilityClass="togglePwdVisibility"
  />

  <TextAreaField
    rows="5"
    cols="10"
    labelClass="label"
    fieldClass="field"
    errorClass="err-txt"
    textareaClass="textarea"
  />

  <SelectField
    fieldClass="field"
    labelClass="label"
    optionsClass="input"
  />

  <RadioField
    fieldClass="field"
    labelClass="label"
    optionClass="option"
    optionsClass="options"
  />

  <CheckboxField
    labelClass="label"
    fieldClass="field"
    optionClass="option"
    optionsClass="options"
  />

```

### CSS (index.css) -

```
  .field {
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .label {
    color: #333;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .input {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  .options {
    gap: 1rem;
    display: flex;
  }

  .option {
    gap: 0.5rem;
    display: flex;
    align-items: center;
  }

  .textarea {
    resize: none;
    padding: 0.5rem;
  }

  .togglePwdVisibility {
    top: 50%;
    right: 0.5rem;
    width: 1.25em;
    cursor: pointer;
    position: absolute;
    transform: translateY(-50%);
  }

  .err-txt {
    color: red;
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }
```

# Complete Form Example -

```
import { memo } from "react";

import {
  InputField,
  RadioField,
  SelectField,
  TextAreaField,
  CheckboxField,
  PasswordField,
  useHybridForm,
} from "react-hybrid-form";

import {
  validateName,
  validateEmail,
  validateDueDate,
  validatePassword,
  validateDescription,
} from "../utils/validator";

import showPwd from "../assets/showPwd.webp";
import hidePwd from "../assets/hidePwd.webp";

const HybridForm = memo(function HybridForm() {
  console.log("Hybrid Form rendered");

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
          name="password"
          label="Password:"
          labelClass="label"
          fieldClass="field"
          inputClass="input"
          errorClass="err-txt"
          ref={register("password")}
          showPasswordIcon={showPwd}
          hidePasswordIcon={hidePwd}
          validate={validatePassword}
          placeholder="Enter password"
          toggleVisibilityClass="togglePwdVisibility"
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
          cols="10"
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
          fieldClass="field"
          labelClass="label"
          optionsClass="input"
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
          fieldClass="field"
          labelClass="label"
          optionClass="option"
          optionsClass="options"
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
          optionClass="option"
          optionsClass="options"
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

```

# Conclusion

With the Hybrid Form Library, you gain a powerful and easy-to-use tool for managing forms in React.
Say goodbye to the complexities of traditional form libraries and embrace a solution that prioritizes performance, readability, and ease of use.
