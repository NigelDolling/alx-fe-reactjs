import React from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Recipe Sharing</span>
            <span className="block text-blue-600">App</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Share and discover amazing recipes from around the world!
          </p>
        </header>

        <main className="space-y-12">
          <AddRecipeForm />
          <RecipeList />
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p> {new Date().getFullYear()} Recipe Sharing App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
