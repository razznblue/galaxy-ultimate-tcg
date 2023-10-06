import axios from "axios"
import LOGGER from "./logger"

let baseUrl = process.env.APP_URL;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const Axios = {
  async GET(url: string, queryParameters: any, body: any, baseUrlOverride: string | undefined) {
    try {
      if (baseUrlOverride) baseUrl = baseUrlOverride;
      LOGGER.info(`Trying to call url ${`${baseUrl}${url}`}`);

      const response = await axios.get(`${baseUrl}${url}`, {
        headers: headers
      })
      return response.data;
    } catch(err) {
      LOGGER.error(`Error calling route ${url}`);
      return null;
    }
  }
}

export default Axios;