import type { TodoForm } from "../types/FormTypes";

export const validateTitle = (value: TodoForm["title"]) =>
  /^[A-Za-z0-9_&, ']{5,}$/.test(value)
    ? ""
    : "Title must be at least 5 characters";

// export const validateTitle = (value: string): string => {
//   if (!value.trim()) return "Title is required";
//   if (value.length < 5) return "Must be at least 5 characters";
//   return "";
// };

// export const validateTitle = (value: TodoForm["title"]): string => {
//   if (!value.trim()) return "Title is required";
//   if (value.length < 5) return "Must be at least 5 characters";
//   return "";
// };