import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  searchField: 'title', // Default search field
  filters: {
    minPrepTime: 0,
    maxPrepTime: 0,
    difficulty: '',
    ingredients: []
  },
  
  // Getters
  get filteredRecipes() {
    const { recipes, searchTerm, searchField, filters } = get();
    
    return recipes.filter(recipe => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        String(recipe[searchField] || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
      // Preparation time filter
      const matchesPrepTime = 
        (!filters.minPrepTime || (recipe.prepTime || 0) >= filters.minPrepTime) &&
        (!filters.maxPrepTime || (recipe.prepTime || 0) <= filters.maxPrepTime);
      
      // Difficulty filter
      const matchesDifficulty = !filters.difficulty || 
        (recipe.difficulty && recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
      
      // Ingredients filter
      const matchesIngredients = !filters.ingredients.length || 
        (recipe.ingredients && filters.ingredients.every(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        ));
      
      return matchesSearch && matchesPrepTime && matchesDifficulty && matchesIngredients;
    });
  },
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchField: (field) => set({ searchField: field }),
  setFilter: (filter, value) => set(state => ({
    filters: { ...state.filters, [filter]: value }
  })),
  addIngredientFilter: (ingredient) => set(state => ({
    filters: {
      ...state.filters,
      ingredients: [...new Set([...state.filters.ingredients, ingredient])]
    }
  })),
  removeIngredientFilter: (ingredient) => set(state => ({
    filters: {
      ...state.filters,
      ingredients: state.filters.ingredients.filter(i => i !== ingredient)
    }
  })),
  
  // Original recipe actions
  addRecipe: (newRecipe) => 
    set((state) => ({
      recipes: [...state.recipes, { 
        ...newRecipe, 
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
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
  getRecipe: (id) => get().recipes.find((recipe) => recipe.id === id),
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
