import { Filter, X } from "lucide-react";

interface OrdersFilterProps {
  searchInput: string;
  selectedStatus: string;
  statuses: string[];
  loading: boolean;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFilterClick: () => void;
  onClearSearch: () => void;
}

export const OrdersPageFilter: React.FC<OrdersFilterProps> = ({
  searchInput,
  selectedStatus,
  statuses,
  loading,
  onFilterChange,
  onStatusChange,
  onKeyPress,
  onFilterClick,
  onClearSearch,
}) => {
  return (
    <div className="py-5 flex flex-col gap-6 tablet:flex-row tablet:justify-between">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:items-center">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="User Name"
            value={searchInput}
            onChange={onFilterChange}
            onKeyPress={onKeyPress}
            className="w-full px-4 py-2.5 pr-10 border border-gray-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light focus:border-transparent placeholder-gray-soft text-sm"
          />
          {searchInput && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 p-1 rounded-full"
              aria-label="Clear search"
              type="button"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="max-w-sm">
          <select
            value={selectedStatus}
            onChange={onStatusChange}
            className="w-full px-4 py-2.5 border border-gray-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onFilterClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium  min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Filter size={16} />
          {loading ? "Searching..." : "Filter"}
        </button>
      </div>
    </div>
  );
};
