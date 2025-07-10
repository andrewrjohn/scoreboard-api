import "dotenv/config";
import express, { Router } from "express";
import path from "path";
import browserSync from "browser-sync";
import eventsRoute from "./routes/events";
import statsRoute from "./routes/stats";
import cors from "cors";
import { PostHog } from "posthog-node";

let phClient: PostHog | null = null;

if (process.env.POSTHOG_API_KEY) {
  phClient = new PostHog(process.env.POSTHOG_API_KEY, {
    host: "https://us.i.posthog.com",
  });
}

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

// app.use((req, res, next) => {
//   try {
//     if (phClient) {
//       const xForwardedFor =
//         req.headers["x-forwarded-for"] || req.headers["X-Forwarded-For"];

//       const distinctId = xForwardedFor
//         ? Array.isArray(xForwardedFor)
//           ? xForwardedFor[0]
//           : xForwardedFor
//         : req.ip;
//       phClient.capture({
//         distinctId,
//         event: "$pageview",
//         properties: {
//           url: req.originalUrl,
//           $current_url: req.originalUrl,
//           path: req.path,
//           domain: "scores.weaklytyped.com",
//         },
//       });
//     }
//   } catch (err) {
//     console.error("Error tracking analytics");
//     console.error(err);
//   } finally {
//     next();
//   }
// });
app.use("/styles", express.static("public/styles"));
const apiRouter = Router();
apiRouter.use("/v1/sports", [eventsRoute, statsRoute]);

if (process.env.NODE_ENV === "production") {
  apiRouter.use((req, res, next) => {
    const rapidApiProxySecret = req.headers[
      "x-rapidapi-proxy-secret"
    ] as string;

    if (rapidApiProxySecret !== process.env.RAPID_API_PROXY_SECRET) {
      return res.status(401).json({
        error: "Unauthorized",
        message:
          "Please note this API has changed, please use the new URL (https://sports.weaklytyped.com) and obtain an API key from https://rapidapi.com/johnsonrobertandrew-KXmcdI0G1H_/api/scoreboard4",
      });
    }

    next();
  });
}

app.use("/api", apiRouter);

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
