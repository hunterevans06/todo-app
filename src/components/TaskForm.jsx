import { useState } from 'react'

const PRIORITIES = ['low', 'medium', 'high']

export default function TaskForm({ categories, onAdd, onAddCategory, onRemoveCategory }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState(categories[0] || 'Personal')
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Give your task a title')
      return
    }
    onAdd({ title, description, dueDate, priority, category })
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
    setError('')
    setExpanded(false)
  }

  function handleAddCategory(e) {
    e.preventDefault()
    if (!newCategory.trim()) return
    onAddCategory(newCategory)
    setCategory(newCategory.trim())
    setNewCategory('')
  }

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value)
              if (error) setError('')
            }}
            onFocus={() => setExpanded(true)}
            placeholder="What needs to get done?"
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Add
          </button>
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        {expanded && (
          <div className="fade-in space-y-3 pt-2">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 resize-none text-sm"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm capitalize"
                >
                  {PRIORITIES.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowCategoryManager(!showCategoryManager)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {showCategoryManager ? 'Hide' : 'Manage'} categories
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Collapse
              </button>
            </div>

            {showCategoryManager && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs"
                    >
                      {c}
                      <button
                        type="button"
                        onClick={() => onRemoveCategory(c)}
                        className="text-slate-500 hover:text-red-500 font-bold"
                        aria-label={`Remove ${c}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium"
                  >
                    Add category
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </section>
  )
}
