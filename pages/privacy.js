import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>隐私政策 | 学习工作室</title>
        <meta name="description" content="学习工作室隐私政策：数据收集、使用、Cookie、广告与第三方服务说明。" />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>隐私政策</h1>
        <p>最近更新：{new Date().toISOString().slice(0, 10)}</p>

        <h2>我们收集哪些数据</h2>
        <ul>
          <li><strong>必要数据</strong>：为提供基础功能所需的数据（如页面访问记录的匿名统计）。</li>
          <li><strong>可选数据</strong>：你在表单中自愿提交的信息（如邮箱、反馈内容）。</li>
        </ul>

        <h2>我们如何使用数据</h2>
        <ul>
          <li>改进产品与内容质量（如统计受欢迎的页面/话题）。</li>
          <li>回应你的咨询与支持请求。</li>
        </ul>

        <h2>Cookie 与类似技术</h2>
        <p>本网站使用 Cookie 和本地存储以改进体验（例如记住你的偏好设置）。你可以在浏览器中清除或禁用 Cookie，但这可能影响部分功能。</p>

        <h2>广告与第三方服务（Google AdSense）</h2>
        <p>我们使用 Google 及其合作伙伴提供的广告服务（如 Google AdSense）。这些服务可能使用 Cookie（包括 <strong>DART</strong> Cookie）根据用户此前对本网站或其他网站的访问情况来展示广告。</p>
        <ul>
          <li>第三方供应商（包括 Google）会使用 Cookie 在你访问本网站或互联网上其他网站时投放广告。</li>
          <li>Google 使用的广告 Cookie 使其及其合作伙伴能够基于你的访问记录向你展示个性化广告。</li>
          <li>你可以访问 Google 的广告设置页面以选择退出个性化广告；或在 <em>aboutads.info</em> 选择退出部分第三方供应商的个性化广告。</li>
        </ul>
        <p>我们不会将可识别个人身份的信息与广告 Cookie 关联用于个性化广告定位。</p>

        <h2>数据保留与安全</h2>
        <p>我们仅在达成上述目的所必需的期限内保留数据，并采取合理的安全措施以保护数据免遭未经授权的访问或披露。</p>

        <h2>你的权利</h2>
        <p>你可以联系我们以访问/更正/删除你提交的个人信息（在适用法律允许的范围内）。</p>

        <h2>联系我们</h2>
        <p>邮箱：<a href="mailto:contact@example.com">contact@example.com</a></p>

        <h2>政策更新</h2>
        <p>我们可能不时更新本政策。重大变更将通过站内显著位置提示。</p>

        <p><Link href="/" className="no-underline">← 返回首页</Link></p>
      </main>
    </>
  );
}
