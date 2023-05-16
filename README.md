# Scoreboard API

Express.js API that scrapes ESPN for sports scores and stats, written with TypeScript, updated every 30 seconds ⚡️

## Demo

https://scores.weaklytyped.com

## Features

Currently these are the supported sports:

- MLB
- NBA
- NFL
- NCAAM (top 25 men's college basketball)
- NCAAF (top 25 men's college football)

## API Reference

View the [endpoint reference here](https://scores.weaklytyped.com/) to see all available endpoints

## Example

```javascript
# GET https://scores.weaklytyped.com/api/v1/sports/mlb/events


{
   "date":"2021-08-27T17:51:31.808Z",
   "scores":[
      {
         "startTime":"2021-08-27T23:05Z",
         "shortName":"ARI @ PHI",
         "status":{
            "inning":1,
            "state":"pre",
            "detail":"Fri, August 27th at 7:05 PM EDT",
            "shortDetail":"8/27 - 7:05 PM EDT",
            "completed":false
         },
         "teams":{
            "awayTeam":{
               "shortDisplayName":"Diamondbacks",
               "alternateColor":"000000",
               "color":"a40013",
               "displayName":"Arizona Diamondbacks",
               "name":"Diamondbacks",
               "logo":"https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/ari.png",
               "location":"Arizona",
               "abbreviation":"ARI",
               "isActive":true,
               "score":"0"
            },
            "homeTeam":{
               "shortDisplayName":"Phillies",
               "alternateColor":"284898",
               "color":"be0011",
               "displayName":"Philadelphia Phillies",
               "name":"Phillies",
               "logo":"https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/phi.png",
               "location":"Philadelphia",
               "abbreviation":"PHI",
               "isActive":true,
               "score":"0"
            }
         }
      },
      ...
   ]
}
```

## Run Locally

Clone the project

```sh
  # Using HTTPS
  git clone https://github.com/andrewrjohn/scoreboard-api.git

  # Using SSH
  git clone git@github.com:andrewrjohn/scoreboard-api.git
```

Go to the project directory

```sh
  cd scoreboard-api
```

Install dependencies

```sh
  # Using NPM
  npm install

  # Using Yarn
  yarn install
```

Start the server

```sh
  # Using NPM
  npm run start

  # Using Yarn
  yarn start
```

## Client Wrappers

Use the following libraries if you want an easy way to consume this API in your frontend apps:

- [React Sports Hooks](https://github.com/andrewrjohn/react-sports-hooks)

## Feedback

If you have any feedback, please [create an issue](https://github.com/andrewrjohn/scoreboard-api/issues/new)

## Uptime Monitoring

Checkout the Weakly Typed status page for realtime uptime monitoring:
https://stats.uptimerobot.com/6xr1KcPrg8

## Support this Project

Find yourself using this API, or just think this is cool and want to see continued development of it? Please consider <a href="https://buy.stripe.com/28o2a2fPyens2Qg288" target="_blank">supporting Weakly Typed</a> to help keep this project alive ✊

## License

[MIT](https://choosealicense.com/licenses/mit/)
