import { useState } from 'react'

const priorityStyles = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
}

function formatDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const cmp = new Date(d)
  cmp.setHours(0, 0, 0, 0)

  if (cmp.getTime() === today.getTime()) return 'Today'
  if (cmp.getTime() === tomorrow.getTime()) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function TaskItem({ task, categories, overdue, onToggleComplete, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate || '',
    priority: task.priority,
    category: task.category
  })

  function saveEdit() {
    if (!draft.title.trim()) return
    onUpdate(task.id, {
      title: draft.title.trim(),
      description: draft.description.trim(),
      dueDate: draft.dueDate || null,
      priority: draft.priority,
      category: draft.category
    })
    setEditing(false)
  }

  function cancelEdit() {
    setDraft({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate || '',
      priority: task.priority,
      category: task.category
    })
    setEditing(false)
  }

  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id)
    }
  }

  if (editing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-indigo-500 space-y-3 fade-in">
        <input
          type="text"
          value={draft.title}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-sm font-medium"
        />
        <textarea
          value={draft.description}
          onChange={e => setDraft({ ...draft, description: e.target.value })}
          placeholder="Description"
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-sm resize-none"
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            type="date"
            value={draft.dueDate}
            onChange={e => setDraft({ ...draft, dueDate: e.target.value })}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-sm"
          />
          <select
            value={draft.priority}
            onChange={e => setDraft({ ...draft, priority: e.target.value })}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-sm capitalize"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={draft.category}
            onChange={e => setDraft({ ...draft, category: e.target.value })}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-sm"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveEdit}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl p-4 border transition fade-in ${
        overdue
          ? 'border-red-300 dark:border-red-700/60'
          : 'border-slate-200 dark:border-slate-700'
      } ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
          }`}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${task.completed ? 'line-through text-slate-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-slate-500 hover:text-indigo-600 px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-slate-500 hover:text-red-500 px-2 py-1"
              >
                Delete
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 whitespace-pre-wrap">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {task.category}
            </span>
            {task.dueDate && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                overdue
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {overdue ? 'Overdue · ' : ''}Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
