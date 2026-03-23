export const Cons = ({ cons }: any) => (
  <div className="p-4 bg-gray-50 border rounded-lg">
    <label>Cons: </label>
    <ul>
        {cons.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
  </div>
);