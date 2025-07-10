import "dotenv/config";
import express from "express";
import path from "path";
import browserSync from "browser-sync";

import eventsRoute from "./routes/events";
import statsRoute from "./routes/stats";
import cors from "cors";
import { PostHog } from "posthog-node";
import { createProxyMiddleware } from "http-proxy-middleware";

let phClient: PostHog | null = null;

if (process.env.POSTHOG_API_KEY) {
  phClient = new PostHog(process.env.POSTHOG_API_KEY, {
    host: "https://us.i.posthog.com",
  });
}

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const rapidApiProxySecret = req.headers[
      "X-RapidAPI-Proxy-Secret"
    ] as string;

    if (rapidApiProxySecret !== process.env.RAPID_API_PROXY_SECRET) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Missing RapidAPI proxy secret",
      });
    }
    // fix redirect loop

    // res.redirect(301, `https://scoreboard4.p.rapidapi.com${req.originalUrl}`);

    next();
  });
}

// app.use(
//     "*",
//     createProxyMiddleware({
//       target: "https://scoreboard4.p.rapidapi.com",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/": "/", // Keep the path as-is
//       },
//     })
//   );
// }

app.use((req, res, next) => {
  try {
    if (phClient) {
      const xForwardedFor =
        req.headers["x-forwarded-for"] || req.headers["X-Forwarded-For"];

      const distinctId = xForwardedFor
        ? Array.isArray(xForwardedFor)
          ? xForwardedFor[0]
          : xForwardedFor
        : req.ip;
      phClient.capture({
        distinctId,
        event: "$pageview",
        properties: {
          url: req.originalUrl,
          $current_url: req.originalUrl,
          path: req.path,
          domain: "scores.weaklytyped.com",
        },
      });
    }
  } catch (err) {
    console.error("Error tracking analytics");
    console.error(err);
  } finally {
    next();
  }
});
app.use("/styles", express.static("public/styles"));
app.use("/api/v1/sports", [eventsRoute, statsRoute]);

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
