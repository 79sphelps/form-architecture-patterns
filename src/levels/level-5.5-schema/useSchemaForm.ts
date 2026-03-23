import { useState } from "react";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";
import { schema } from "./schema";

export const useSchemaForm = () => {
  const [values, setValues] = useState<TodoForm>({ title: "" });
  const [errors, setErrors] = useState<ErrorState<TodoForm>>({});
  const [touched, setTouched] = useState<TouchedState<TodoForm>>({});
  const [dirty, setDirty] = useState<DirtyState<TodoForm>>({});

  const handleChange = (value: string) => {
    setValues({ title: value });
    setDirty({ title: true });

    if (touched.title) {
      setErrors({ title: schema.title(value) });
    }
  };

  const handleBlur = () => {
    setTouched({ title: true });
    setErrors({ title: schema.title(values.title) });
  };

  return { values, errors, touched, dirty, handleChange, handleBlur };
};