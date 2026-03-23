import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "./store";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

export const AddTodoLevel6 = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useStore();

  const isValid = !errors.title;

  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleSubmit = () => {
    if (!isValid) {
      setSubmitState("error");
      return;
    }
    setSubmitState("success");
  };

  // return (
  //   <div className="space-y-4">
  //     <LevelInfo level="6" title="External Store (Zustand)" />

  //     <FieldUI
  //       value={values.title}
  //       error={errors.title}
  //       touched={touched.title}
  //       onChange={handleChange}
  //       onBlur={handleBlur}
  //     />

  //     <SubmitButton disabled={!isValid} />
  //     <RenderCounter />
  //   </div>
  // );

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
        <LevelInfo level={6} title="Level 6 — External Store (Zustand)" description="Form state managed outside React (Zustand)." />
        <Concept concept="Form state managed outside React (Zustand)." />
        <Pros pros={['High performance', 'No unnecessary re-renders']} />
        <Cons cons={['More complex mental model']} />
        <UseCase useCase="TBD" />
      </div> 

      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          onChange={e => handleChange(e.target.value)}
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