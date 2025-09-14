import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filters = useRecipeStore((state) => state.filters);

  const hasActiveFilters = searchTerm || 
    filters.minPrepTime || 
    filters.maxPrepTime || 
    filters.difficulty || 
    filters.ingredients.length > 0;

  const displayRecipes = hasActiveFilters ? filteredRecipes : recipes;

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No recipes yet. Add one to get started!</p>
        <Link 
          to="/" 
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Your First Recipe
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar />
      
      {hasActiveFilters && filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-yellow-50 rounded-lg">
          <p className="text-yellow-700">
            No recipes match your search criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  <Link 
                    to={`/recipes/${recipe.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {recipe.title}
                  </Link>
                </h3>
                
                {/* Recipe metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  {recipe.prepTime && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recipe.prepTime} min
                    </span>
                  )}
                  {recipe.difficulty && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {recipe.difficulty}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {recipe.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <Link 
                    to={`/recipes/${recipe.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {recipe.ingredients.length} {recipe.ingredients.length === 1 ? 'ingredient' : 'ingredients'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
