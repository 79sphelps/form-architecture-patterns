import { useState } from "react";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";
import { validateTitle } from "../../shared/utils/validators";

export const useAdminForm = () => {
  const [values, setValues] = useState<TodoForm>({ title: "" });
  const [errors, setErrors] = useState<ErrorState<TodoForm>>({});
  const [touched, setTouched] = useState<TouchedState<TodoForm>>({});
  const [dirty, setDirty] = useState<DirtyState<TodoForm>>({});

  const handleChange = (value: string) => {
    setValues({ title: value });
    setDirty({ title: true });

    if (touched.title) {
      setErrors({ title: validateTitle(value) });
    }
  };

  const handleBlur = () => {
    setTouched({ title: true });
    setErrors({ title: validateTitle(values.title) });
  };

  const isValid = !errors.title;

  return {
    values,
    errors,
    touched,
    dirty,
    handleChange,
    handleBlur,
    isValid,
  };
};