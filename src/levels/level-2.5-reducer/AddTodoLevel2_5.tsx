import { useReducer, useState } from "react";
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

type State = {
  values: TodoForm;
  errors: ErrorState<TodoForm>;
  touched: TouchedState<TodoForm>;
  dirty: DirtyState<TodoForm>;
};

type Action = { type: "CHANGE"; value: string } | { type: "BLUR" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: { title: action.value },
        dirty: { title: true },
      };
    case "BLUR":
      return {
        ...state,
        touched: { title: true },
        errors: { title: validateTitle(state.values.title) },
      };
    default:
      return state;
  }
};

export const AddTodoLevel2_5 = () => {
  const [state, dispatch] = useReducer(reducer, {
    values: { title: "" },
    errors: {},
    touched: {},
    dirty: {},
  });

  const isValid = !state.errors.title;

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
      <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
        <LevelInfo level={2.5} title="Level 2.5 — Reducer State" description="Uses a reducer and dispatch functions to update form state." />
        <Concept concept="State machine via useReducer." />
        <Pros pros={['Predictable state updates', 'Easier debugging']} />
        <Cons cons={['More boilerplate']} />
        <UseCase useCase="TBD" />
      </div>  

      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={state.values.title}
          onChange={(e) => dispatch({ type: "CHANGE", value: e.target.value })}
          onBlur={() => dispatch({ type: "BLUR" })}
          aria-invalid={!!state.errors.title}
          aria-describedby="title-error"
          className="w-full px-3 py-2 border rounded"
        />
        {state.touched.title && state.errors.title && (
          <p id="title-error" className="text-red-500 text-sm">
            {state.errors.title}
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
