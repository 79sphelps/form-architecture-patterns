export type FormField = "title";

export interface Todo {
  title: string;
}

export type TodoForm = Pick<Todo, FormField>;

export type ErrorState<T> = Partial<Record<keyof T, string>>;
export type TouchedState<T> = Partial<Record<keyof T, boolean>>;
export type DirtyState<T> = Partial<Record<keyof T, boolean>>;