const express = require("express");
const scoreboardRoute = require("./routes/scoreboard");

const app = express();
const port = process.env.NODE_ENV === "production" ? 443 : 3000;

app.use("/api/v1/sports", [scoreboardRoute]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
