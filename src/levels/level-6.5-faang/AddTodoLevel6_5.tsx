import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { TodoForm } from "../../shared/types/FormTypes";
import { validateTitle } from "../../shared/utils/validators";
import { createFormStore } from "./formStore";
import { createUseField } from "./useField";
import { createUseFormController } from "./useFormController";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

const useStore = createFormStore<TodoForm>();
const useField = createUseField<TodoForm>(useStore);
const useForm = createUseFormController(useStore);

export const AddTodoLevel6_5 = () => {
  const renders = useRef(0);
  renders.current++;

  const titleValidator = useCallback((v: string) => validateTitle(v), []);
  const title = useField("title", titleValidator);
  const { isValid } = useForm();
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

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* <div className="p-4 bg-gray-50 border rounded-lg">
        <h2 className="font-bold">
          Level 6.5 — Field Registry + Subscription (FAANG)
        </h2>
        <p className="text-sm text-gray-600">
          True field-level isolation using registry + selectors
        </p>
        <p className="text-xs text-gray-400">Form Renders: {renders.current}</p>
      </div> */}
      <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
        <LevelInfo level={6.5} title="Level 6.5 — Field Registry + Subscription (FAANG)" description="True field-level isolation using registry + selectors" />
        <Concept concept="A form system using field registration and selector-based subscriptions to achieve true render isolation." />
        <Pros pros={['Maximum performance', 'Field-level re-render isolation', 'Scales to large, dynamic forms', 'Highly composable']} />
        <Cons cons={['More complex architecture', 'Requires understanding of subscriptions', 'Harder to debug without tooling']} />
        <UseCase useCase="TBD" />
      </div> 

      <div className="space-y-1">
        <label htmlFor="title">Title</label>

        <motion.input
          initial={{ backgroundColor: "#fff" }}
          animate={{ backgroundColor: "#e0f2fe" }}
          transition={{ duration: 0.2 }}
          id="title"
          value={title.value}
          onChange={(e) => title.onChange(e.target.value)}
          onBlur={title.onBlur}
          aria-invalid={!!title.error}
          aria-describedby="title-error"
          className="w-full px-3 py-2 border rounded"
        />

        {title.touched && title.error && (
          <p id="title-error" className="text-red-500 text-sm">
            {title.error}
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
