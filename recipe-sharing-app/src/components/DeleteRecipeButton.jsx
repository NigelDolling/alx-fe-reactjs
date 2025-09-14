import React, { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, onSuccess }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (onSuccess) onSuccess();
  };

  if (isConfirming) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-red-600">Are you sure?</span>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      aria-label="Delete recipe"
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
