import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>关于我们 | 学习工作室</title>
        <meta name="description" content="学习工作室：记录、练习、冥想、专注的一站式成长平台。" />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>关于我们</h1>
        <p><strong>学习工作室</strong> 是一个把学习笔记、计划清单与沉浸工具整合在一起的个人/团队项目。我们希望通过更好的内容与工具，帮助你在长期主义的道路上稳步前行。</p>

        <h2>我们的愿景</h2>
        <ul>
          <li>让知识沉淀更轻松：高质量的记录与复盘。</li>
          <li>让练习更高效：工具即工作台，尽量减少上下文切换。</li>
          <li>让身心更稳定：通过冥想/专注工具维持长期专注力。</li>
        </ul>

        <h2>联系我们</h2>
        <p>如有建议或合作意向，请邮件联系：<a href="mailto:contact@example.com">contact@example.com</a></p>

        <p>
          了解我们的<a href="/privacy">隐私政策</a>与<a href="/disclaimer">免责声明</a>。
        </p>
        <p><Link href="/" className="no-underline">← 返回首页</Link></p>
      </main>
    </>
  );
}
