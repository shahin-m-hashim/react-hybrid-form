<div align="center">
  <img src="./RHF Banner.webp" alt="Banner">
</div>

<div align="center" style="margin-top: .5rem;">
  <a href="https://github.com/shahin-m-hashim" target="_blank">
    <img alt="Creator" src="https://img.shields.io/badge/%40shahinmhashim-blue">
  </a>
  <img alt="Package Version" src="https://img.shields.io/badge/v1.0.0-brightgreen">
  <a href="./LICENSE" target="_blank">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-red">
  </a>
  <img alt="NPM Version" src="https://img.shields.io/npm/v/react">
  <img alt="Zipped Size" src="https://img.shields.io/badge/40%20kb%20zipped-gold">
  <a href="https://github.com/shahin-m-hashim/react-hybrid-form" target="_blank">
    <img alt="Repository" src="https://img.shields.io/badge/repository-black?logo=github">
  </a>
  <a href="https://github.com/shahin-m-hashim/react-hybrid-form/tree/master/examples" target="_blank">
  <img alt="Static Badge" src="https://img.shields.io/badge/examples-purple">
  </a>
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

- Simplicity and Readability: Integrate and set up forms quickly and easily, ensuring a smooth start without hassle.

- Optimized Performance: Achieve high performance for both simple and complex forms without the overhead typically found in other libraries.

- Component-Based Architecture: Adhere to React's principles with reusable components, making forms modular and easy to manage.

- Custom Styling Support: Easily apply your own styles or leverage popular libraries like Tailwind and Bootstrap to align with your app’s design.

- Dedicated Field Components: Utilize specialized components for common input types such as text, password, select, radio, and checkbox.

- Advanced Password Handling: Enjoy built-in support for password confirmation logic and toggling visibility with minimal setup.

- Type Script Support: Enjoy full TypeScript support for strong typing, enhanced autocompletion, and error detection during development. Benefit from out-of-the-box types for form fields, validation, and submission handling, ensuring type safety and reducing runtime errors.

# Why choose this over others ?

Popular form libraries offer robust features, but often add unnecessary complexity and performance overhead for something simple. Here’s how this hybrid form library streamlines the process:

1. Performance Without Complexity -

- Other Libraries: Often require heavy state management (like Redux Form) or excessive hooks (like React Hook Form), which can lead to performance issues with re-renders, especially in large forms.

- This Library: Optimizes performance by minimizing re-renders and decoupling state, combining the speed of uncontrolled forms with the flexibility of real-time validation.

2. Simple, Minimal API -

   - Other Libraries: Typically involve multiple hooks and configurations, which can feel overwhelming for simple forms.

   - This Library: Provides just three core functions keeping the API lean and straightforward for any form setup.

3. Very Low Learning Curve -

- Other Libraries: Require familiarity with advanced React patterns and extensive documentation, which can slow down development, especially for beginners.

- This Library: Designed for clarity and ease of use, allowing even beginners to quickly set up and manage forms without extensive prerequisites.

4. Extremely Light Weight

   - Other Libraries: Libraries like Formik and React Hook Form can be hefty, often exceeding hundreds of kilobytes.

   - This Library: Coming in at an ultra-light 81.7 KB, it's designed to provide many features without the bloat, ensuring fast loading times and better performance for your app.

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
2. getFormData() - returns entire form data if every validation passes.
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

Each field component is specialized for its input type, offering a consistent API and handling common validation requirements. All fields require a name prop and a ref prop attached to register function.
The name specified in the field should match the name passed to the register function.

1. Standard Input Field:

   ```
   <InputField
      name="username" // required
      defaultValue="" // optional and defaults to ""
      type="text" // default is text
      validate={validationFn()} // optional
      ref={register("username")} // required
      placeholder="username" // optional if label is provided
      label="Username: " // optional if placeholder is provided
   />
   ```

2. Dedicated Password field:

   - Built in password visibility toggling
   - Automatic and easy confirm password validation

   **requiresConfirmation** & **requiresTogglingVisibility** are special props to enable or disable the confirm password feature or the password visibility toggling feature.

   ```
   <PasswordField
      name="password" // required
      ref={register("password")} // required
      validate={validatePassword} // required
      placeholder="password" // optional if label is provided
      requiresConfirmation={false} // Optional, default is true
      label="Password: " // optional if placeholder is provided
      requiresTogglingVisibility={false} // Optional, default is true
   />
   ```

3. Text Area Field:

   ```
   <TextAreaField
      name="bio" // required
      ref={register("bio")} // required
      validate={validationFn()} // optional
      defaultValue="" // optional and defaults to ""
      placeholder="bio" // optional if label is provided
      label="Bio: " // optional if placeholder is provided
   />
   ```

4. Radio, Select and Checkbox Fields:

   ```
   <SelectField
       name="country" // required
       label="Country" // required
       options={[
           { value: "usa", label: "USA" },
           { value: "canada", label: "Canada" },
       ]} // required & defaults to 1st option
       ref={register("country")} // required
   />

   <RadioField
       name="gender" // required
       label="Gender" // required
       options={[
           { value: "male", label: "Male" },
           { value: "female", label: "Female" },
       ]} // required & defaults to 1st option
       ref={register("gender")} // required
   />

   <CheckBoxField
       name="interests" // required
       label="Interests" // required
       options={[
           { value: "sports", label: "Sports" },
           { value: "music", label: "Music" },
       ]} // required & defaults to 1st option
       ref={register("interests")} // required
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

Recommended way to style using classes (
custom, tailwind, bootstrap ...etc) -

### Custom CSS Example -

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

JSX -

```
  <InputField
    labelClass="text-lg text-black md:text-semibold"
    fieldClass="field"
    inputClass="input"
    errorClass="err-txt"
  />

  <PasswordField
    labelClass="label"
    fieldClass="flex flex-column gap-2"
    inputClass="input"
    errorClass="err-txt"
    toggleVisibilityClass="togglePwdVisibility"
  />

  <TextAreaField
    rows={5}
    cols={10}
    labelClass="label"
    fieldClass="field"
    errorClass="text-red-500 text-sm"
    textareaClass="textarea"
  />

  <SelectField
    fieldClass="field"
    labelClass="label"
    optionsClass="flex gap-2
  />

  <RadioField
    fieldClass="field"
    labelClass="label"
    optionClass="flex gap-1"
    optionsClass="options"
  />

  <CheckboxField
    labelClass="label"
    fieldClass="field"
    optionClass="option"
    optionsClass="options"
  />

```

## Conclusion

The Hybrid Form Library is designed to streamline form handling in React, offering a blend of simplicity, performance, and flexibility. It's an ideal choice for developers who want a powerful tool without the complexity of traditional form libraries. Simplify your workflow, minimize overhead, and focus on building great user experiences.

## Explore More

Check out the <a style="text-decoration: underline; font-weight: 600; text-underline-offset: 3px;" href="https://github.com/shahin-m-hashim/react-hybrid-form/tree/master/examples" target="_blank">
EXAMPLES HERE
</a> to see how easy it is to build forms with this library. Whether you're using TypeScript or JavaScript, these demos will help you get up and running quickly.

### About the Author

This library is created and maintained by <a href="https://github.com/shahin-m-hashim" target="_blank">
Shahin M Hashim</a>. Contributions are encouraged and greatly appreciated! If you have feedback or ideas, don’t hesitate to reach out or submit an issue.

### LICENSE

This library is open-source to support the developer community. Please respect the effort and dedication behind it by avoiding the creation of direct derivative works aimed at competing with this project. Licensed under [MIT](./LICENSE)
