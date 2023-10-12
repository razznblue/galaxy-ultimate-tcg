
import LOGGER from "../../util/logger";
import dbConnect from "../db/db";
import { CreateCardBody } from "../../helpers/interfaces";
import { CardModel } from "../db/models";

export const createCard = async (body: CreateCardBody) => {
  try {
    await dbConnect();
    const existingData = await CardModel.findOne({ name: body?.name, isVariant: 'false' });
    if (existingData && body?.isVariant === 'false') {
      return {responseCode: 409, msg: `original card for ${body?.name} already exists. Will not create another unless it is specified as a variant`}
    }

    const variantExists = await CardModel.findOne({name:body?.name, variantName: body?.variantName});
    if (variantExists) {
      return {responseCode: 409, msg: `variant ${body?.variantName} already exists. Will not create another unless it is specified with a new variant name`}
    }
  
    const data = new CardModel(body);
    await data.save();
    return {responseCode: 201, data: data};
  } catch(err) {
    return {responseCode: 500, msg: `unknown error occured while trying to create card ${body?.name}`}
  } 
}

export const updateCard = async (body: CreateCardBody) => {
  try {
    await dbConnect();
    let card: any;
    if (body?.isVariant === 'true') {
      card = await CardModel.findOne({ name: body?.name, variantName: body?.variantName })
    } else {
      card = await CardModel.findOne({ name: body?.name });
    }
    if (!card) {
      return {responseCode: 404, msg: body?.isVariant ? `card variant for ${body?.name} not found` : `card with name ${body?.name} not found`}
    }
  
    card.name = body?.name;
    card.abilityText = body?.abilityText;
    card.abilityType = body?.abilityType;
    card.image = body?.image;
    card.cost = body?.cost;
    card.power = body?.power;
    card.health = body?.health;
    card.tags = body?.tags;
    card.visible = body?.visible === 'true';
    card.variantName = body?.variantName || undefined;
    card.isVariant = body?.isVariant === 'true';
    await card.save();
    return {responseCode: 204, msg: `card ${body?.name} updated`}
  } catch(err) {
    LOGGER.error(err);
    return {responseCode: '500', msg: `Unable to update card ${body?.name}`}
  }
}