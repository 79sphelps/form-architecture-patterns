export const LevelInfo = ({ level, title, description }: any) => (
  <div className="p-4 bg-gray-50 border rounded-lg">
    <h2 className="font-bold">
      Level {level} — {title}
    </h2>
    <p>{description}</p>
  </div>
);