import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeCard = ({ recipe }) => {
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite(recipe.id));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            <Link 
              to={`/recipes/${recipe.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {recipe.title}
            </Link>
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(recipe.id);
            }}
            className={`p-1 rounded-full ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className="h-6 w-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        
        {recipe.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {recipe.description}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Link 
              to={`/recipes/${recipe.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Recipe →
            </Link>
            
            <div className="flex items-center space-x-2">
              {recipe.prepTime && (
                <span className="flex items-center text-xs text-gray-500">
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
          </div>
          
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-1">Ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                    {ingredient}
                  </span>
                ))}
                {recipe.ingredients.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                    +{recipe.ingredients.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
