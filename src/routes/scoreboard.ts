export { };
const { fetchData } = require("../utils/fetchData");
const { SPORTS, SPORT_URL_MAP, getSportURL } = require("../constants/urls");
const express = require("express");
// const redis = require("redis");
// const { promisify } = require("util");

// const client = redis.createClient();

// const getAsync = promisify(client.get).bind(client);

const router = express.Router();

const scores = {};

const seconds = (n) => 1000 * n;

function startSchedule() {
  SPORTS.map((sport) => {
    const url = getSportURL(sport);
    scores[sport] = fetchData(url, sport);
    setInterval(async () => {
      scores[sport] = await fetchData(url, sport);
    }, seconds(30));
  });
}

startSchedule();

router.get("/:sport/events", (req, res) => {
  startSchedule();
  const { sport } = req.params;

  if (!SPORT_URL_MAP[sport]) {
    return res.sendStatus(404);
  }

  res.json({
    date: new Date(),
    scores: scores[sport] || ""
  });
});

module.exports = router;
