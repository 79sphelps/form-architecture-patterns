import type { TodoForm } from "../../shared/types/FormTypes";

export const schema = {
  title: (value: TodoForm["title"]) => {
    if (!value) return "Required";
    if (value.length < 5) return "Too short";
    return "";
  },
};