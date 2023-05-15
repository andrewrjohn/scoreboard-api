import express from "express";

import { fetchData } from "../utils/fetchData";
import { SPORTS, SPORT_URL_MAP, getSportURL } from "../constants/sports";
import { IScore } from "../interfaces/events";

const router = express.Router();

type Scores = {
  [key: string]: {};
};

const scores: Scores = {};

const seconds = (n: number) => 1000 * n;

async function startSchedule() {
  for (const sport in SPORTS) {
    const url = getSportURL(sport);

    if (url) {
      const updateSport = async () => {
        const data = await fetchData(url, sport);

        if (data) {
          scores[sport] = data;
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

router.get("/:sport/events", (req, res) => {
  startSchedule();
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
