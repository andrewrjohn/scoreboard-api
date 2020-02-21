export { };
const cheerio = require("cheerio");
const fetch = require("node-fetch");
// const redis = require("redis");

// const client = redis.createClient();

export async function fetchData(url: string, key: string) {
    console.log(`[FETCHING] ${key}...`);
    const website = await fetch(url)
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

    let scores = [];
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
        // client.set(key, JSON.stringify(scores));
    });
    console.log(`[UPDATED] ${key}`);
    return scores;
}