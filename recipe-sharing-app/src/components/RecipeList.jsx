import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
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
            <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
              {recipe.description}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <Link 
                to={`/recipes/${recipe.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
