export async function GET() {
  const baseUrl = "https://www.stockverse.com";

  // Define pages as objects with metadata
  const pages = [
    { slug: "", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "1.0" },
    {slug: "register", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "feedback", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "stockverse-gpt", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "stockpicks", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "dashboard?view=gainers_losers", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "0.9" },
    {slug: "dashboard?view=news", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.9"},
    {slug: "dashboard?view=ipo_calendar", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.9"},
    {slug: "disclaimer", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "terms", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "policy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "refund-policy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "alerts", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "cvkd", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "pricing", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0" },
    {slug: "login", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "dashboard", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "reset_password", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "help-center", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "1.0"},
    {slug: "guide/delete-account", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "cvkd/news", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/cadrenal-therapeutics-jp-morgan-healthcare-conference-2024", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/december-pick-neov", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/neovolta-expion360-loi-battery-manufacturing-design", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/cadrenal-therapeutics-eacts-medical-congress-presentation", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/pr", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/neovolta-250m-loan-us-department-energy-approval", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/pr2025", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/cvkd-drug-of-the-year", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8" },
    {slug: "news/neov-barchat", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/top-10-stocks-to-buy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "news/cvkd-october-2024", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    {slug: "cbra", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "1"},
    {slug: "news/caring-brand-lists-on-otcqb", lastmod: new Date().toISOString().split("T")[0], changefreq: "daily", priority: "1"},

    // {slug: "dashboard?view=watchlist", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    // {slug: "dashboard?view=trades", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    // {slug: "stockversegpt-overview", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    // {slug: "pricing", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.7"},
    // {slug:  "doe", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.9"},
    // {slug:  "neovolta", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.9"},
    // {slug:  "neov", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "cadrenal", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "cadrenal-therapeutics-eacts-medical-congress-presentation", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "cadrenal-therapeutics-jp-morgan-healthcare-conference-2024", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "cvkd-drug-of-the-year", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "cvkd-october-2024", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "december-pick-neov", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "neov-barchat", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "neovolta-250m-loan-us-department-energy-approval", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "neovolta-expion360-loi-battery-manufacturing-design", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "neovolta-neov-300m-loan-phase-2-doe-program", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "pr", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "pr2025", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "top-10-stocks-to-buy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
    // {slug:  "top-10-stocks-to-buy", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: "0.8"},
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}/${page.slug}</loc>
      <lastmod>${page.lastmod}</lastmod>
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
