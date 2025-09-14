import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  recommendations: [], // Added recommendations array to store recommended recipes
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

  // Get recommended recipes based on favorites
  get recommendedRecipes() {
    const { recipes, favorites } = get();
    if (favorites.length === 0) {
      // If no favorites, return some random recipes
      return [...recipes].sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    // Get all tags from favorite recipes
    const favoriteTags = new Set();
    recipes.forEach(recipe => {
      if (favorites.includes(recipe.id) && recipe.ingredients) {
        recipe.ingredients.forEach(ing => favoriteTags.add(ing.toLowerCase()));
      }
    });

    // Find recipes with matching tags that aren't already favorites
    return recipes
      .filter(recipe => !favorites.includes(recipe.id))
      .map(recipe => {
        let score = 0;
        if (recipe.ingredients) {
          score = recipe.ingredients.reduce((acc, ing) => 
            favoriteTags.has(ing.toLowerCase()) ? acc + 1 : acc, 0);
        }
        return { ...recipe, _score: score };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 3)
      .map(({ _score, ...recipe }) => recipe); // Remove the temporary _score property
  },
  
  // Actions to update recommendations
  updateRecommendations: () => set((state) => {
    const { recipes, favorites } = state;
    
    if (favorites.length === 0) {
      return {
        recommendations: [...recipes]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      };
    }

    const favoriteTags = new Set();
    recipes.forEach(recipe => {
      if (favorites.includes(recipe.id) && recipe.ingredients) {
        recipe.ingredients.forEach(ing => favoriteTags.add(ing.toLowerCase()));
      }
    });

    const recommendations = recipes
      .filter(recipe => !favorites.includes(recipe.id))
      .map(recipe => {
        let score = 0;
        if (recipe.ingredients) {
          score = recipe.ingredients.reduce((acc, ing) => 
            favoriteTags.has(ing.toLowerCase()) ? acc + 1 : acc, 0);
        }
        return { ...recipe, _score: score };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 3)
      .map(({ _score, ...recipe }) => recipe);

    return { recommendations };
  }),
  
  // Update other actions to also update recommendations when needed
  toggleFavorite: (recipeId) => set((state) => {
    const isFavorite = state.favorites.includes(recipeId);
    const newFavorites = isFavorite
      ? state.favorites.filter(id => id !== recipeId)
      : [...state.favorites, recipeId];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Update recommendations after changing favorites
    const { recipes } = state;
    if (newFavorites.length === 0) {
      return {
        favorites: newFavorites,
        recommendations: [...recipes]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      };
    }

    const favoriteTags = new Set();
    recipes.forEach(recipe => {
      if (newFavorites.includes(recipe.id) && recipe.ingredients) {
        recipe.ingredients.forEach(ing => favoriteTags.add(ing.toLowerCase()));
      }
    });

    const recommendations = recipes
      .filter(recipe => !newFavorites.includes(recipe.id))
      .map(recipe => {
        let score = 0;
        if (recipe.ingredients) {
          score = recipe.ingredients.reduce((acc, ing) => 
            favoriteTags.has(ing.toLowerCase()) ? acc + 1 : acc, 0);
        }
        return { ...recipe, _score: score };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 3)
      .map(({ _score, ...recipe }) => recipe);

    return { favorites: newFavorites, recommendations };
  }),
  
  // Favorites actions
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return recipes.filter(recipe => favorites.includes(recipe.id));
  },
  
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
      // Remove from favorites if it was favorited
      favorites: state.favorites.filter(favId => favId !== id)
    })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe, updatedAt: new Date().toISOString() } : recipe
      ),
    })),
  getRecipe: (id) => get().recipes.find((recipe) => recipe.id === id),
  setRecipes: (recipes) => set({ recipes }),
  
  // Other actions
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
}));

export default useRecipeStore;
