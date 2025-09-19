import { useEffect, useMemo, useState } from 'react';

const PRIORITIES = [
  { value: 'high', label: '高优先' },
  { value: 'medium', label: '普通' },
  { value: 'low', label: '宽松' },
];

const getId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

const THEMES = {
  light: {
    panel: 'rounded-3xl border border-slate-200 bg-white p-8 shadow-sm',
    textPrimary: 'text-slate-800',
    textMuted: 'text-slate-500',
    input:
      'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200/70',
    select:
      'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200/70',
    primaryButton:
      'inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300/80',
    filterGroup: 'flex gap-2 rounded-full bg-slate-100 p-1',
    filterActive: 'bg-white text-brand-700 shadow',
    filterInactive: 'text-slate-500 hover:text-slate-700',
    listEmpty: 'rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400',
    listItem:
      'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm transition hover:border-brand-200 sm:flex-row sm:items-center',
    checkboxBase:
      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60',
    checkboxActive: 'border-brand-500 bg-brand-500 text-white',
    checkboxInactive: 'border-slate-300 text-slate-400 hover:border-brand-300',
    taskTitle: 'text-base font-medium',
    taskTitleDone: 'text-slate-400 line-through',
    taskTitleTodo: 'text-slate-800',
    priorityBadge:
      'rounded-full px-2 py-0.5 text-xs font-semibold',
    deleteButton:
      'text-xs font-semibold text-slate-400 transition hover:text-rose-500 focus-visible:ring-2 focus-visible:ring-rose-200/70',
  },
  dark: {
    panel: 'rounded-3xl border border-slate-800/60 bg-slate-900/70 p-8 shadow-xl backdrop-blur',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    input:
      'mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300/40',
    select:
      'mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300/40',
    primaryButton:
      'inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:bg-brand-400 focus-visible:ring-2 focus-visible:ring-brand-200/60',
    filterGroup: 'flex gap-2 rounded-full bg-slate-800/70 p-1',
    filterActive: 'bg-slate-900 text-brand-200 shadow',
    filterInactive: 'text-slate-400 hover:text-slate-200',
    listEmpty: 'rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500',
    listItem:
      'flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm transition hover:border-brand-400/60 sm:flex-row sm:items-center',
    checkboxBase:
      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/40',
    checkboxActive: 'border-brand-300 bg-brand-300 text-slate-900',
    checkboxInactive: 'border-slate-600 text-slate-500 hover:border-brand-400/60',
    taskTitle: 'text-base font-medium',
    taskTitleDone: 'text-slate-500 line-through',
    taskTitleTodo: 'text-slate-100',
    priorityBadge:
      'rounded-full px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-200',
    deleteButton:
      'text-xs font-semibold text-slate-500 transition hover:text-rose-300 focus-visible:ring-2 focus-visible:ring-rose-300/50',
  },
};

const PRIORITY_COLORS = {
  light: {
    high: 'bg-rose-100 text-rose-600',
    medium: 'bg-amber-100 text-amber-600',
    low: 'bg-emerald-100 text-emerald-600',
  },
  dark: {
    high: 'bg-rose-500/20 text-rose-200',
    medium: 'bg-amber-500/20 text-amber-200',
    low: 'bg-emerald-500/20 text-emerald-200',
  },
};

export default function TodoWidget({
  storageKey = 'study-todo-list',
  tone = 'light',
  className = '',
  showHeader = false,
  headerTitle = '待办清单',
  headerDescription = '轻量但好用的 ToDo 列表，支持优先级与状态管理',
}) {
  const theme = THEMES[tone] ?? THEMES.light;
  const priorityColors = PRIORITY_COLORS[tone] ?? PRIORITY_COLORS.light;
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTasks(parsed);
      } catch (error) {
        console.error('Failed to parse tasks from storage', error);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((prev) => [
      {
        id: getId(),
        title: title.trim(),
        priority,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setTitle('');
    setPriority('medium');
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }

  return (
    <section className={`${theme.panel} ${className}`}>
      {showHeader ? (
        <header className="space-y-2">
          <p className={`text-sm font-semibold ${theme.textMuted}`}>{headerTitle}</p>
          <h2 className={`text-2xl font-display font-semibold ${theme.textPrimary}`}>{headerDescription}</h2>
        </header>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="task-input" className={`text-sm font-medium ${theme.textMuted}`}>
            新建任务
          </label>
          <input
            id="task-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="例如：25 分钟阅读《深度工作》第一章"
            className={theme.input}
          />
        </div>
        <div>
          <label htmlFor="priority" className={`text-sm font-medium ${theme.textMuted}`}>
            优先级
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className={theme.select}
          >
            {PRIORITIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={theme.primaryButton}>
          添加任务
        </button>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <div className={theme.filterGroup}>
          {[
            { value: 'all', label: '全部' },
            { value: 'active', label: '进行中' },
            { value: 'completed', label: '已完成' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-full px-3 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/50 ${
                filter === item.value ? theme.filterActive : theme.filterInactive
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={clearCompleted} className={`${theme.textMuted} hover:text-brand-400`}>
          清除已完成
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {filteredTasks.length === 0 ? <li className={theme.listEmpty}>目前还没有任务，先写下一个小目标吧。</li> : null}
        {filteredTasks.map((task) => (
          <li key={task.id} className={theme.listItem}>
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className={`${theme.checkboxBase} ${
                task.completed ? theme.checkboxActive : theme.checkboxInactive
              }`}
            >
              {task.completed ? '✓' : ''}
            </button>
            <div className="flex-1">
              <p
                className={`${theme.taskTitle} ${
                  task.completed ? theme.taskTitleDone : theme.taskTitleTodo
                }`}
              >
                {task.title}
              </p>
              <div className={`mt-1 flex flex-wrap items-center gap-2 text-xs ${theme.textMuted}`}>
                <span className={`${theme.priorityBadge} ${priorityColors[task.priority] || priorityColors.medium}`}>
                  {PRIORITIES.find((item) => item.value === task.priority)?.label || '普通'}
                </span>
                <span>
                  创建于 {new Date(task.createdAt).toLocaleString('zh-CN', { hour12: false })}
                </span>
              </div>
            </div>
            <button type="button" onClick={() => deleteTask(task.id)} className={theme.deleteButton}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
