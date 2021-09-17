import express from "express";
import path from "path";
import browserSync from "browser-sync";

import scoreboardRoute from "./routes/scoreboard";
import { analytics } from "./utils/analytics";

const app = express();
const port = process.env.PORT || 4000;

app.use(analytics);
app.use("/styles", express.static("public/styles"));
app.use("/api/v1/sports", [scoreboardRoute]);

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});

if (process.env.NODE_ENV === "development") {
  browserSync({
    files: ["public/**/*.{html,js,css}"],
    server: "public",
    port: port as number,
    ui: false,
    online: false,
    notify: false,
    open: false,
    logLevel: "silent",
  });
}
