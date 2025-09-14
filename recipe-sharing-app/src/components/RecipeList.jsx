import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No recipes yet. Add one to get started!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recipes.map((recipe) => (
        <div 
          key={recipe.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
            <p className="text-gray-600">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
