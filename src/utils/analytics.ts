import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

export async function analytics(req: Request, _: Response, next: NextFunction) {
  try {
    const url = "https://scores.weaklytyped.com" + req.originalUrl;

    const eventBody = {
      name: "pageview",
      url,
      domain: "scores.weaklytyped.com",
    };

    const headers = {
      "user-agent": req.headers["user-agent"] || "",
      "Content-Type": "application/json",
      "X-Forwarded-For":
        (req.headers["X-Forwarded-For"] as string) || "127.0.0.1",
    };

    const r = await fetch("https://plausible.io/api/event", {
      body: JSON.stringify(eventBody),
      headers,
      method: "POST",
    });
    // console.log(r.status);
  } catch (err) {
    console.log(err);
  }

  next();
}
