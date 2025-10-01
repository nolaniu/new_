const GROUPS = [
  {
    title: 'Dark Room Study',
    description:
      'An immersive focus environment with a dark theme, Pomodoro timer, and white noise so you can tune out distractions instantly.',
    action: { label: 'Open Dark Room', href: '/tools/dark-room' },
    highlights: [
      'Minimal dark interface with a one-click fullscreen toggle',
      'Built-in Pomodoro timer, to-do list, and quick notes',
      'Great for writing, coding, exam prep, and other deep work sessions',
    ],
  },
  {
    title: 'Meditation Space',
    description:
      'A guided 4-4-6 breathing exercise paired with ambient soundscapes to reset your energy and calm the nervous system.',
    action: { label: 'Start Meditation', href: '/tools/meditation' },
    highlights: [
      'Dynamic breathing guide with pause, mute, and rhythm controls',
      'Keeps track of every session so you can build a steady habit',
      'Perfect for morning activation, afternoon breaks, or winding down at night',
    ],
  },
  {
    title: 'Pomodoro Timer',
    description:
      'A dedicated Pomodoro timer with custom work and break lengths, round tracking, and gentle cues when stages change.',
    action: { label: 'Launch Timer', href: '/tools/pomodoro' },
    highlights: [
      'Configure focus, short break, and long break durations',
      'Automatic stage switching with visual progress feedback',
      'Designed for sustained productivity without burning out',
    ],
  },
  {
    title: 'White Noise Mixer',
    description:
      'Layer rain, ocean waves, campfire, and more to create your ideal sound environment for studying, relaxing, or falling asleep.',
    action: { label: 'Mix Sounds', href: '/tools/white-noise' },
    highlights: [
      'Play multiple tracks at once and fine-tune the volume of each',
      'Quick reset buttons for stopping or restoring default levels',
      'Works entirely in the browser with no account required',
    ],
  },
  {
    title: 'To-Do List',
    description:
      'A lightweight task manager with priorities, filters, and local storage so your plan stays in sync with every focus session.',
    action: { label: 'Organize Tasks', href: '/tools/todo' },
    highlights: [
      'Create tasks with high, medium, or relaxed priority labels',
      'Filter by active, completed, or all tasks to stay on track',
      'Everything is saved locally for offline-friendly use',
    ],
  },
];

export default function ToolsIndex() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">Focus Spaces</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">All-in-one spaces for deep work, recovery, and mindful breaks</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Each tool is designed to support a different moment of your learning routine - from locking in on demanding tasks to resetting your mind between sessions.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {GROUPS.map((group) => (
          <section
            key={group.title}
            className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-display font-semibold text-slate-900">{group.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600">{group.description}</p>
            </div>

            <ul className="space-y-2 text-sm text-slate-500">
              {group.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-brand-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={group.action.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
              >
                {group.action.label}
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

ToolsIndex.getBreadcrumbItems = () => [
  { label: 'Focus Spaces' },
];
