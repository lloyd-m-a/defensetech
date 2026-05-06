import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsArticle from "@/components/NewsArticle";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | DefenseTech`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <NewsArticle article={article} />
      <Footer />
    </>
  );
}
