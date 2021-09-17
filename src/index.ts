import express from "express";

import scoreboardRoute from "./routes/scoreboard";
import { analytics } from "./utils/analytics";

const app = express();
const port = process.env.PORT || 4000;

app.use(analytics);
app.use("/api/v1/sports", [scoreboardRoute]);

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
