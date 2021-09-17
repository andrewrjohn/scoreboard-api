"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSportURL = exports.SPORT_URL_MAP = exports.SPORTS = void 0;
var BASE_URL = "https://www.espn.com";
var SPORTS = {
    MLB: "MLB",
    NBA: "NBA",
    NFL: "NFL",
    NCAAM: "NCAAM",
    NCAAF: "NCAAF",
};
exports.SPORTS = SPORTS;
var SPORT_URL_MAP = (_a = {},
    _a[SPORTS.MLB] = "mlb",
    _a[SPORTS.NBA] = "nba",
    _a[SPORTS.NFL] = "nfl",
    _a[SPORTS.NCAAM] = "mens-college-basketball",
    _a[SPORTS.NCAAF] = "college-football",
    _a);
exports.SPORT_URL_MAP = SPORT_URL_MAP;
var getSportURL = function (sport) {
    return !SPORT_URL_MAP[sport]
        ? console.error("Sport not found")
        : BASE_URL + "/" + SPORT_URL_MAP[sport] + "/scoreboard";
};
exports.getSportURL = getSportURL;
