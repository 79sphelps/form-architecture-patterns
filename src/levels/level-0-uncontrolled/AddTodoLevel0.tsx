import { FormEvent, useState } from "react";
import { RenderCounter } from "../../shared/ui/RenderCounter";
import { motion } from "framer-motion";
import { LevelInfo } from "../../shared/ui/LevelInfo";
import { Pros } from "../../shared/ui/Pros";
import { Cons } from "../../shared/ui/Cons";
import { Concept } from "../../shared/ui/Concept";
import { UseCase } from "../../shared/ui/UseCase";

export const AddTodoLevel0 = () => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Title is required";
    if (value.length < 5) return "Must be at least 5 characters";
    return "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = String(data.get("title") || "");

    const err = validate(value);
    setError(err);
    if (err) return;

    alert("Submitted: " + value);
  };

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
          <LevelInfo level={0} title="Level 0 — Uncontrolled" description="TBD" />
          <Concept concept="Uses native form behavior with FormData" />
          <Pros pros={['No React State', 'Very fast']} />
          <Cons cons={['No real-time validation', 'Poor UX']} />
          <UseCase useCase="Simple forms, legacy systems" />
        </div>

        <div className="space-y-1">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            onBlur={() => setTouched(true)}
            aria-invalid={!!error}
            className="w-full px-3 py-2 border rounded"
          />
          {touched && error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>

        <RenderCounter />
      </form>
    </motion.div>
  );
};
