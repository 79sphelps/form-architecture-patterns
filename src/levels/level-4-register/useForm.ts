import { useState } from "react";
import { validateTitle } from "../../shared/utils/validators";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";

export const useForm = () => {
  const [values, setValues] = useState<TodoForm>({ title: "" });
  const [errors, setErrors] = useState<ErrorState<TodoForm>>({});
  const [touched, setTouched] = useState<TouchedState<TodoForm>>({});
  const [dirty, setDirty] = useState<DirtyState<TodoForm>>({});

  const register = (field: "title") => ({
    value: values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [field]: e.target.value }),
    onBlur: () => {
      setTouched({ ...touched, [field]: true });
      setErrors({
        ...errors,
        [field]: validateTitle(values[field]),
      });
    },
    error: errors[field],
    touched: touched[field],
  });

  return { register };
};