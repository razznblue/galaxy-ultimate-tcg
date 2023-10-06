import { PlayerCollectionModel, PlayerModel, PlayerStatsModel } from "../../../server/db/models";
import LOGGER from "../../../util/logger";
import { throw404, handleUnexpectedError } from "../../../helpers/apiHelper";
import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const id: any = req?.query?.playerId;
    if (!ObjectId.isValid(id)) { return res.send(`Invalid ObjectID`) };

    /* GET Player by ID */
    if (req?.method === 'GET' && id) {
      try {
        const player = await PlayerModel.findById(id);
        if (player && req?.query?.role === 'admin') {
          return res.send(player.isAdmin || false);
        }
        if (!player) { return throw404(res, `Player with Id ${id} not found`) }
        return res.send(player);
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* UPDATE Player by ID */
    if (req?.method === 'PATCH' && id) {
      try {
        const player = await PlayerModel.findById(id).exec();
        if (!player) return throw404(res, `player with ID ${id} does not exist`);
        if (player) {
          const updatedKeys: string[] = [];
          for (const [key, value] of Object.entries(req?.body)) {
            if (player[key] !== undefined) {
              player[key] = value;
              updatedKeys.push(key);
            }
          }
          player.save();
          LOGGER.info(`Updated player with fields [${updatedKeys}]`);
          return res.send(player);
        }
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* DELETE Player by ID */
    if (req.method === 'DELETE' && id) {
      try {
        /* Delete Player Info */
        const player = await PlayerModel.findByIdAndDelete(id);
        const playerCollection = await PlayerCollectionModel.findByIdAndDelete(player?.collectionId);
        const playerStats = await PlayerStatsModel.findByIdAndDelete(player?.playerStatsId);
  
        /* Determine if records are actually deleted */
        const playerDeleted = player ? true : false;
        const collectionDeleted = playerCollection ? true : false;
        const statsDeleted = playerStats ? true : false;

        /* On Success */
        if (playerDeleted && collectionDeleted && statsDeleted) {
          LOGGER.info('Deleted ALL Player info');
          return res.send(player);
        }

        /* Handle 404s */
        if (!player) {return handleDeletionResponse('Player', res)}
        if (!playerCollection) {return handleDeletionResponse('PlayerCollection', res)}
        if (!playerStats) {return handleDeletionResponse('PlayerStats', res)}

        res.status(500).send('Unexpected Error Occurred');
      } catch(err) {
        LOGGER.error(err);
        LOGGER.warn(`Error deleting Player Info`);
        res.status(500).send({title: `Error deleting Player Info`, error: err});
      }
    }

    return res.status(400).json({ err: `Cannot perform request with method ${req.method}` });
  } catch(err) {
    return handleUnexpectedError(res, err);
  }
}

const handleDeletionResponse = (model: string, res: any) => {
  LOGGER.warn(`${model} marked for deletion not found`);
  return throw404(res, `${model} marked for deletion not found`);
}