import { useReducer } from "react";

type State = {
  value: string;
  touched: boolean;
  error: string;
};

type Action =
  | { type: "CHANGE"; value: string }
  | { type: "BLUR" }
  | { type: "ERROR"; error: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.value };
    case "BLUR":
      return { ...state, touched: true };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const useReducerForm = () =>
  useReducer(reducer, {
    value: "",
    touched: false,
    error: "",
  });