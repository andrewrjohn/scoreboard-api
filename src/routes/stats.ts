import express from "express";

import { scrapeStats } from "../utils/scrapeStats";
import { SPORTS, SPORT_URL_MAP, getStatsURL } from "../constants/sports";

const router = express.Router();

type Scores = {
  [key: string]: {};
};

const stats: Scores = {};

const seconds = (n: number) => 1000 * n;

async function startSchedule() {
  for (const sport in SPORTS) {
    const url = getStatsURL(sport);

    if (url) {
      const updateSport = async () => {
        const data = await scrapeStats(url, sport);

        if (data) {
          stats[sport] = data;
        }
      };

      await updateSport();

      setInterval(async () => {
        await updateSport();
      }, seconds(30));
    }
  }
}

startSchedule();

router.get("/:sport/stats", (req, res) => {
  const { sport } = req.params;

  if (!SPORT_URL_MAP[sport.toUpperCase()]) {
    return res.sendStatus(404);
  }

  res.json({
    date: new Date(),
    stats: stats[sport.toUpperCase()] || null,
  });
});

export default router;
