import cheerio from "cheerio";
import fetch from "node-fetch";

type DataType = "scoreboard" | "stats";

export async function getPageData(url: string, type: DataType) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    },
  });
  const website = await res.text();

  const $ = cheerio.load(website);
  const scripts = $("script").toArray();

  const dataScript = scripts.find((script) =>
    $(script).text().includes("__espnfitt__")
  );

  if (!dataScript) return null;

  let scriptContent = $(dataScript).text();
  scriptContent = scriptContent
    .replace("window['__espnfitt__']=", "")
    .replace("window['__CONFIG__']=", "")
    .replace(/;$/gm, "");

  const startSplitIndex = scriptContent.indexOf(`{"app":`);
  scriptContent = scriptContent.slice(startSplitIndex);

  let data = JSON.parse(scriptContent).page.content;

  switch (type) {
    case "scoreboard":
      data = data.scoreboard.evts;
      break;
    case "stats":
      data = data.statistics.leaders;
      break;
  }

  if (!data) throw Error("Missing data");

  return data;
}
