import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Tag,
} from "lucide-react";
import { newsArticles } from "@/data/news";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${article.title} - Warta Dharma Loka`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.featuredImage }],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Berita", href: "/news" },
    { label: article.title },
  ];

  const relatedArticles = newsArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Article Header */}
      <header className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white border-b border-blue-100 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="space-y-5">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-royal text-white text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-950 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pt-4 border-t border-blue-100">
              <span className="flex items-center gap-1.5 font-bold text-primary-950">
                <User className="w-4 h-4 text-royal" aria-hidden="true" />
                <span>{article.author}</span>
                <span className="text-slate-500 font-normal">({article.authorRole})</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-royal" aria-hidden="true" />
                <span>{article.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-royal" aria-hidden="true" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body & Media */}
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-blue-50 mb-12 border border-blue-100">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-7 rounded-2xl bg-blue-50/70 border-l-4 border-royal text-lg sm:text-xl font-serif italic text-primary-950 leading-relaxed mb-10">
          &ldquo;{article.excerpt}&rdquo;
        </div>

        {/* Prose Body */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-base sm:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-royal" aria-hidden="true" />
            <span>Topik Terkait:</span>
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs font-bold border border-blue-100"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Back and Navigation Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50/40 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary-950 hover:text-royal transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-royal" aria-hidden="true" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:underline"
          >
            <span>Informasi Pendaftaran Siswa Baru (PPDB) →</span>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-extrabold text-primary-950 mb-8">
              Berita Lainnya yang Mungkin Menarik Bagi Anda
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="p-7 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-2">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-primary-950 group-hover:text-royal transition-colors line-clamp-2 mb-2.5">
                      <Link href={`/news/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                    <span>{rel.date}</span>
                    <Link
                      href={`/news/${rel.slug}`}
                      className="font-bold text-royal inline-flex items-center gap-1"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
