const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
  { value: 'overdue', label: 'Overdue' }
]

export default function FilterBar({
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  search,
  setSearch,
  categories,
  onClearCompleted,
  completedCount
}) {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 text-sm"
        >
          <option value="created">Newest first</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 flex-wrap">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filterStatus === opt.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-slate-500 hover:text-red-500 transition"
          >
            Clear {completedCount} completed
          </button>
        )}
      </div>
    </section>
  )
}
