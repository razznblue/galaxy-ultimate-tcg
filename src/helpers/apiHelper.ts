import LOGGER from "../util/logger";

export const throw404 = (res: any, msg: string) => {
  LOGGER.error(msg)
  return res.status(404).send();
}

export const handleUnexpectedError = (res: any, err: any) => {
  LOGGER.error(err);
  return res.status(500).send('Unexpected Error');
}