export default function Stats({ stats }) {
  const cards = [
    { label: 'Total', value: stats.total, color: 'text-slate-700 dark:text-slate-200' },
    { label: 'Pending', value: stats.pending, color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Completed', value: stats.completed, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Overdue', value: stats.overdue, color: 'text-red-600 dark:text-red-400' }
  ]

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map(card => (
        <div
          key={card.label}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
        >
          <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {card.label}
          </div>
        </div>
      ))}

      <div className="col-span-2 sm:col-span-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">{stats.completionRate}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </section>
  )
}
