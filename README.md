## MLB Scores API (via ESPN)
Express.js API that scrapes ESPN for MLB scores, in TypeScript.

### Usage
1. Pull code
2. ```yarn start```
3. Wait a few seconds, then hit http://localhost:3000/api/v1/sports/baseball/mlb/events
4. 🎉

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

### URL Used for Scraping
https://www.espn.com/mlb/scoreboard
