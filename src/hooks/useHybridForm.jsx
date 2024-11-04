import { useRef } from "react";

export default function useHybridForm() {
  const form = {};
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
        form[key] = fieldRef.getValue();
      }
    });

    return isValid;
  };

  const register = (key) => (fieldRef) => (fieldRefs.current[key] = fieldRef);

  const getFormData = () => {
    if (isFormValid()) {
      return form;
    }
    return null;
  };

  return [register, getFormData, resetForm];
}
