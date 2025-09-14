import React, { useState, useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = ({ recipe, onSuccess }) => {
  const [title, setTitle] = useState(recipe.title || '');
  const [description, setDescription] = useState(recipe.description || '');
  const [prepTime, setPrepTime] = useState(recipe.prepTime || '');
  const [difficulty, setDifficulty] = useState(recipe.difficulty || 'Medium');
  const [ingredients, setIngredients] = useState(recipe.ingredients || ['']);
  const [ingredientInput, setIngredientInput] = useState('');
  
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  useEffect(() => {
    setTitle(recipe.title || '');
    setDescription(recipe.description || '');
    setPrepTime(recipe.prepTime || '');
    setDifficulty(recipe.difficulty || 'Medium');
    setIngredients(recipe.ingredients?.length ? recipe.ingredients : ['']);
  }, [recipe]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    const updatedRecipe = {
      title: title.trim(),
      description: description.trim(),
      ...(prepTime && { prepTime: parseInt(prepTime) }),
      ...(difficulty && { difficulty }),
      ingredients: ingredients.filter(i => i.trim() !== '')
    };
    
    updateRecipe(recipe.id, updatedRecipe);
    
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Title *
        </label>
        <input
          type="text"
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description"
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="edit-prepTime" className="block text-sm font-medium text-gray-700 mb-1">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            id="edit-prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g., 30"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="edit-difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="edit-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients
        </label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            ingredient && (
              <div key={index} className="flex items-center">
                <span className="flex-1 px-3 py-2 bg-gray-50 rounded-md">
                  {ingredient}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                  aria-label="Remove ingredient"
                >
                  ×
                </button>
              </div>
            )
          ))}
          <div className="flex">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient(e)}
              placeholder="Add an ingredient and press Enter"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={() => onSuccess()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
