export const Pros = ({ pros }: any) => (
  <div className="p-4 bg-gray-50 border rounded-lg">
    <label>Pros: </label>
    <ul>
        {pros.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
  </div>
);