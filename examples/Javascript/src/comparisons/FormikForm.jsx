import { memo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  question: Yup.string().required("This field is required"),
  gender: Yup.string().required("Please select your gender"),
  description: Yup.string().required("Description is required"),
  interests: Yup.array().min(1, "Select at least one interest"),
});

const FormikForm = memo(function FormikForm() {
  console.log("FormikForm rendered");

  const initialValues = {
    name: "",
    gender: "",
    password: "",
    question: "",
    interests: [],
    description: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form
          style={{
            gap: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <Field
              as="textarea"
              rows="5"
              cols="10"
              id="description"
              name="description"
            />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label htmlFor="question">Capital of India?</label>
            <Field as="select" id="question" name="question">
              <option value="">Select an option</option>
              <option value="Punjab">Punjab</option>
              <option value="Kerala">Kerala</option>
              <option value="New Delhi">New Delhi</option>
            </Field>
            <ErrorMessage name="question" component="div" />
          </div>

          <div>
            <label>Gender?</label>
            <div>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
            </div>
            <ErrorMessage name="gender" component="div" />
          </div>

          <div>
            <label>Interests?</label>
            <div>
              <label>
                <Field type="checkbox" name="interests" value="eat" />
                Eat
              </label>
              <label>
                <Field type="checkbox" name="interests" value="play" />
                Play
              </label>
              <label>
                <Field type="checkbox" name="interests" value="sleep" />
                Sleep
              </label>
              <label>
                <Field type="checkbox" name="interests" value="music" />
                Music
              </label>
            </div>
            <ErrorMessage name="interests" component="div" />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="reset" onClick={resetForm} className="reset-btn">
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default FormikForm;
