import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateStaticParams() {
  return [{ slug: 'example-slug' }];
}

export default function BlogPage() {
  return <BlogDetailClient />;
}