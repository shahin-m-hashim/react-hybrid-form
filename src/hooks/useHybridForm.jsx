import { useRef } from "react";

export default function useHybridForm() {
  const form = {};
  const fieldRefs = useRef({});

  const register = (key) => (fieldRef) => (fieldRefs.current[key] = fieldRef);

  const getFormData = () => {
    let isValid = true;

    Object.entries(fieldRefs.current).forEach(([key, fieldRef]) => {
      if (fieldRef.validate && !fieldRef.validate()) {
        isValid = false;
      } else {
        form[key] = fieldRef.getValue();
      }
    });

    return isValid ? form : null;
  };

  const resetForm = () => {
    Object.values(fieldRefs.current).forEach((fieldRef) => {
      fieldRef.reset();
    });
  };

  return [register, getFormData, resetForm];
}
