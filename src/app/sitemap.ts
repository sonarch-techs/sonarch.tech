import { MetadataRoute } from "next";
import { FEATURED_PROJECTS } from "@/data/case-studies";
import { SERVICES_DATA } from "@/data/services";
import { INSIGHTS_DATA } from "@/data/insights";

const BASE_URL = "https://sonarch.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic Case Studies (/work/[slug])
  const workRoutes: MetadataRoute.Sitemap = FEATURED_PROJECTS.map((project) => ({
    url: `${BASE_URL}/work/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 3. Dynamic Services (/services/[slug])
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 4. Dynamic Insights & Whitepapers (/insights/[slug])
  const insightRoutes: MetadataRoute.Sitemap = INSIGHTS_DATA.map((article) => ({
    url: `${BASE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.publishedDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes, ...serviceRoutes, ...insightRoutes];
}