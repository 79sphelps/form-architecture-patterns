export const createUseFormController = (useStore: any) => {
  return () => {
    const errors = useStore((s: any) => s.errors);

    const isValid = Object.values(errors).every((e) => !e);

    return { isValid };
  };
};