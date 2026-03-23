import { create } from "zustand";
import type {
  ErrorState,
  TouchedState,
  DirtyState,
} from "../../shared/types/FormTypes";

type Validator<T> = (value: any, values: T) => string;

type FormStore<T> = {
  values: T;
  errors: ErrorState<T>;
  touched: TouchedState<T>;
  dirty: DirtyState<T>;
  validators: Partial<Record<keyof T, Validator<T>>>;

  register: (name: keyof T, validator?: Validator<T>) => void;
  unregister: (name: keyof T) => void;

  setValue: (name: keyof T, value: any) => void;
  setTouched: (name: keyof T) => void;
};

export const createFormStore = <T extends Record<string, any>>() =>
  create<FormStore<T>>((set, get) => ({
    values: { title: "" } as T,
    errors: {},
    touched: {},
    dirty: {},
    validators: {},

    // register: (name, validator) => {
    //   set((state) => ({
    //     validators: {
    //       ...state.validators,
    //       [name]: validator,
    //     },
    //   }));
    // },

    register: (name, validator) => {
      set((state) => {
        if (!validator || state.validators[name] === validator) {
          return state; // ✅ NO UPDATE
        }

        return {
          validators: {
            ...state.validators,
            [name]: validator,
          },
        };
      });
    },

    // unregister: (name) => {
    //   set((state) => {
    //     const v = { ...state.validators };
    //     delete v[name];
    //     return { validators: v };
    //   });
    // },

    unregister: (name) => {
      set((state) => {
        if (!(name in state.validators)) return state;

        const v = { ...state.validators };
        delete v[name];

        return { validators: v };
      });
    },

    setValue: (name, value) => {
      const { validators, values, touched } = get();

      const newValues = { ...values, [name]: value };

      const error =
        touched[name] && validators[name]
          ? validators[name]!(value, newValues)
          : "";

      set((state) => ({
        values: newValues,
        dirty: { ...state.dirty, [name]: true },
        errors: {
          ...state.errors,
          [name]: error,
        },
      }));
    },

    setTouched: (name) => {
      const { values, validators } = get();

      const error = validators[name]
        ? validators[name]!(values[name], values)
        : "";

      set((state) => ({
        touched: { ...state.touched, [name]: true },
        errors: {
          ...state.errors,
          [name]: error,
        },
      }));
    },
  }));
