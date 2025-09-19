import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'study-todo-list';
const PRIORITIES = [
  { value: 'high', label: '高优先' },
  { value: 'medium', label: '普通' },
  { value: 'low', label: '宽松' },
];

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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
        id: crypto.randomUUID(),
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
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">待办清单</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">轻量但好用的 ToDo 列表，支持优先级与状态管理</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          向 taniarascia/todo 学习的 React 清单实现。所有数据保存在浏览器本地存储，可离线使用，支持优先级标记和完成状态过滤。
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label htmlFor="task-input" className="text-sm font-medium text-slate-700">
              新建任务
            </label>
            <input
              id="task-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="例如：25 分钟阅读《深度工作》第一章"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="priority" className="text-sm font-medium text-slate-700">
              优先级
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {PRIORITIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            添加任务
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <div className="flex gap-2 rounded-full bg-slate-100 p-1">
            {[
              { value: 'all', label: '全部' },
              { value: 'active', label: '进行中' },
              { value: 'completed', label: '已完成' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-3 py-1 transition ${
                  filter === item.value ? 'bg-white text-brand-700 shadow' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={clearCompleted} className="text-slate-400 hover:text-brand-600">
            清除已完成
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {filteredTasks.length === 0 && (
            <li className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              目前还没有任务，先写下一个小目标吧。
            </li>
          )}
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm transition hover:border-brand-200"
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  task.completed
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-300 text-slate-400 hover:border-brand-300'
                }`}
              >
                {task.completed ? '?' : ''}
              </button>
              <div className="flex-1">
                <p className={`text-base font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${priorityColor(task.priority)}`}>
                    {PRIORITIES.find((item) => item.value === task.priority)?.label || '普通'}
                  </span>
                  <span>
                    创建于 {new Date(task.createdAt).toLocaleString('zh-CN', { hour12: false })}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="text-xs font-semibold text-slate-400 hover:text-rose-500"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function priorityColor(priority) {
  if (priority === 'high') return 'bg-rose-100 text-rose-600';
  if (priority === 'low') return 'bg-emerald-100 text-emerald-600';
  return 'bg-amber-100 text-amber-600';
}