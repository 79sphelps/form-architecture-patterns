import { create } from "zustand";
import type {
  TodoForm,
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";
import { validateTitle } from "../../shared/utils/validators";

type State = {
  values: TodoForm;
  errors: ErrorState<TodoForm>;
  touched: TouchedState<TodoForm>;
  dirty: DirtyState<TodoForm>;
  handleChange: (value: string) => void;
  handleBlur: () => void;
};

export const useStore = create<State>((set, get) => ({
  values: { title: "" },
  errors: {},
  touched: {},
  dirty: {},

  handleChange: (value) => {
    const { touched } = get();
    
    set((state) => ({
      values: { title: value },
      dirty: { title: true },
      errors: touched.title
        ? { title: validateTitle(value) }
        : state.errors,
    }));
  },

  handleBlur: () => {
    const { values } = get();

    set({
      touched: { title: true },
      errors: { title: validateTitle(values.title) },
    });
  },
}));