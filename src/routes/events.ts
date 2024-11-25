import express from "express";

import { scrapeScores } from "../utils/scrapeScores";
import { SPORTS, SPORT_URL_MAP, getScoreboardURL } from "../constants/sports";

const router = express.Router();

type Scores = {
  [key: string]: {};
};

const scores: Scores = {};

const seconds = (n: number) => 1000 * n;

async function startSchedule() {
  for (const sport in SPORTS) {
    try {
      const url = getScoreboardURL(sport);

      if (url) {
        const updateSport = async () => {
          const data = await scrapeScores(url, sport);

          if (data) {
            scores[sport] = data;
          }
        };

        await updateSport();

        setInterval(async () => {
          await updateSport();
        }, seconds(30));
      }
    } catch (error) {
      console.log(`[ERROR] ${sport}`);
      console.error(error);
    }
  }
}

startSchedule();

router.get("/:sport/events", (req, res) => {
  const { sport } = req.params;

  if (!SPORT_URL_MAP[sport.toUpperCase()]) {
    return res.sendStatus(404);
  }

  res.json({
    date: new Date(),
    scores: scores[sport.toUpperCase()] || null,
  });
});

export default router;
