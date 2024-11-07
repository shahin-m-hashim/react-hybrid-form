import { useRef } from "react";

type FieldValue = string | string[];

type FieldRef = {
  validate?: () => boolean;
  getValue: () => FieldValue;
  reset: () => void;
};

type FormRefs = Record<string, FieldRef>;

type Register = (key: string) => (fieldRef: FieldRef | null) => void;

type HybridFormReturn = [
  Register,
  () => Record<string, FieldValue> | null,
  () => void
];

export default function useHybridForm(): HybridFormReturn {
  const form: Record<string, FieldValue> = {};

  const fieldRefs = useRef<FormRefs>({});

  const register: Register = (key) => (fieldRef) => {
    if (fieldRef) {
      fieldRefs.current[key] = fieldRef;
    }
  };

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
