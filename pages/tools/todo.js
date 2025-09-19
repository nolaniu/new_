import TodoWidget from '../../components/tools/TodoWidget';

export default function TodoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">待办清单</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">轻量但好用的 ToDo 列表，支持优先级与状态管理</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          向 taniarascia/todo 学习的 React 清单实现。所有数据保存在浏览器本地存储，可离线使用，支持优先级标记和完成状态过滤。
        </p>
      </header>

      <TodoWidget tone="light" className="p-0 border-none shadow-none" />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-500 shadow-sm">
        <h2 className="text-lg font-display font-semibold text-slate-900">使用提示</h2>
        <ul className="mt-3 space-y-2 list-disc pl-5">
          <li>任务会自动保存到浏览器本地存储，可随时刷新页面继续。</li>
          <li>优先级支持“高优先 / 普通 / 宽松”，适合番茄钟或日计划搭配使用。</li>
          <li>切换过滤器对进行中、已完成任务进行聚焦，保持列表精炼。</li>
        </ul>
      </section>
    </div>
  );
}

TodoPage.getBreadcrumbItems = () => [
  { label: '效率工具', href: '/tools' },
  { label: '待办清单' },
];
