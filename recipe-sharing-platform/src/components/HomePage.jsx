import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // Dynamically import JSON so it works in dev/build without fetch
    import('../data.json').then((module) => setRecipes(module.default))
  }, [])

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Latest Recipes</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">Discover delicious recipes and cooking inspiration.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="group">
            <article
              className="bg-white dark:bg-neutral-800 rounded-xl shadow hover:shadow-xl transition-transform duration-200 ease-out group-hover:-translate-y-0.5 overflow-hidden border border-gray-100 dark:border-neutral-700"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-neutral-700">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{recipe.summary}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default HomePage
