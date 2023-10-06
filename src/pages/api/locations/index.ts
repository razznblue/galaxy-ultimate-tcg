import path from "path";
import { LocationModel } from "../../../server/db/models";
import dbConnect from "../../../server/db/db";
import LOGGER from "../../../util/logger";
import { CreateLocationBody } from "../../../helpers/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { authorizeSession } from "../../../helpers/apiHelper";

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

      const body: CreateLocationBody = req?.body;
      const existingData = await LocationModel.findOne({ name: req?.body?.name });
      if (existingData) {
        return res.status(409).json({responseCode: 409, msg: `${record} with name ${req?.body?.name} already exists`});
      }

      const data = new LocationModel(body);
      await data.save();

      LOGGER.info(`Created new ${record} with Id ${data._id}`);
      return res.status(201).json(data.toJSON());
    } catch(err) {
      LOGGER.error(err);
      LOGGER.error(`Could not save card due to error`);
      return res.status(500).send('Unexpected Error. Check logs');
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
