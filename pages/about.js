import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Do StudyHub</title>
        <meta name="description" content="Study Studio: an all-in-one platform for journaling, practice, meditation, and focus." />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>About Us</h1>
        <p><strong>Study Studio</strong> is a personal/team project that integrates study notes, task lists, and immersion tools. We hope to help you progress steadily on the path of long-term growth with better content and tools.</p>

        <h2>Our Vision</h2>
        <ul>
          <li>Make knowledge retention easier: high-quality journaling and review.</li>
          <li>Make practice more efficient: tools as a workspace, minimizing context switching.</li>
          <li>Make the mind and body more stable: maintain long-term focus through meditation/focus tools.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have suggestions or collaboration ideas, please email us: cheuehcgaiiec@gmail.com</p>

        <p>
          Learn more about our <a href="/privacy">Privacy Policy</a> and <a href="/disclaimer">Disclaimer</a>.
        </p>
        <p><Link href="/" className="no-underline">← Back to Home</Link></p>
      </main>
    </>
  );
}
