"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const fetch = require("node-fetch");
// const redis = require("redis");
// const client = redis.createClient();
function fetchData(url, key) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[FETCHING] ${key}...`);
        const website = yield fetch(url)
            .then(res => res.text())
            .then(body => body);
        const $ = cheerio.load(website);
        const scripts = yield $("script").toArray();
        const scoreboardScript = scripts.find(script => script.children[0] &&
            script.children[0].data.includes("window.espn.scoreboardData")).children[0].data;
        const strippedData = scoreboardScript
            .replace("window.espn.scoreboardData", "")
            .replace("=", "")
            .replace("if(!window.espn_ui.device.isMobile){window.espn.loadType = \"ready\"};", "")
            .replace(/;/g, "")
            .split("window.espn.scoreboardSettings")[0]
            .trim();
        const data = JSON.parse(strippedData);
        const { events } = data;
        let scores = [];
        events.map(event => {
            const { competitions, date, shortName, status } = event;
            const home = competitions[0].competitors.find(team => team.homeAway === "home");
            const away = competitions[0].competitors.find(team => team.homeAway === "away");
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
                        awayTeam: Object.assign(Object.assign({}, away.team), { score: away.score }),
                        homeTeam: Object.assign(Object.assign({}, home.team), { score: home.score })
                    }
                }
            ];
            // client.set(key, JSON.stringify(scores));
        });
        console.log(`[UPDATED] ${key}`);
        return scores;
    });
}
exports.fetchData = fetchData;
//# sourceMappingURL=fetchData.js.map