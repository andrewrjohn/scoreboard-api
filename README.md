## Scoreboard API (via ESPN)
Express.js API that scrapes ESPN for sports scores, with TypeScript.

### React
For easier usage within React, check out the [React Sports Hooks](https://github.com/andrewrjohn/react-sports-hooks) package that makes it easier to get scores and doesn't depend on any API under the hood. It's based off the same code, but it takes the reliance off of hosting the API yourself.

### Usage
https://scores.weaklytyped.com/

### Run Locally
1. Pull code
2. ```yarn start```
3. Wait a few seconds, then hit http://localhost:3000/api/v1/sports/:sport_name/events
4. 🎉

### Supported Sports
- "mlb"
- "nba"
- "ncaam" (Men's College Basketball, only Top 25 Teams)
- "ncaaf" (Men's College Football)
- "nfl"

### [Video walkthrough of the project](https://youtu.be/lgdMD0FAflI)

### Example Response
```javascript
{
  "date": "2019-08-23T21:52:02.370Z",
  "scores": [
    {
      "startTime": "2019-08-23T18:20Z",
      "shortName": "WSH @ CHC",
      "status": {
        "inning": 9,
        "state": "post",
        "detail": "Final",
        "shortDetail": "Final",
        "completed": true
      },
      "teams": {
        "awayTeam": {
          "shortDisplayName": "Nationals",
          "alternateColor": "f1f2f3",
          "color": "0a295d",
          "displayName": "Washington Nationals",
          "name": "Nationals",
          "logo": "https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/wsh.png",
          "location": "Washington",
          "abbreviation": "WSH",
          "isActive": true,
          "score": "9"
        },
        "homeTeam": {
          "shortDisplayName": "Cubs",
          "alternateColor": "00417d",
          "color": "00417d",
          "displayName": "Chicago Cubs",
          "name": "Cubs",
          "logo": "https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/chc.png",
          "location": "Chicago",
          "abbreviation": "CHC",
          "isActive": true,
          "score": "3"
        }
      }
    },
    ...rest of the games
  ]
}
```
