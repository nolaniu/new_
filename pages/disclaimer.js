import Head from "next/head";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer | Study Studio</title>
        <meta name="description" content="Study Studio Disclaimer: Content is for reference only and does not constitute professional advice or guarantees." />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>Disclaimer</h1>
        <p>The content on this website (including but not limited to articles, tools, examples, and links) is for learning and reference purposes only. It does not constitute any form of professional advice (such as legal, medical, investment, or other licensed professional advice).</p>

        <h2>Accuracy and Availability</h2>
        <ul>
          <li>We strive to ensure that content is accurate and up-to-date, but we do not guarantee its completeness or suitability.</li>
          <li>Tools and services may be temporarily unavailable due to maintenance or third-party factors. We are not responsible for any direct or indirect losses caused by this.</li>
        </ul>

        <h2>External Links</h2>
        <p>This website may contain links to third-party sites. We are not responsible for the content, privacy policies, or practices of third-party websites. Please exercise your own judgment and assume any risks when visiting external sites.</p>

        <h2>Use at Your Own Risk</h2>
        <p>You should independently evaluate and assume the risks of using the content and tools on this site. If you need professional advice, please consult a qualified professional.</p>

        <p><Link href="/" className="no-underline">← Back to Home</Link></p>
      </main>
    </>
  );
}
