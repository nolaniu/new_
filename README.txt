🚀 一站式组合清单
1. 基础框架（博客 + 站点结构）

timlrx/tailwind-nextjs-starter-blog

📌 Next.js + Tailwind + MDX，最流行的个人博客模版。

你直接 fork 它做「学习博客」部分。

博客页 (/blog) 写学习/记忆文章。

工具页 (/tools) 挂各个功能。

2. 功能页组合
🔸 番茄钟（Pomodoro）

astroud/pomodoro-react-app

React 番茄钟，UI 简单，逻辑清晰。

你可以把它封装成 /tools/pomodoro 页。

🔸 待办事项清单

taniarascia/todo

极简 ToDo 应用 (React + LocalStorage)。

可以直接拿 UI + 状态管理，挂到 /tools/todo。

🔸 白噪音播放器

petele/SoundDrown

简单的白噪音 Web App。

支持离线（PWA），直接作为 /tools/white-noise。

🔸 小黑屋自习室

没有完全现成的，但可以基于「全屏专注模式 + 屏蔽输入」来实现。

参考 ryanmcdermott/clean-screen
（简洁专注页面）。

改造：进入页面时只显示一行励志语录 + 背景音乐，屏蔽外部干扰。

🔸 冥想室

trynoice/web-app-v0

环境音 + 冥想模式，支持多种声音混合。

可以裁剪部分功能做 /tools/meditation。

3. 整合结构示例（Next.js）
/pages
  /index.js         -> 首页
  /blog/*           -> 博客文章 (MDX)
  /tools
    /pomodoro.js    -> 番茄钟组件
    /todo.js        -> 待办清单
    /white-noise.js -> 白噪音播放器
    /dark-room.js   -> 小黑屋模式
    /meditation.js  -> 冥想室


博客文章写在 /data/blog/*.mdx

功能页直接是 React 组件，放在 /pages/tools/

4. 推荐开发顺序

先跑博客模版 → 确保博客页能正常发布文章。

先移植番茄钟 + ToDo → 这两个最简单，功能互补。

加白噪音播放器 → 音频 + 控件，用户体验会很明显。

最后做小黑屋 + 冥想室 → 这两个需要自定义 UI/交互，可以先做极简版（全屏 + 背景音乐/静音）。