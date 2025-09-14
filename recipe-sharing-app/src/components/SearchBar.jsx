import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    searchTerm,
    searchField,
    filters,
    setSearchTerm,
    setSearchField,
    setFilter,
    addIngredientFilter,
    removeIngredientFilter
  } = useRecipeStore();

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredientInput.trim()) {
      addIngredientFilter(ingredientInput.trim());
      setIngredientInput('');
    }
  };

  const difficultyOptions = ['', 'Easy', 'Medium', 'Hard'];
  const searchFields = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'ingredients', label: 'Ingredients' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-l border-gray-300 pl-2 pr-8 py-1 text-sm text-gray-600 focus:outline-none"
            >
              {searchFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (min)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrepTime || ''}
                  onChange={(e) => setFilter('minPrepTime', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrepTime || ''}
                  onChange={(e) => setFilter('maxPrepTime', parseInt(e.target.value) || 0)}
                  min={filters.minPrepTime || 0}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilter('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {difficultyOptions.map((level) => (
                  <option key={level || 'any'} value={level}>
                    {level || 'Any Difficulty'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <form onSubmit={handleAddIngredient} className="flex gap-2">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add ingredient filter"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </form>
              {filters.ingredients.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filters.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredientFilter(ingredient)}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
