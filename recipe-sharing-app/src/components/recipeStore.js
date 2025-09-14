import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => 
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe, updatedAt: new Date().toISOString() } : recipe
      ),
    })),
  getRecipe: (id) => 
    useRecipeStore.getState().recipes.find((recipe) => recipe.id === id),
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
