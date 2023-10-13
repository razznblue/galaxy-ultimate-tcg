# Galaxy Ultimate TCG

 - A TCG(Trading Card Game) based around the Star Wars Universe
 - Production URL: [https://galaxy-ultimate-tcg.vercel.app/](https://galaxy-ultimate-tcg.vercel.app/)


## How To Run
 - Install Dependencies: `npm install`
 - Fill out .env.local file
 - Use local node version: `nvm use`
 - Start Dev Server: `npm run dev`

## Data-Pipeline
 - Raw Data is stored on a google sheet. A cronJob runs every week and scrapes data from the sheet. It transforms it and updates records in mongo. This allows for easy editing of card stats/abilities in case a card is too powerful or weak.
