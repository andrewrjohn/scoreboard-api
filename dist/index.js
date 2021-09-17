"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var browser_sync_1 = __importDefault(require("browser-sync"));
var scoreboard_1 = __importDefault(require("./routes/scoreboard"));
var analytics_1 = require("./utils/analytics");
var app = express_1.default();
var port = process.env.PORT || 4000;
app.use(analytics_1.analytics);
app.use(express_1.default.static("public"));
app.use("/api/v1/sports", [scoreboard_1.default]);
app.listen(port, function () {
    console.log("Server running at http://127.0.0.1:" + port);
});
if (process.env.NODE_ENV === "development") {
    browser_sync_1.default({
        files: ["public/**/*.{html,js,css}"],
        server: "public",
        port: port,
        ui: false,
        online: false,
        notify: false,
        open: false,
        logLevel: "silent",
    });
}
