import path from "path";
import { LocationModel } from "../../../server/db/models";
import dbConnect from "../../../server/db/db";
import LOGGER from "../../../util/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { authorizeSession } from "../../../helpers/apiHelper";
import { createLocation } from "../../../server/controllers/LocationController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionAuth = await authorizeSession(req, res, path.basename(__filename));
  if (sessionAuth?.status !== 200) {
    return res.status(sessionAuth.status).send(sessionAuth?.msg);
  }
  await dbConnect();
  const record = 'location';

  if (req?.method === "GET") {
    const data = await LocationModel.find({});
    return res.status(200).json(data);

  } else if (req?.method === "POST") {
    if (sessionAuth?.user?.role !== 'admin' && process.env.NODE_ENV === 'production') {
      return res.status(403).send('Forbidden Request');
    }
    try {

      const createResponse = await createLocation(req?.body)
      if (createResponse?.responseCode !== 201) {
        res.status(createResponse?.responseCode).send(createResponse?.msg);
      }

      LOGGER.info(`Created new ${record} with Id ${createResponse?.data?._id}`);
      return res.status(createResponse?.responseCode).json(createResponse?.data?.toJSON());
    } catch(err) {
      LOGGER.error(err);
      LOGGER.error(`Could not save ${record} due to error`);
      return res.status(500).send('Unexpected Error. Check logs');
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
