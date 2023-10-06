import { PlayerCollectionModel, PlayerModel, PlayerStatsModel } from "../../../server/db/models/index";
import dbConnect from "../../../server/db/db";
import LOGGER from "../../../util/logger";
import { CreatePlayerBody } from "../../../helpers/interfaces";
import { throw404 } from "../../../helpers/apiHelper";

export default async function handler(req: any, res: any) {
  await dbConnect();

  /* GET Players */
  if (req?.method === "GET") {
    if (req?.query?.username) {
      console.log('name found');
      const player = await PlayerModel.findOne({username: req?.query?.username});
      if (!player) { return throw404(res, `Player ${req?.query?.username} Does not have an account`) }
      console.log('returning single player');
      res.setHeader("Content-Type", "application/json");
      return res.json(player);
    }
    const players = await PlayerModel.find({}).limit(10).lean();
    return res.json(players);

    /* Create a Player */
  } else if (req?.method === "POST") {
    /* Save PlayerStats and PlayerCollection */
    const playerStats = new PlayerStatsModel();
    const playerCollection = new PlayerCollectionModel();
    playerStats.save();
    playerCollection.save();

    /* Save Player if username does not exist */
    LOGGER.info(req?.body);
    try {
      const player: any = await createPlayer(
        req?.body as CreatePlayerBody, 
        playerStats._id, 
        playerCollection._id
      );

      /* If Player was not saved, delete the Stats/Collection records */
      if (!player) {
        await cleanUpPlayerModels(playerCollection._id, playerStats._id)
        return res.status(409).send('Username already exists');
      }
      LOGGER.info(`Created new player with Id ${player._id}`);
      return res.status(201).json(player.toJSON());

    } catch(err) {
      await cleanUpPlayerModels(playerCollection._id, playerStats._id)
      LOGGER.error(`Could not save player due to error ${err}`);
      return res.status(500).send('Unexpected Error. Check logs');
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

const createPlayer = async (createPlayerBody: CreatePlayerBody, playerStatsId: any, collectionId: any) => {
  const exists = await PlayerModel.exists({username: createPlayerBody.username});
  if (!exists) {
    const player: any = new PlayerModel(createPlayerBody);
    player.playerStatsId = playerStatsId;
    player.collectionId = collectionId;
    await player.save();
    return player;
  }
  LOGGER.warn(`Player ${createPlayerBody.username} already exists`);
  return null;
}

const cleanUpPlayerModels = async (collectionId: any, statsId: any) => {
  await PlayerStatsModel.findByIdAndDelete({_id: statsId});
  await PlayerCollectionModel.findByIdAndDelete({_id: collectionId});
}
