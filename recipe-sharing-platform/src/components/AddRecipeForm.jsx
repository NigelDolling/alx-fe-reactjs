{{ ... }}
-  const onSubmit = (e) => {
+  const handleSubmit = (e) => {
     e.preventDefault()
     if (!validate()) return
 
     // Simulate submit (no backend). You could POST here.
     setSubmitted(true)
 
     // Optionally navigate back home after a short delay
     setTimeout(() => navigate('/'), 800)
   }
 
   return (
     <main className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
{{ ... }}
-      <form onSubmit={onSubmit} className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-100 dark:border-neutral-700 p-4 sm:p-6 space-y-5">
+      <form onSubmit={handleSubmit} className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-100 dark:border-neutral-700 p-4 sm:p-6 space-y-5">
