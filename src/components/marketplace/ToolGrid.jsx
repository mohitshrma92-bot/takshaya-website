import ToolCard from "./ToolCard";

const tools = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export default function ToolGrid() {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <ToolCard key={tool.id} />
      ))}
    </div>
  );
}