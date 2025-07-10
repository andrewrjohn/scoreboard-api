import { getPageData } from "./scrape";

export async function scrapeScores(url: string, sport: string) {
  const events = await getPageData(url, "scoreboard");
  if (!events) return null;

  let scores: {}[] = [];

  events.map((event: any) => {
    const { competitors, date, shortName, status, vnue } = event;

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
        venue: vnue,
      },
    ];
  });
  // console.log(`[UPDATED] ${sport}`);
  return scores;
}
