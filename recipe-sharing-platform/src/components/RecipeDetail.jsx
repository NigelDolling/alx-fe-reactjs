            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                {(recipe.steps || []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
