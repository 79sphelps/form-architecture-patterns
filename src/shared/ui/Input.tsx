interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  label: string;
}

export const Input: React.FC<Props> = ({
  label,
  error,
  touched,
  id,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {touched && error && (
        <p id={`${id}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};