import { memo } from "react";
import { useForm, Controller } from "react-hook-form";

const ReactHookForm = memo(function ReactHookForm() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        gap: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" {...field} type="text" />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        )}
      />

      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" {...field} type="password" />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" {...field} rows={5} cols={10} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
        )}
      />

      <Controller
        name="question"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <label htmlFor="question">Capital of India?</label>
            <select id="question" {...field}>
              <option value="Punjab">Punjab</option>
              <option value="Kerala">Kerala</option>
              <option value="New Delhi">New Delhi</option>
            </select>
            {errors.question && <p>{errors.question.message}</p>}
          </div>
        )}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <label>Gender?</label>
            <div>
              <label>
                <input
                  type="radio"
                  {...field}
                  value="male"
                  checked={field.value === "male"}
                  style={{ marginRight: "8px" }}
                />
                Male
              </label>
              <label>
                <input
                  {...field}
                  type="radio"
                  value="female"
                  checked={field.value === "female"}
                />
                Female
              </label>
            </div>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>
        )}
      />

      <Controller
        name="interests"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div>
            <label>Interests?</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="eat"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      field.onChange([...field.value, e.target.value]);
                    } else {
                      field.onChange(
                        field.value.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                  checked={field.value.includes("eat")}
                />
                Eat
              </label>
              <label>
                <input
                  type="checkbox"
                  value="play"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      field.onChange([...field.value, e.target.value]);
                    } else {
                      field.onChange(
                        field.value.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                  checked={field.value.includes("play")}
                />
                Play
              </label>
              <label>
                <input
                  type="checkbox"
                  value="sleep"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      field.onChange([...field.value, e.target.value]);
                    } else {
                      field.onChange(
                        field.value.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                  checked={field.value.includes("sleep")}
                />
                Sleep
              </label>
              <label>
                <input
                  type="checkbox"
                  value="music"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      field.onChange([...field.value, e.target.value]);
                    } else {
                      field.onChange(
                        field.value.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                  checked={field.value.includes("music")}
                />
                Music
              </label>
            </div>
            {errors.interests && <p>{errors.interests.message}</p>}
          </div>
        )}
      />

      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <button type="reset" className="reset-btn" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </form>
  );
});

export default ReactHookForm;
