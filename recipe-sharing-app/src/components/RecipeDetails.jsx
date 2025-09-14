import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );

  useEffect(() => {
    if (!recipe) {
      navigate('/not-found', { replace: true });
    }
  }, [recipe, navigate]);

  if (!recipe) {
    return null;
  }

  const handleUpdateSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </h1>
              {recipe.updatedAt && (
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <DeleteRecipeButton 
                recipeId={recipe.id} 
                onSuccess={handleDeleteSuccess} 
              />
            </div>
          </div>

          {isEditing ? (
            <EditRecipeForm 
              recipe={recipe} 
              onSuccess={handleUpdateSuccess} 
            />
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {recipe.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
