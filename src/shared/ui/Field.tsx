interface Props {
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}

export const Field: React.FC<Props> = ({
  label,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="title" className="block text-sm font-medium">
        {label}
      </label>

      <input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby="title-error"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {touched && error && (
        <p id="title-error" className="text-red-500 text-sm" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};