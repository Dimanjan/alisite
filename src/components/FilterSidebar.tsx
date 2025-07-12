import { Filter, X, Tag, DollarSign } from 'lucide-react';
import type { FilterState, SortOption } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  categories: string[];
  tags: string[];
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterSidebar = ({
  filters,
  categories,
  tags,
  onFilterChange,
  onResetFilters,
  isOpen,
  onToggle
}: FilterSidebarProps) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'reviews-desc', label: 'Most Reviews' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Filter button for mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
      >
        <Filter className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-80 bg-white lg:bg-gray-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200 overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onResetFilters}
                className="text-sm text-blue-600 border border-blue-100 bg-white rounded-md px-3 py-1.5 font-medium shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Reset All
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.selectedCategory === ''}
                  onChange={() => onFilterChange({ selectedCategory: '' })}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">All Categories</span>
              </label>
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.selectedCategory === category}
                    onChange={() => onFilterChange({ selectedCategory: category })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Price Range
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="10"
                  value={filters.priceRange.min}
                  onChange={(e) => onFilterChange({
                    priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">₹{filters.priceRange.min}</span>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="10"
                  value={filters.priceRange.max}
                  onChange={(e) => onFilterChange({
                    priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">₹{filters.priceRange.max}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              Tags
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {tags.slice(0, 50).map((tag) => (
                <label key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.selectedTags.includes(tag)}
                    onChange={(e) => {
                      const updatedTags = e.target.checked
                        ? [...filters.selectedTags, tag]
                        : filters.selectedTags.filter(t => t !== tag);
                      onFilterChange({ selectedTags: updatedTags });
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 