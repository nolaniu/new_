import Head from "next/head";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>免责声明 | 学习工作室</title>
        <meta name="description" content="学习工作室免责声明：内容仅作参考，不构成专业建议或保证。" />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>免责声明</h1>
        <p>本网站所载内容（包括但不限于文章、工具、示例与链接）仅用于学习与参考，不构成任何形式的专业建议（例如法律、医疗、投资或其他需要执业资格的建议）。</p>

        <h2>内容准确性与可用性</h2>
        <ul>
          <li>我们努力确保内容准确、及时，但不对其完整性或适用性作出保证。</li>
          <li>工具与服务可能因维护或第三方因素暂时不可用，我们不对由此造成的直接或间接损失负责。</li>
        </ul>

        <h2>外部链接</h2>
        <p>本网站可能包含指向第三方网站的链接。我们不对第三方网站的内容、隐私政策或实践负责。访问外部网站请自行判断并承担风险。</p>

        <h2>风险自负</h2>
        <p>你应结合自身情况独立评估并承担使用本网站内容与工具的风险。如需专业意见，请咨询具备相应资质的专业人士。</p>

        <p><Link href="/" className="no-underline">← 返回首页</Link></p>
      </main>
    </>
  );
}
