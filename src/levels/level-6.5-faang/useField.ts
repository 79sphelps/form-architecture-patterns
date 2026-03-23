import { useEffect } from "react";

export const createUseField = <T extends Record<string, any>>(
  useStore: any,
) => {
  return (name: keyof T, validator?: (v: any, values: T) => string) => {
    // ✅ primitive subscriptions ONLY
    const value = useStore((s: any) => s.values[name] ?? "");
    const error = useStore((s: any) => s.errors[name]);
    const touched = useStore((s: any) => s.touched[name]);
    const dirty = useStore((s: any) => s.dirty[name]);

    // ✅ no subscriptions for actions
    const { setValue, setTouched, register, unregister } =
      useStore.getState();

    useEffect(() => {
      register(name, validator);
      return () => unregister(name);
    }, [name]);

    return {
      value,
      error,
      touched,
      dirty,
      onChange: (v: string) => setValue(name, v),
      onBlur: () => setTouched(name),
    };
  };
};