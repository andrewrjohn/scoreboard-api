import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

import { IScore, ITeam } from "../interfaces/events";

export async function fetchData(url: string, sport: string) {
  //   console.log(`[FETCHING] ${sport}...`);
  const res = await fetch(url);
  const website = await res.text();

  const $ = cheerio.load(website);
  const scripts = $("script").toArray();

  const scoreboardScript = scripts.find((script) =>
    $(script).text().includes("__espnfitt__")
  );

  if (!scoreboardScript) return null;

  const scriptContents = $(scoreboardScript).text();

  const rawData = scriptContents.match(/evts.*crntSzn/);

  if (!rawData) return null;
  let [dataStr] = rawData;

  dataStr = dataStr.replace(`evts":`, "").replace(`,"crntSzn`, "");
  const events = JSON.parse(dataStr);

  let scores: {}[] = [];

  events.map((event: any) => {
    const { competitors, date, shortName, status } = event;

    const home = competitors.find((team: any) => team.isHome);
    const away = competitors.find((team: any) => !team.isHome);
    delete home.links;
    delete home.uid;
    delete home.id;
    delete away.links;
    delete away.uid;
    delete away.id;
    delete away.recordSummary;
    delete away.standingSummary;
    delete home.recordSummary;
    delete home.standingSummary;

    scores = [
      ...scores,
      {
        startTime: date,
        shortName,
        status: {
          inning: status.period,
          state: status.state,
          detail: status.detail,
          shortDetail: status.detail,
          completed: event.completed,
        },
        teams: {
          awayTeam: away,
          homeTeam: home,
        },
      },
    ];
  });
  // console.log(`[UPDATED] ${sport}`);
  return scores;
}
