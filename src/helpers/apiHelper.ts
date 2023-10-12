import LOGGER from "../util/logger";
import { PlayerModel } from "../server/db/models";
import dbConnect from "../server/db/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

/* Used to protect API routes */
export const authorizeSession = async (req: NextApiRequest, res: NextApiResponse, apilocation: string) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session && process.env.NODE_ENV === 'production') {
    LOGGER.warn(`An unauthorized attempt was made from ${apilocation}. REASON: No Session Present`);
    return { status: 401, msg: 'Unauthorized' }
  } else {
    return { status: 200, user: session?.user }
  }
}

export const userIsAdmin = async (username: string, email: string) => {
  await dbConnect();
  if (username) {
    const player = await PlayerModel.findOne({username: username, email: email});
    if (player) {
      return player.isAdmin || false;
    } else {
      LOGGER.warn(`Could not identify player with username ${username}`);
      return false;
    }
  }
}

/**
 * Used to authenticate routes under the /api/jobs folder via an accessKey
 * @param req contains the username/accessKey in order for this request to pass successfully
 * @param resource only needed to display on the log message if there is an error
 * @returns true if successful
 */
export const authenticateKey = async (req: NextApiRequest, res: NextApiResponse, resource: string) => {
  const username = req?.body?.username;
  const accessKey = req?.body?.accessKey;
  console.log(username);
  console.log(accessKey);
  if (!username || !accessKey) {
    console.warn(`Authentication Invalid. Job ${resource} was not processed`)
    return res.status(400).send(`Authentication Invalid. Job ${resource} was not processed`)
  }
  await dbConnect();
  const admin = await PlayerModel.findOne({ username: username, accessKey: accessKey });
  if (!admin) {
    console.warn(`Unauthorized. Job ${resource} was not processed`)
    return res.status(401).send(`Unauthorized. Job ${resource} was not processed`);
  } 
  return true;
}

export const throw404 = (res: any, msg: string) => {
  LOGGER.error(msg)
  return res.status(404).send();
}

export const handleUnexpectedError = (res: any, err: any) => {
  LOGGER.error(err);
  return res.status(500).send('Unexpected Error');
}