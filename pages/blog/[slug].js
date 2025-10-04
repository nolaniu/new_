import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { getPostSlugs, getPostBySlug } from '../../lib/mdx';

const formatDate = (date) => {
  if (!date) return '???';
  try {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch {
    return date;
  }
};

const Callout = ({ children }) => (
  <div className="my-6 rounded-2xl border border-brand-200 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-800">
    {children}
  </div>
);

export default function BlogPost({ frontMatter, mdxSource }) {
  return (
    <article className="prose prose-slate max-w-none">
      <Link href="/blog" className="text-sm font-semibold text-brand-600 no-underline hover:text-brand-700">
        ← Back to List
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold text-slate-900">{frontMatter.title}</h1>
      {/* <p className="text-sm text-slate-500">
        {frontMatter.date ? formatDate(frontMatter.date) : '未注明日期'} · {frontMatter.readingTime || '5 minutes read'}
      </p> */}
      <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
    </article>
  );
}

BlogPost.getBreadcrumbItems = (props) => [
  { label: 'Blog', href: '/blog' },
  { label: props?.frontMatter?.title || 'Article Details' },
];

const MDX_COMPONENTS = {
  a: (props) => (
    <a {...props} className="font-semibold text-brand-600 no-underline hover:text-brand-700" />
  ),
  h2: (props) => <h2 {...props} className="font-display text-3xl" />,
  h3: (props) => <h3 {...props} className="font-display text-2xl" />,
  code: (props) => <code {...props} className="rounded bg-slate-100 px-1.5 py-0.5 text-sm" />,
  pre: (props) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950/90 p-4 text-sm text-slate-100"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-brand-200 bg-brand-50/60 p-4 text-base italic text-slate-700"
    />
  ),
  Callout,
};

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { frontMatter, mdxSource } = await getPostBySlug(params.slug);
  return {
    props: {
      frontMatter,
      mdxSource,
    },
  };
}
