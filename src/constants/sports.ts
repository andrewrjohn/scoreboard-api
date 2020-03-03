export { };

const BASE_URL = "https://www.espn.com";


const SPORT_URL_MAP = {
    mlb: "mlb",
    nba: "nba",
    nfl: "nfl",
    ncaam: "mens-college-basketball",
    ncaaf: "college-football",
};

const getSportURL = (sport) => !SPORT_URL_MAP[sport] ? console.error("Sport not found") : `${BASE_URL}/${SPORT_URL_MAP[sport]}/scoreboard`;

const SPORTS = [
    "mlb",
    "nba",
    "nfl",
    "ncaam",
    "ncaaf",
];


module.exports = { SPORTS, SPORT_URL_MAP, getSportURL };