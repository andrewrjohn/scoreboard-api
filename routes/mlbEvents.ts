import { TScore } from "./interfaces/events";

const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const router = express.Router();

let scores: TScore[] = [];

const fetchData = async () => {
  console.log("Pulling data from https://www.espn.com/mlb/scoreboard");
  const website = await fetch("https://www.espn.com/mlb/scoreboard")
    .then(res => res.text())
    .then(body => body);

  const $ = cheerio.load(website);
  const scripts = await $("script").toArray();

  const scoreboardScript = scripts.find(
    script =>
      script.children[0] &&
      script.children[0].data.includes("window.espn.scoreboardData")
  ).children[0].data;

  const strippedData = scoreboardScript
    .replace("window.espn.scoreboardData", "")
    .replace("=", "")
    .replace(
      "if(!window.espn_ui.device.isMobile){window.espn.loadType = \"ready\"};",
      ""
    )
    .replace(/;/g, "")
    .split("window.espn.scoreboardSettings")[0]
    .trim();

  const data = JSON.parse(strippedData);

  const { events } = data;

  events.map(event => {
    const { competitions, date, shortName, status } = event;

    const home = competitions[0].competitors.find(
      team => team.homeAway === "home"
    );
    const away = competitions[0].competitors.find(
      team => team.homeAway === "away"
    );
    delete home.team.links;
    delete home.team.uid;
    delete home.team.id;
    delete away.team.links;
    delete away.team.uid;
    delete away.team.id;

    scores = [
      ...scores,
      {
        startTime: date,
        shortName,
        status: {
          inning: status.period,
          state: status.type.state,
          detail: status.type.detail,
          shortDetail: status.type.shortDetail,
          completed: status.type.completed
        },
        teams: {
          awayTeam: {
            ...away.team,
            score: away.score
          },
          homeTeam: {
            ...home.team,
            score: home.score
          }
        }
      }
    ];
  });

  console.log("UPDATED!");
};

function startSchedule() {
  fetchData();
  setInterval(fetchData, 30000);
}

startSchedule();

router.get("/baseball/mlb/events", (req, res) => {
  res.json({
    date: new Date(),
    scores
  });
});

module.exports = router;
