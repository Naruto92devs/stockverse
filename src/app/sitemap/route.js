export async function GET() {
  const baseUrl = "https://www.stockverse.com";

  // Define pages as objects with metadata
  const pages = [
    { slug: "", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "1.0" },
    { slug: "dashboard?view=gainers_losers", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "0.9" },
    { slug: "blog", lastmod: new Date().toISOString().split("T")[0], changefreq: "weekly", priority: "0.8" },
    { slug: "contact", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7" },
    { slug: "pricing", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8" },
    {slug: "dashboard", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=news", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=ipo_calendar", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=earnings_calendar", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=insider_transactions", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=historical", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=watchlist", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "dashboard?view=trades", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "stockverse-gpt", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "help-center", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "alerts", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "cvkd", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "pricing", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "feedback", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "disclaimer", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "terms", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "policy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "refund-policy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "register", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    {slug: "login", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}/${page.slug}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
