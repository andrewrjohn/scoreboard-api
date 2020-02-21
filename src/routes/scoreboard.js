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
    SPORTS.map((sport) => __awaiter(this, void 0, void 0, function* () {
        const url = getSportURL(sport);
        scores[sport] = yield fetchData(url, sport);
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            scores[sport] = yield fetchData(url, sport);
        }), seconds(30));
    }));
}
startSchedule();
router.get("/:sport/events", (req, res) => {
    const { sport } = req.params;
    if (!SPORT_URL_MAP[sport]) {
        return res.sendStatus(404);
    }
    res.json({
        date: new Date(),
        scores: scores[sport]
    });
});
module.exports = router;
//# sourceMappingURL=scoreboard.js.map