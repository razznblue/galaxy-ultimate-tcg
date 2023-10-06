import { LocationModel } from "../../../server/db/models";
import LOGGER from "../../../util/logger";
import { throw404, handleUnexpectedError } from "../../../helpers/apiHelper";
import dbConnect from "../../../server/db/db";
import { authorizeSession } from "../../../helpers/apiHelper";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionAuth = await authorizeSession(req, res, path.basename(__filename));
  if (sessionAuth?.status !== 200) {
    return res.status(sessionAuth.status).send(sessionAuth?.msg);
  }
  await dbConnect();
  const record = 'location';

  try {
    const id: any = req?.query?.locationId;
    if (!id) { return res.status(400).send(`No Id present for ${record}`) };

    /* GET by RANDOM or by ID 
      By default, the unrevealed location is excluded
      The 'filters' parameter specifies any additional locations to exlude from the random selection
    */
    if (req?.method === 'GET') {
      try {
        if (id.toLowerCase() === 'random') {
          let count: number
          let query: any
          let filterqps: any = req?.query?.filters

          if (filterqps) {
            filterqps = filterqps.split(',')
            query = { abilityText: {$exists: true}, _id: {$nin: filterqps } }
            count = await LocationModel.find(query).count()
          } else {
            query = { abilityText: {$exists: true} }
            count = await LocationModel.find(query).count()
          }
          LOGGER.debug('query: ', query);
          const randomIndex = Math.floor(Math.random() * count);
          const randomRecord = await LocationModel.findOne(query).skip(randomIndex);
          return res.send(randomRecord);
        }

        /* GET by ID */
        if (!ObjectId.isValid(id)) { return res.status(400).send(`Invalid ObjectID`) };
        const data = await LocationModel.findById(id);
        if (!data) { return throw404(res, `${record} with Id ${id} not found`) }
        return res.send(data);
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* UPDATE Location by ID */
    if (req.method === 'PATCH') {
      if (sessionAuth?.user?.role !== 'admin' && process.env.NODE_ENV === 'production') {
        return res.status(403).send('Forbidden Request');
      }
      if (!req?.query?.username) return res.status(400).send({ status: 400, msg: 'A username parameter is needed on this request' })

      // const isAdmin = userIsAdmin(req?.query?.username);

      if (!ObjectId.isValid(id)) { return res.status(400).send(`Invalid ObjectID`) };
      try {
        const record = await LocationModel.findById(id).exec();
        if (!record) return throw404(res, `${record} with ID ${id} does not exist`);
        if (record) {
          const updatedKeys: string[] = [];
          for (const [key, value] of Object.entries(req?.body)) {
            if (record[key] !== undefined) {
              record[key] = value;
              updatedKeys.push(key);
            }
          }
          record.save();
          LOGGER.info(`Updated ${record} with fields [${updatedKeys}]`);
          return res.send(record);
        }
      } catch(err) {
        return handleUnexpectedError(res, err);
      }
    }

    /* DELETE by ID */
    if (req.method === 'DELETE' && id) {
      if (sessionAuth?.user?.role !== 'admin' && process.env.NODE_ENV === 'production') {
        return res.status(403).send('Forbidden Request');
      }
      try {
        /* Delete Info */
        const record = await LocationModel.findByIdAndDelete(id);

        /* On Success */
        if (record) {
          LOGGER.info(`Deleted ${record} ${record._id}`);
          return res.send(record);
        }

        return throw404(res, `${record} with id ${id} marked for deletion not found `);
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