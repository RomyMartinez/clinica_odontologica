import { Plus } from "lucide-react";

interface AddBarProps {
  title: string;
  buttonLabel: string;
  onClick: () => void;
}

export function AddBar({ title, buttonLabel, onClick }: AddBarProps) {
  return (
    <div className="flex justify-between items-center p-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button
        onClick={onClick}
        className="flex flex-row items-center bg-blue-500 border-2 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2 text-gray-50 px-4 gap-2 py-2 rounded-lg cursor-pointer"
      >
        <Plus size={20} />
        {buttonLabel}
      </button>
    </div>
  );
}
