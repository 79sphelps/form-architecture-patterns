import { useState } from "react";
import { motion } from "framer-motion";
import { validateTitle } from "../../shared/utils/validators";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  // DirtyState,
} from "../../shared/types/FormTypes";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

export const AddTodoLevel3 = () => {
  const [values, setValues] = useState<TodoForm>({ title: "" });
  const [errors, setErrors] = useState<ErrorState<TodoForm>>({});
  const [touched, setTouched] = useState<TouchedState<TodoForm>>({});
  // const [dirty, setDirty] = useState<DirtyState<TodoForm>>({});
  const fields = [{ name: "title", label: "Title" }] as const;
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
  //     {fields.map((f) => (
  //       <Input
  //         key={f.name}
  //         id={f.name}
  //         label={f.label}
  //         value={values[f.name]}
  //         onChange={(e) =>
  //           setValues({ ...values, [f.name]: e.target.value })
  //         }
  //         onBlur={() => {
  //           setTouched({ ...touched, [f.name]: true });
  //           setErrors({
  //             ...errors,
  //             [f.name]: validateTitle(values[f.name]),
  //           });
  //         }}
  //         error={errors[f.name]}
  //         touched={touched[f.name]}
  //       />
  //     ))}

  //     <Button>Submit</Button>
  //   </div>
  // );

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
        <LevelInfo level={3} title="Level 3 — Dynamic Fields" description="Uses dynamic field rendering" />
        <Concept concept="State machine via useReducer." />
        <Pros pros={['Scalable', 'DRY']} />
        <Cons cons={['Harder debugging']} />
        <UseCase useCase="TBD" />
      </div>  

      <div className="space-y-1">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor="title">{f.label}</label>
            <input
              id="title"
              value={values[f.name]}
              onChange={(e) =>
                setValues({ ...values, [f.name]: e.target.value })
              }
              onBlur={() => {
                setTouched({ ...touched, [f.name]: true });
                setErrors({
                  ...errors,
                  [f.name]: validateTitle(values[f.name]),
                });
              }}
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
              className="w-full px-3 py-2 border rounded"
            />
            {touched[f.name] && errors[f.name] && (
              <p id="title-error" className="text-red-500 text-sm">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}

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
      </div>
    </motion.div>
  );
};
