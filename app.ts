const express = require("express");
const mlbEvents = require("./routes/mlbEvents");

const app = express();
const port = process.env.NODE_ENV === "production" ? 8080 : 3000;

app.use("/api/v1/sports", [mlbEvents]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
