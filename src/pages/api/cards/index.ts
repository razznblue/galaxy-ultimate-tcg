import { CardModel } from "../../../server/db/models/index";
import dbConnect from "../../../server/db/db";
import LOGGER from "../../../util/logger";
import { CreateCardBody } from "../../../helpers/interfaces";

export default async function handler(req: any, res: any) {
  await dbConnect();

  /* GET Cards */
  if (req?.method === "GET") {
    if (req?.params) {
      LOGGER.info(req?.params);
    }
    const cards = await CardModel.find({}).limit(10).lean();
    return res.status(200).json(cards);

    /* Create a Card */
  } else if (req?.method === "POST") {
    try {
      const body = req.body as CreateCardBody;
      const card: any = new CardModel({
        name: body?.name,
        abilityText: body?.abilityText,
        abilityType: body?.abilityType,
        cost: body?.cost,
        power: body?.power,
        health: body?.health,
        image: body?.image
      });
      await card.save();

      LOGGER.info(`Created new card with Id ${card._id}`);
      return res.status(201).json(card.toJSON());
    } catch(err) {
      LOGGER.error(err);
      LOGGER.error(`Could not save card due to error`);
      return res.status(500).send('Unexpected Error. Check logs');
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
