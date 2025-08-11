import { useState } from "react";
import { Filter } from "lucide-react";

interface FilterSuppliersProps {
  onFilterChange?: (filterValue: string) => void;
  placeholder?: string;
}

export function FilterSuppliersPage({
  onFilterChange,
  placeholder = "User Name",
}: FilterSuppliersProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange?.(value);
  };

  const handleFilterClick = () => {
    console.log("Filter applied:", filterValue);
  };

  return (
    <div className="flex flex-col tablet:flex-row gap-6 tablet:items-center">
      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          placeholder={placeholder}
          value={filterValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light focus:border-transparent placeholder-gray-400 text-sm"
        />
      </div>
      <button
        onClick={handleFilterClick}
        className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium min-w-fit"
      >
        <Filter size={16} />
        Filter
      </button>
    </div>
  );
}
