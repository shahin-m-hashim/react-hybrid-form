import { useRef } from "react";

export default function useHybridForm() {
  const form = useRef({});
  const fieldRefs = useRef({});

  const resetForm = () => {
    Object.values(fieldRefs.current).forEach((fieldRef) => {
      fieldRef.reset();
    });
  };

  const isFormValid = () => {
    let isValid = true;

    Object.entries(fieldRefs.current).forEach(([key, fieldRef]) => {
      if (fieldRef.validate && !fieldRef.validate()) {
        isValid = false;
      } else {
        form.current[key] = fieldRef.getValue();
      }
    });

    return isValid;
  };

  const register = (key) => (fieldRef) => (fieldRefs.current[key] = fieldRef);

  return [form, resetForm, isFormValid, register];
}
