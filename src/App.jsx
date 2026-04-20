import { useState, useMemo, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import Stats from './components/Stats'

const DEFAULT_CATEGORIES = ['Personal', 'Work', 'School']

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(task.dueDate)
  return due < today
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow.tasks', [])
  const [categories, setCategories] = useLocalStorage('taskflow.categories', DEFAULT_CATEGORIES)
  const [theme, setTheme] = useLocalStorage('taskflow.theme', 'light')

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('created')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  function addTask(newTask) {
    const task = {
      id: makeId(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      dueDate: newTask.dueDate || null,
      priority: newTask.priority || 'medium',
      category: newTask.category || 'Personal',
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([task, ...tasks])
  }

  function updateTask(id, updates) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function toggleComplete(id) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function clearCompleted() {
    const remaining = tasks.filter(t => !t.completed)
    if (remaining.length === tasks.length) return
    if (!window.confirm('Delete all completed tasks? This cannot be undone.')) return
    setTasks(remaining)
  }

  function addCategory(name) {
    const clean = name.trim()
    if (!clean) return
    if (categories.includes(clean)) return
    setCategories([...categories, clean])
  }

  function removeCategory(name) {
    if (!window.confirm(`Remove category "${name}"? Tasks in this category will be moved to Personal.`)) return
    setCategories(categories.filter(c => c !== name))
    setTasks(tasks.map(t => (t.category === name ? { ...t, category: 'Personal' } : t)))
    if (filterCategory === name) setFilterCategory('all')
  }

  function exportTasks() {
    const data = JSON.stringify({ tasks, categories, exportedAt: new Date().toISOString() }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `taskflow-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const visibleTasks = useMemo(() => {
    let result = [...tasks]

    if (filterStatus === 'active') {
      result = result.filter(t => !t.completed)
    } else if (filterStatus === 'completed') {
      result = result.filter(t => t.completed)
    } else if (filterStatus === 'overdue') {
      result = result.filter(t => isOverdue(t))
    }

    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }

    const priorityRank = { high: 0, medium: 1, low: 2 }
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityRank[a.priority] - priorityRank[b.priority]
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return result
  }, [tasks, filterStatus, filterCategory, sortBy, search])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const pending = total - completed
    const overdue = tasks.filter(t => isOverdue(t)).length
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, pending, overdue, completionRate }
  }, [tasks])

  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggleTheme} onExport={exportTasks} />
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Stats stats={stats} />
        <TaskForm
          categories={categories}
          onAdd={addTask}
          onAddCategory={addCategory}
          onRemoveCategory={removeCategory}
        />
        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          search={search}
          setSearch={setSearch}
          categories={categories}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />
        <TaskList
          tasks={visibleTasks}
          categories={categories}
          isOverdue={isOverdue}
          onToggleComplete={toggleComplete}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </main>
      <footer className="text-center text-xs text-slate-400 dark:text-slate-500 py-6">
        Built with React + Tailwind
      </footer>
    </div>
  )
}
