import { X } from "lucide-react";

interface AlertNotificationProps {
  alert: {
    type: "success" | "error";
    message: string;
  } | null;
  onClose: () => void;
}

export default function AlertNotification({
  alert,
  onClose,
}: AlertNotificationProps) {
  if (!alert) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        alert.type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{alert.message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
