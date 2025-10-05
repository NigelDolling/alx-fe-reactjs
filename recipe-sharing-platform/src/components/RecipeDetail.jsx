import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    import('../data.json').then((module) => {
      if (!mounted) return
      const all = module.default || []
      const found = all.find((r) => String(r.id) === String(id))
      setRecipe(found || null)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
        <p className="text-gray-600 dark:text-gray-300">Loading…</p>
      </main>
    )
  }

  if (!recipe) {
    return (
      <main className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
        <p className="text-red-600 dark:text-red-400 font-medium">Recipe not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">← Back to recipes</Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link to="/" className="text-blue-600 hover:underline">← Back to recipes</Link>

      <article className="mt-4 bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-100 dark:border-neutral-700 overflow-hidden">
        <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-neutral-700">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{recipe.title}</h1>
          {recipe.summary && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{recipe.summary}</p>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {(recipe.ingredients || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Steps</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                {(recipe.steps || []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}

export default RecipeDetail
