import { useState } from "react";

export const useForm = (initial: string) => {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  return {
    value,
    touched,
    error,
    setValue,
    setTouched,
    setError,
  };
};