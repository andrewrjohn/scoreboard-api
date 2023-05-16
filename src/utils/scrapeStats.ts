import { getPageData } from "./scrape";

export async function scrapeStats(url: string, sport: string) {
  const stats = await getPageData(url, "stats");
  if (!stats) return null;

  const [offense, defense] = stats;

  return { offense, defense };
}
