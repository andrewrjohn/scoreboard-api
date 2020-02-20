export { };
const { fetchData } = require("../utils/fetchData");
const { ESPN_URLS } = require("../constants/urls");
const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

const router = express.Router();

const sports = [
  {
    name: "MLB",
    url: ESPN_URLS.MLB
  },
  {
    name: "NBA",
    url: ESPN_URLS.NBA
  },
  {
    name: "NCAAM",
    url: ESPN_URLS.NCAAM
  }
];

function startSchedule() {
  sports.map((sport) => {
    fetchData(sport.url, sport.name);
    setInterval(() => fetchData(sport.url, sport.name), 30000);
  });
}

startSchedule();

router.get("/:sport/events", async (req, res) => {
  const sport = req.params.sport.toUpperCase();
  if (!ESPN_URLS[sport]) {
    return res.sendStatus(404);
  }

  res.json({
    date: new Date(),
    scores: JSON.parse(await getAsync(sport))
  });
});

module.exports = router;
