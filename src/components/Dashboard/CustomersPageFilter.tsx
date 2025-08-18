import { Filter, X } from "lucide-react";

interface CustomersFilterProps {
  searchInput: string;
  loading: boolean;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFilterClick: () => void;
  onClearSearch: () => void;
}

export function CustomersPageFilter({
  searchInput,
  loading,
  onFilterChange,
  onKeyPress,
  onFilterClick,
  onClearSearch,
}: CustomersFilterProps) {
  return (
    <div className="flex flex-col tablet:flex-row gap-6 tablet:items-center">
      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          placeholder="User Name"
          value={searchInput}
          onChange={onFilterChange}
          onKeyDown={onKeyPress}
          disabled={loading}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light focus:border-transparent placeholder-gray-400 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {searchInput && (
          <button
            onClick={onClearSearch}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Clear search"
            type="button"
          >
            <X size={26} />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onFilterClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium min-w-fit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-light"
        >
          <Filter size={16} />
          Filter
        </button>
      </div>
    </div>
  );
}
