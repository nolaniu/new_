import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, 'data', 'blog');

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostFrontMatter(slug) {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { data } = matter(source);
  return { ...data, slug };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostFrontMatter(slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
    },
    scope: data,
  });

  return {
    frontMatter: {
      ...data,
      slug,
    },
    mdxSource,
  };
}