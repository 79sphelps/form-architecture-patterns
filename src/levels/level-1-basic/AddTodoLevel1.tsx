import { useState } from "react";
import { motion } from "framer-motion";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";
import { validateTitle } from "../../shared/utils/validators";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

export const AddTodoLevel1 = () => {
  const [values, setValues] = useState<TodoForm>({ title: "" });
  const [errors, setErrors] = useState<ErrorState<TodoForm>>({});
  const [touched, setTouched] = useState<TouchedState<TodoForm>>({});
  const [dirty, setDirty] = useState<DirtyState<TodoForm>>({});
  const isValid = !errors.title;
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );

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

  const handleSubmit = () => {
    if (!isValid) {
      setSubmitState("error");
      return;
    }
    setSubmitState("success");
  };

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
        <LevelInfo level={1} title="Level 1 — Local State" description="Basic controlled form with useState" />
        <Concept concept="Each field controlled via useState." />
        <Pros pros={['Simple', 'Easy to understand']} />
        <Cons cons={['Not reusable', 'Scales poorly']} />
        <UseCase useCase="Simple forms, legacy systems" />
      </div>

      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
          className="w-full px-3 py-2 border rounded"
        />
        {touched.title && errors.title && (
          <p id="title-error" className="text-red-500 text-sm">
            {errors.title}
          </p>
        )}
      </div>

      {submitState === "success" && (
        <div className="p-3 bg-green-100 text-green-700 rounded">
          Successfully submitted!
        </div>
      )}

      {submitState === "error" && (
        <div
          className="p-3 bg-red-100 text-red-700 rounded"
          role="alert"
          aria-live="assertive"
        >
          Please fix the errors above.
        </div>
      )}

      <button
        disabled={!isValid}
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
      >
        Submit
      </button>

      <RenderCounter />
    </motion.div>
  );
};