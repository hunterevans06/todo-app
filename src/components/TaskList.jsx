import TaskItem from './TaskItem'

export default function TaskList({ tasks, categories, isOverdue, onToggleComplete, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return (
      <section className="bg-white dark:bg-slate-800 rounded-xl p-10 border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-5xl mb-3">✨</div>
        <h2 className="text-lg font-semibold mb-1">Nothing here yet</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add a new task above to get started, or adjust your filters.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          categories={categories}
          overdue={isOverdue(task)}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
