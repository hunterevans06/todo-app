# TaskFlow

A frontend task management app built for my Web Development final project. TaskFlow lets you create, organize, filter, sort, and track tasks with due dates, priorities, and custom categories. Data persists in `localStorage` so your list survives a refresh.

**Live URL:** _replace with your deployed URL (e.g. https://taskflow-yourname.vercel.app)_

**Repo:** _replace with your GitHub URL_

---

## Tech stack

- **React 18** (via Vite) — JS library
- **Tailwind CSS** — styling
- **localStorage** — persistence

## Why React?

I picked React for a few reasons. First, it's the framework I've seen referenced most often in modern web dev job postings and in our course materials, so it made sense to get more reps with it before graduating. Second, React's component model fits a task app really well — each piece of UI (the header, the add form, a single task, the filter bar, the stats) maps cleanly to its own component, which keeps the code organized and easy to reason about. Third, hooks like `useState`, `useEffect`, and `useMemo` let me handle state, side effects (like syncing to localStorage), and derived values (filtering/sorting/stats) without pulling in a heavier state management library, which felt like the right level for a project this size. Finally, React has a huge ecosystem and first-class support on free hosts like Vercel and Netlify, so deployment was basically one command.

I paired React with Tailwind CSS to handle styling. Tailwind lets me build a consistent, responsive design with dark mode without writing a separate stylesheet, and it keeps all the visual decisions close to the JSX.

---

## Features (JS-driven)

Every feature below required writing JavaScript — they aren't just CSS or HTML.

1. **Create a new task** with title, description, due date, priority, and category — `addTask` in `App.jsx`
2. **Toggle complete / incomplete** with an immediate UI update — `toggleComplete` in `App.jsx`
3. **Inline edit** an existing task (title, description, date, priority, category) — `TaskItem.jsx` edit mode
4. **Delete a task** with a confirmation prompt — `handleDelete` in `TaskItem.jsx`
5. **Filter by status** (all / active / completed / overdue) — `visibleTasks` in `App.jsx`
6. **Filter by category** via dropdown — `visibleTasks` in `App.jsx`
7. **Search** tasks by title or description (case-insensitive) — `visibleTasks` in `App.jsx`
8. **Sort** by newest, due date, priority, or title — `visibleTasks` in `App.jsx`
9. **Priority levels** (low / medium / high) with color-coded badges — `TaskForm.jsx` + `TaskItem.jsx`
10. **Due dates** with smart formatting (Today / Tomorrow / date) — `formatDate` in `TaskItem.jsx`
11. **Overdue detection** that auto-flags past-due incomplete tasks in red — `isOverdue` in `App.jsx`
12. **Custom categories** — add and remove categories; removing reassigns tasks to Personal — `addCategory` / `removeCategory` in `App.jsx`
13. **Live stats dashboard** (total / pending / completed / overdue / completion %) — `Stats.jsx` + `useMemo` in `App.jsx`
14. **Dark / light theme toggle** that persists across sessions — `toggleTheme` + `useEffect` in `App.jsx`
15. **Bulk clear completed** with confirmation — `clearCompleted` in `App.jsx`
16. **Export to JSON** — downloads a file of all tasks and categories — `exportTasks` in `App.jsx`
17. **localStorage persistence** via a custom `useLocalStorage` hook — `src/hooks/useLocalStorage.js`

---

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
├── App.jsx                 # top-level state + filter/sort logic
├── main.jsx                # React entry point
├── index.css               # Tailwind + small custom styles
├── hooks/
│   └── useLocalStorage.js  # reusable persistence hook
└── components/
    ├── Header.jsx          # logo, theme toggle, export button
    ├── Stats.jsx           # dashboard with progress bar
    ├── TaskForm.jsx        # add-task form + category manager
    ├── FilterBar.jsx       # search, status chips, sort, clear
    ├── TaskList.jsx        # empty state + list of items
    └── TaskItem.jsx        # single task with inline edit
```

---

## Deployment

I deployed this to Vercel. Steps:

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the GitHub repo.
3. Vercel auto-detects Vite. Build command: `npm run build`. Output: `dist`.
4. Click Deploy.

Netlify works the same way — point it at the repo and it builds on push.

---

## Notes

- I focused on clean, organized code with components that each do one thing well.
- State lives in `App.jsx` and flows down through props. For a project this size that's simpler than Redux or Context.
- The `useLocalStorage` hook was the part I'm happiest with — it's reused for tasks, categories, and theme, and keeps each piece of state in sync with the browser automatically.
