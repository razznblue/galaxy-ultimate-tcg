import { CardModel } from "../../../server/db/models";
import LOGGER from "../../../util/logger";
import { throw404, handleUnexpectedError } from "../../../helpers/apiHelper";
import dbConnect from "../../../server/db/db";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handler(req: any, res: any) {
  await dbConnect();

  try {
    const id: any = req?.query?.cardId;
    console.log(id);
    if (!ObjectId.isValid(id)) { return res.send(`Invalid ObjectID`) };

    /* GET Card by ID */
    if (req?.method === 'GET' && id) {
      try {
        const card = await CardModel.findById(id);
        if (!card) { return throw404(res, `Card with Id ${id} not found`) }
        return res.send(card);
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* UPDATE Player by ID */
    if (req.method === 'PATCH' && id) {
      try {
        const card = await CardModel.findById(id).exec();
        if (!card) return throw404(res, `card with ID ${id} does not exist`);
        if (card) {
          const updatedKeys: string[] = [];
          for (const [key, value] of Object.entries(req?.body)) {
            if (card[key] !== undefined) {
              card[key] = value;
              updatedKeys.push(key);
            }
          }
          card.save();
          LOGGER.info(`Updated card with fields [${updatedKeys}]`);
          return res.send(card);
        }
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* DELETE Card by ID */
    if (req.method === 'DELETE' && id) {
      try {
        /* Delete Player Info */
        const card = await CardModel.findByIdAndDelete(id);

        /* On Success */
        if (card) {
          LOGGER.info(`Deleted Card ${card._id}`);
          return res.send(card);
        }

        return throw404(res, `Card with id ${id} marked for deletion not found `);
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    return res.status(400).json({ err: `Cannot perform request with method ${req.method}` });
  } catch(err) {
    LOGGER.error(err);
    return res.status(500).send(err);
  }
}