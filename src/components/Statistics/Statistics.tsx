import { Package, Truck, Users } from "lucide-react";

export function Statistics() {
  const stats = [
    { icon: Package, label: "All products", value: "8,430" },
    { icon: Truck, label: "All suppliers", value: 211 },
    { icon: Users, label: "All customers", value: 140 },
  ];

  return (
    <ul className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-6" role="list">
      {stats.map(({ icon: Icon, label, value }, index) => (
        <li
          key={index}
          className={`bg-white-true rounded-lg p-6 border border-gray-light transition-all duration-200 cursor-pointer hover:border-green-light hover:shadow-sm`}
          role="group"
          aria-label={label}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="text-gray-dark" aria-hidden="true">
              <Icon size={24} strokeWidth={2} />
            </div>
            <span className="text-sm text-gray-dark">{label}</span>
          </div>
          <strong
            className="text-2xl font-semibold text-black-true"
            aria-live="polite"
          >
            {value}
          </strong>
        </li>
      ))}
    </ul>
  );
}
