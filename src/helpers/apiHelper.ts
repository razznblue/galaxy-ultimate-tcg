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

export const throw404 = (res: any, msg: string) => {
  LOGGER.error(msg)
  return res.status(404).send();
}

export const handleUnexpectedError = (res: any, err: any) => {
  LOGGER.error(err);
  return res.status(500).send('Unexpected Error');
}