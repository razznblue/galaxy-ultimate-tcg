import { LocationModel } from "../../../server/db/models";
import dbConnect from "../../../server/db/db";
import LOGGER from "../../../util/logger";
import { CreateLocationBody } from "../../../helpers/interfaces";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const record = 'location';

  if (req?.method === "GET") {
    const data = await LocationModel.find({});
    return res.status(200).json(data);

  } else if (req?.method === "POST") {
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
