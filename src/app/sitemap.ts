import type { MetadataRoute } from "next";
import { academicLevels } from "@/data/academics";
import { newsArticles } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dharmaloka.sch.id";

  // Base pages
  const staticRoutes = [
    "",
    "/about",
    "/academics",
    "/teachers",
    "/facilities",
    "/achievements",
    "/news",
    "/gallery",
    "/admissions",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Academic level dynamic routes
  const academicRoutes = academicLevels.map((lvl) => ({
    url: `${baseUrl}/academics/${lvl.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // News articles dynamic routes
  const newsRoutes = newsArticles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...academicRoutes, ...newsRoutes];
}
