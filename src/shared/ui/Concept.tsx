export const Concept = ({ concept }: any) => (
  <div className="p-4 bg-gray-50 border rounded-lg">
    <label>Concept: </label>
    <p className="text-sm text-gray-600">
    {concept}
    </p>
  </div>
);