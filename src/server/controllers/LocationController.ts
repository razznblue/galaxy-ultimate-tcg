
import LOGGER from "../../util/logger";
import dbConnect from "../db/db";
import { CreateLocationBody } from "../../helpers/interfaces";
import { LocationModel } from "../db/models";

export const createLocation = async (body: CreateLocationBody) => {
  try {
    await dbConnect();
    const existingData = await LocationModel.findOne({ name: body?.name });
    if (existingData) {
      return {responseCode: 409, msg: `location with name ${body?.name} already exists`}
    }
  
    const data = new LocationModel(body);
    await data.save();
    return {responseCode: 202, data: data};
  } catch(err) {
    return {responseCode: 500, msg: `unknown error occured while trying to create location ${body?.name}`}
  } 
}

export const updateLocation = async (body: CreateLocationBody) => {
  try {
    await dbConnect();
    const location = await LocationModel.findOne({ name: body?.name });
    if (!location) {
      return {responseCode: 404, msg: `location with name ${body?.name} not found`}
    }
  
    location.name = body?.name;
    location.abilityText = body?.abilityText;
    location.abilityType = body?.abilityType;
    location.image = body?.image;
    location.tags = body?.tags;
    location.visible = body?.visible === 'true';
    await location.save();
    return {responseCode: 204, msg: `location ${body?.name} updated`}
  } catch(err) {
    LOGGER.error(err);
    return {responseCode: '500', msg: `Unable to update location ${body?.name}`}
  }
}