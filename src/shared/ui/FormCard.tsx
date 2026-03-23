export const FormCard: React.FC<{ title: string; description: string, children }> = ({
  title,
  description,
  children,
}) => (
  <div className="space-y-4">
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);