import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "./useForm";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

export const AddTodoLevel4 = () => {
  const { register } = useForm();
  const title = register("title");
  const isValid = !title.error;
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
  //     <Input
  //       id="title"
  //       label="Title"
  //       {...title}
  //     />

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
        <LevelInfo level={4} title="Level 4 — Register Pattern" description="Fields register themselves to form." />
        <Concept concept="State machine via useReducer." />
        <Pros pros={['Type-safe', 'Clean API']} />
        <Cons cons={['More abstraction']} />
        <UseCase useCase="TBD" />
      </div>  

      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title.value}
          onChange={(e) => title.onChange(e)}
          onBlur={() => title.onBlur()}
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