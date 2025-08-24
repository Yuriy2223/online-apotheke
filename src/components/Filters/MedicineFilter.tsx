import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchFilterProps {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters?: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = () => {
    onSearchChange(localSearchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="flex flex-col gap-4 mb-8 tablet:flex-row tablet:items-center">
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg bg-white
         text-black-true focus:outline-none focus:ring-2
          focus:ring-green-500 tablet:min-w-[200px]"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="relative tablet:flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-soft w-5 h-5" />
        <input
          type="text"
          placeholder="Search medicine"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-12 pr-4 py-3 border border-gray-soft rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-green-light"
        />
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2
             text-gray-dark hover:text-gray-dark"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <button
        onClick={handleSearchSubmit}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-light
         text-white rounded-lg hover:bg-green-dark transition-colors tablet:min-w-[100px]"
      >
        <Search className="w-5 h-5" />
        Search
      </button>
    </div>
  );
};
