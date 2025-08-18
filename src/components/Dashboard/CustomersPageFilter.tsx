import { useState } from "react";
import { Filter, X } from "lucide-react";

interface CustomersFilterProps {
  onFilterChange?: (filterValue: string) => void;
  placeholder?: string;
}

export function CustomersPageFilter({
  onFilterChange,
  placeholder = "User Name",
}: CustomersFilterProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
  };

  const handleFilterClick = () => {
    onFilterChange?.(filterValue);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    onFilterChange?.("");
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
        {filterValue && (
          <button
            onClick={handleClearFilter}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 p-1 rounded-full"
            aria-label="Clear search"
            type="button"
          >
            <X size={26} />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleFilterClick}
          className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium min-w-fit"
        >
          <Filter size={16} />
          Filter
        </button>
      </div>
    </div>
  );
}
