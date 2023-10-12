
import { CreateLocationBody } from "../../helpers/interfaces";
import dbConnect from "../db/db";
import { LocationModel } from "../db/models";

export const createLocation = async (body: CreateLocationBody) => {
  await dbConnect();
  const existingData = await LocationModel.findOne({ name: body?.name });
  if (existingData) {
    return {responseCode: 409, msg: `location with name ${body?.name} already exists`}
  }

  const data = new LocationModel(body);
  await data.save();
  return {responseCode: 202, data: data};
}