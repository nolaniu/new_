import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Study Studio</title>
        <meta name="description" content="Study Studio Privacy Policy: details on data collection, usage, cookies, ads, and third-party services." />
      </Head>
      <main className="mx-auto max-w-3xl py-10 px-4 prose">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h2>What Data We Collect</h2>
        <ul>
          <li><strong>Essential Data</strong>: Data required for basic functionality (such as anonymous statistics of page visits).</li>
          <li><strong>Optional Data</strong>: Information you voluntarily provide in forms (such as email, feedback).</li>
        </ul>

        <h2>How We Use Data</h2>
        <ul>
          <li>Improve product and content quality (e.g., measure popular pages/topics).</li>
          <li>Respond to your inquiries and support requests.</li>
        </ul>

        <h2>Cookies and Similar Technologies</h2>
        <p>This website uses cookies and local storage to improve your experience (for example, remembering your preferences). You can clear or disable cookies in your browser, but this may affect some functionality.</p>

        <h2>Ads and Third-Party Services (Google AdSense)</h2>
        <p>We use advertising services provided by Google and its partners (such as Google AdSense). These services may use cookies (including the <strong>DART</strong> cookie) to display ads based on your previous visits to this or other websites.</p>
        <ul>
          <li>Third-party vendors, including Google, use cookies to serve ads when you visit this site or other sites on the Internet.</li>
          <li>Google’s ad cookies enable it and its partners to serve personalized ads based on your browsing history.</li>
          <li>You can visit Google’s Ads Settings page to opt out of personalized ads, or opt out of some third-party personalized ads at <em>aboutads.info</em>.</li>
        </ul>
        <p>We do not associate personally identifiable information with ad cookies for targeted advertising purposes.</p>

        <h2>Data Retention and Security</h2>
        <p>We retain data only for as long as necessary to fulfill the purposes described above and take reasonable security measures to protect data from unauthorized access or disclosure.</p>

        <h2>Your Rights</h2>
        <p>You can contact us to access, correct, or delete your personal information (within the limits permitted by applicable law).</p>

        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:contact@example.com">contact@example.com</a></p>

        <h2>Policy Updates</h2>
        <p>We may update this policy from time to time. Significant changes will be notified prominently on the site.</p>

        <p><Link href="/" className="no-underline">← Back to Home</Link></p>
      </main>
    </>
  );
}
