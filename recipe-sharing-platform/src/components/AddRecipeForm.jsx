import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddRecipeForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required.'
    if (!ingredients.trim()) e.ingredients = 'Ingredients are required.'
    if (!steps.trim()) e.steps = 'Preparation steps are required.'

    // Check at least two ingredients (split by newlines or commas)
    const list = ingredients
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean)
    if (list.length < 2) e.ingredients = 'Please provide at least two ingredients.'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Simulate submit (no backend). You could POST here.
    setSubmitted(true)

    // Optionally navigate back home after a short delay
    setTimeout(() => navigate('/'), 800)
  }

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">← Back to recipes</Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add a New Recipe</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-300">Share your favorite recipe with the community.</p>

      <form onSubmit={onSubmit} className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-100 dark:border-neutral-700 p-4 sm:p-6 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-neutral-700'}`}
            placeholder="e.g., Classic Pancakes"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ingredients</label>
          <textarea
            id="ingredients"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.ingredients ? 'border-red-500' : 'border-gray-300 dark:border-neutral-700'}`}
            placeholder={"One ingredient per line or separated by commas\nFlour\nMilk\nEggs"}
          />
          {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
        </div>

        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preparation Steps</label>
          <textarea
            id="steps"
            rows={6}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.steps ? 'border-red-500' : 'border-gray-300 dark:border-neutral-700'}`}
            placeholder={"Describe the process step by step"}
          />
          {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            Submit Recipe
          </button>
          {submitted && (
            <span className="text-sm text-green-600">Submitted!</span>
          )}
        </div>
      </form>
    </main>
  )
}

export default AddRecipeForm
