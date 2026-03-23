export const SubmitButton: React.FC<{
  disabled?: boolean;
}> = ({ disabled }) => (
  <button
    disabled={disabled}
    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
  >
    Submit
  </button>
);