import { getPageData } from "./scrape";

export async function scrapeStats(url: string) {
  const stats = await getPageData(url, "stats");
  if (!stats) return null;

  return stats;
}
