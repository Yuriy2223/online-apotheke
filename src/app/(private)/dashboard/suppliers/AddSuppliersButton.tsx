import { Plus } from "lucide-react";

interface AddSuppliersButtonProps {
  onClick?: () => void;
  text?: string;
}

export function AddSuppliersButton({
  onClick,
  text = "Add a new supplier",
}: AddSuppliersButtonProps) {
  const handleClick = () => {
    console.log("Add new supplier clicked");
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
    >
      <Plus size={20} />
      {text}
    </button>
  );
}
