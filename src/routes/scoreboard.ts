export { };
const { fetchData } = require("../utils/fetchData");
const { SPORTS, SPORT_URL_MAP, getSportURL } = require("../constants/urls");
const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

const router = express.Router();

function startSchedule() {
  SPORTS.map((sport) => {
    const url = getSportURL(sport);
    fetchData(url, sport);
    setInterval(() => fetchData(url, sport), 30000);
  });
}

startSchedule();

router.get("/:sport/events", async (req, res) => {
  const { sport } = req.params;
  if (!SPORT_URL_MAP[sport]) {
    return res.sendStatus(404);
  }

  res.json({
    date: new Date(),
    scores: JSON.parse(await getAsync(sport))
  });
});

module.exports = router;
